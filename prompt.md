# prompt.md — one-shot recreation of coursera-full-text-search

Give this entire document to a competent agent with an empty directory
and it should be able to recreate this repository's software, behavior,
and build pipeline from scratch. Written 2026-09-08 against `master`
(`f33d53a`, `1607cce`).

## Goal

Build a Chrome extension (Manifest V2, 2015-era Chrome) that adds
full-text search to Coursera course lecture pages
(`https://class.coursera.org/<course>/lecture`): index every lecture's
srt subtitles, answer free-text queries with timestamped quotes grouped
by section and video, and play the exact moment inline when a quote is
clicked. Because life is short, and searching with computers is faster.

## Stack (exact-era versions)

- Chrome extension, Manifest V2, content scripts only (no background
  page, no popup).
- lodash 3.8.0, lunr.js 0.5.7, jQuery 2.1.3, PouchDB 3.4.0, Q 1.2.0,
  Handlebars 3.0.1 runtime, picoModal (vendored single file).
- Build: Bower for vendor libs, Grunt 0.4 with `grunt-contrib-concat`
  and `grunt-contrib-handlebars`; publish via `grunt-webstore-upload`
  0.8.x plus a Ruby (stdlib-only) helper script.
- ES5 JavaScript throughout; all libraries share one global scope.

## Phased build order

1. **Scaffold**: `manifest.json` (name "Coursera Searcher", version
   1.0.0, MV2, icon `icons/search.png`, content script matching
   `https://class.coursera.org/*/lecture` loading
   `coursera-fts.lib.js` then `coursera-fts.js`), `package.json`,
   `bower.json`, `.gitignore` (`secret.json`, `node_modules/*`,
   `bower_components/*`, `*.zip`).
2. **Vendor bundle**: Grunt `concat` writing
   `coursera-fts.lib.js` = lodash.min + lunr.min + jquery.min +
   pouchdb.js + q.js + handlebars.runtime.min (Bower paths).
3. **Scraper** (in `coursera-searcher.js`): collect
   `a[title='Subtitles (srt)']` nodes; for each, walk the DOM to the
   section header (`closest` list header `h3`) and the lecture title
   (`.lecture-link`) and the mp4 link
   (`a[href*="download.mp4"]`); build `videoUrls[i] = {section,
   header, text, link}` guarded by try/catch (lectures may have video
   disabled). Build a two-way `sectionHeader` map (index↔title) for
   ordering.
4. **Storage**: `PouchDB('coursera_fts')`, one doc per course with
   `_id` = first path segment (course slug), `data` = map of
   lectureIndex → raw srt text. On load: doc missing → fetch all srts
   (retry after 1.5 s); doc present → fetch only indices not in
   `data`, persist, then re-index all cached text. Indexing is spread
   with `setTimeout(addLunrDocuments, 0, ...)` after a 900 ms delay so
   the page can settle.
5. **Index**: lunr index over field `body`, ref `id`. For each srt cue
   (blocks split on blank lines, cue = index line / timing line /
   text lines): `id = "<videoIndex>#<parseTime(start)>"` where
   `parseTime("HH:MM:SS,mmm")` → integer seconds; keep
   `subtitles[id]` = cue text for rendering.
6. **UI**: inject `<form id="fulltext_gui">` with a search input into
   a `<li class="course-topbar-nav-list-item">`, prepended to
   `.course-topbar-nav-list` when a MutationObserver on `body` sees it
   exist (then disconnect). Handle submit with
   `preventDefault` + `stopImmediatePropagation`.
7. **Results**: run `lunrIndex.search(query)`; use a lodash chain to
   map refs → `{time, video, section}`, group by section, sort by
   section, then group by video, sort, and emit
   `{header, videos:[{title, link, quotes:[[time, text], ...]}]}`.
   Render via precompiled Handlebars template
   `HANDLEBAR_TEMPLATES["coursera-searcher/result.hbs"]` inside
   `picoModal(...).afterClose(destroy).show()`.
8. **Template** (`result.hbs`): inline `<style>` (video centered,
   visited links `#D13924`), a single `<video width=640 height=480
   controls id="video_fts">` with `<source id="source_fts">` at top,
   then per-section `<div class="section"><h1>{header}</h1>` and per
   video `<h4>{title}</h4><ul>` of `<li>[{time}] <a class=
   "fullTextSearch" data-section data-video data-time>{quote}</a>`.
   Compiled by `grunt-contrib-handlebars` (namespace
   `HANDLEBAR_TEMPLATES`) into `templates.js`, concatenated first into
   `coursera-fts.js`.
9. **Playback**: delegated `$('body').on('click',
   'a.fullTextSearch', ...)` reads `data-section`/`data-video`/
   `data-time`, sets `#source_fts.src = videoLink + "#t=" + time +
   "," + (time+10)`, calls `load()/play()` on `#video_fts`, and
   `scrollIntoViewIfNeeded()`.
10. **Publish tooling**: `publish.rb` bumps the manifest version
    (x.y.9 → x.(y+1).0 rollover), `zip -r coursera-searcher
    coursera-searcher`, runs `grunt publish` (= `make` +
    `webstore_upload` reading gitignored root `secret.json` keys
    `client_id`/`client_secret`, appID
    `ibdlkknhoibmpmoglnmkapalkminbidc`, zip
    `coursera-searcher.zip`, `publish: true`).

## All design decisions

- Everything client-side in content scripts; no server, no accounts
  (see architectural-diary/decisions/001).
- PouchDB caches raw srt text per course; lunr index is rebuilt per
  page load from cache (002).
- Two concatenated bundles instead of CDN `@require`s (extension CSP +
  single-scope globals); generated files are committed and must be
  rebuilt with `grunt make` after editing sources (003).
- Search-hit id `<videoIndex>#<seconds>` doubles as the jump target —
  one string carries video + seek position.
- Incremental subtitle sync: only fetch indices missing from the
  cached doc (`!srts.hasOwnProperty(i)`), initialize `data: {}` —
  the initial inverted-guard bug shipped empty results on first run
  and is the project's one true bugfix (commit 1607cce).
- UI injection waits on MutationObserver because Coursera rendered
  the topbar asynchronously; no polling.
- Results grouped section → video → time so matches read like the
  course outline.
- Playback is a 10-second media-fragment preview in one shared
  inline video, not navigation to the lecture page.
- `takeMeAway()` in the template's inline `onclick` is an undefined
  vestige of the userscript prototype; actual handling is the
  delegated jQuery click handler.
- Secrets (`secret.json`) stay out of git; `.gitignore` from the first
  commit.
- Zip artifacts not tracked; regenerated by `publish.rb`.

## Data model

- PouchDB db `coursera_fts`, doc `{ _id: <courseSlug>, data: {
  <lectureIndex-as-string>: <raw srt text> } }`.
- In-memory: `videoUrls[i] = {section:int, header:str, text:str,
  link:str}`; `sectionHeader` bidirectional map; `subtitles[id] = str`;
  lunr docs `{id, body}` with `id = "<i>#<seconds>"`.
- Template context: `[{header, videos: [{title, link, quotes:
  [[seconds, text], ...]}]}]`.

## Interfaces / APIs (by name)

- Extension page match: `https://class.coursera.org/*/lecture`.
- Content scripts: `coursera-fts.lib.js`, `coursera-fts.js`.
- Internal functions: `init()`, `showGUI()`, `loadData()`,
  `fetchSubtitles(dbResult)`, `insertOrUpdateDB(dbResult)`,
  `addLunrDocuments(videoIndex, srt)`, `parseTime(timeString)`,
  `getCourse()`.
- Grunt tasks: `make` (handlebars + concat), `publish` (make +
  webstore_upload).
- CLI: `ruby publish.rb`, `grunt make`, `grunt publish`, `bower
  install`, `npm install`.
- Debug globals: `window.lunrIndex`, `window.subtitles`,
  `window.db`.

## Acceptance criteria

1. `npm install && bower install && grunt make` regenerates
   `templates.js`, `coursera-fts.js`, `coursera-fts.lib.js`; all parse
   as valid ES5.
2. Loading `coursera-searcher/` unpacked in Chrome and opening a
   (2015-era) `class.coursera.org/*/lecture` page shows the search box
   in the topbar without reload.
3. First visit to a course downloads all subtitle files, stores them
   in PouchDB, and subsequent queries return results (the first-run
   regression 1607cce fixed).
4. Second visit performs no subtitle network fetches (PouchDB cache).
5. A query returns a modal with sections in course order, videos in
   lecture order, quotes in time order, each prefixed `[seconds]`.
6. Clicking a quote plays the inline video for ~10 s starting at that
   timestamp and scrolls it into view.
7. `ruby publish.rb` bumps the manifest version, rebuilds the zip,
   and (with `secret.json` present) uploads to the Web Store; without
   it, fails without leaking anything into git.
8. `git status` after a build shows no new tracked artifacts (zips
   ignored; bundles intentionally tracked).
