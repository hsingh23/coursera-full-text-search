# AGENTS.md — working guide for coding agents

Tiny 2015-era Chrome extension. ~280 lines of real source; everything else
is generated bundles or vendored libraries. Read this before touching
anything.

## Commands

```sh
npm install && bower install   # restore toolchain + vendor libs
grunt make                     # rebuild generated files (templates.js, coursera-fts.js, coursera-fts.lib.js)
ruby publish.rb                # bump manifest version, zip, upload to Chrome Web Store (needs secret.json)
```

There are no tests, no linter config, and no CI.

## Architecture map

```
result.hbs --(grunt handlebars)--> templates.js
                                                   \
templates.js + picomodal.js + coursera-searcher.js --(grunt concat)--> coursera-fts.js   [app bundle]
bower_components/{lodash,lunr,jquery,pouchdb,q,handlebars} --(grunt concat)--> coursera-fts.lib.js [vendor bundle]
                                                   |
manifest.json loads both as content scripts on https://class.coursera.org/*/lecture
```

Runtime data flow in `coursera-searcher/coursera-searcher.js`:

1. `init()` → `showGUI()` + `loadData()`.
2. Page scrape: `subtitleUrls` (srt links), `videoUrls` (title + mp4 link +
   section, built per subtitle link), `sectionHeader` lookup for ordering.
3. `loadData()` gets the PouchDB doc `_<course-slug>` from db `coursera_fts`;
   on miss calls `fetchSubtitles()` (after a 1.5 s retry delay), on hit
   incrementally fetches only missing indices, then re-indexes cached srts.
4. `addLunrDocuments(videoIndex, srt)` splits each srt into cues and adds
   lunr docs `id = "<videoIndex>#<startSeconds>"`, `body = cue text`;
   `subtitles[id]` keeps the quote text for rendering. `parseTime()`
   converts `HH:MM:SS,mmm` to seconds.
5. `showGUI()` injects the search form into `.course-topbar-nav-list` via
   MutationObserver; on submit, `lunrIndex.search()` hits are shaped by a
   lodash chain into `[{header, videos:[{title, link, quotes:[[time,text]]}]}]`
   and rendered with `HANDLEBAR_TEMPLATES["coursera-searcher/result.hbs"]`
   inside picoModal.
6. Clicking a result (delegated `a.fullTextSearch` handler) sets the inline
   `<video>`'s source to `<mp4>#t=<time>,<time+10>` and plays.

## Conventions

- **Never hand-edit generated files** (`coursera-fts.js`,
  `coursera-fts.lib.js`, `templates.js`). Edit `coursera-searcher.js` /
  `result.hbs` / `picomodal.js`, then run `grunt make`. (Commit f33d53a's
  fix had to be applied in both source and bundle because of this.)
- ES5 only, jQuery-style globals (`$`, `_`, `Q`, `lunr`, `PouchDB`,
  `picoModal`) — everything shares one global scope across the two
  content scripts.
- Debugging is `console.log`-based; several globals
  (`window.lunrIndex`, `window.subtitles`, `window.db`) exist purely for
  console inspection.

## Gotchas

- `takeMeAway()` appears in the generated template's inline `onclick` but
  is **never defined** (leftover from the userscript prototype). Real
  click handling is the delegated jQuery handler; don't rely on the inline
  attribute.
- `fetchSubtitles()` is order- and timing-sensitive: the promise chain
  `Q.allSettled(...).then(deferred.resolve(dbResult))` calls
  `deferred.resolve(dbResult)` synchronously (so the store is persisted
  before fetches are guaranteed settled — it only works because the srt
  store object is mutated in place), and callers sprinkle 900/1500 ms
  `setTimeout` waits around page-load timing.
- `secret.json` is gitignored on purpose: it holds Chrome Web Store
  `client_id`/`client_secret`. Never commit, log, or inline it.
- The repo carries known Dependabot alerts on the 2015-era dependency
  versions (lodash, jQuery, PouchDB, ...). Upgrading would break the
  old-Coursera assumptions; treat as archived software unless asked.
- Extension only works on the retired `class.coursera.org` DOM structure
  (`.course-item-list-header h3`, `.lecture-link`, topbar classes).
- `publish.rb` bumps `coursera-searcher/manifest.json` (x.y.9 rolls to
  x.(y+1).0) then shells out to `zip` and `grunt publish`.

## Verifying changes

No test suite; verification is manual and build-based:

1. `grunt make` succeeds and regenerates the three generated files.
2. `node --check coursera-searcher/coursera-searcher.js` parses clean (ES5).
3. Diff regenerated bundles to confirm only intended changes landed.
4. Original-era runtime check: load `coursera-searcher/` unpacked in Chrome,
   open a `class.coursera.org/*/lecture` page, confirm the search box
   appears, a query returns grouped timestamped results, and a click plays
   the video at that time. First visit must actually fetch subtitles
   (regression fixed in 1607cce).

## Pointers

- History: `CHANGELOG.md` (post-rewrite hashes `f33d53a`, `1607cce`).
- Design decisions: `architectural-diary/decisions/`.
- One-shot recreation spec: `prompt.md`.
