# Architectural diary — coursera-full-text-search

A compact record of how this extension is built and why. Written
retroactively (2026-09-08) from the two surviving commits
(`f33d53a` 2015-05-11, `1607cce` 2015-05-12); details reflect the code as
it stands on `master`.

## The one-paragraph story

The project started as a Greasemonkey userscript (its header is still
embedded atop `coursera-searcher/coursera-searcher.js`, with `@require`
CDN links for jQuery/lunr/Q/PouchDB/Handlebars/lodash). To ship it to
non-technical users it became a packaged Chrome extension: the CDN
requires were replaced by a Bower + Grunt concatenation step producing a
single vendor bundle (`coursera-fts.lib.js`) and a single app bundle
(`coursera-fts.js`), loaded as content scripts on
`class.coursera.org/*/lecture`. Everything else — scraping, indexing,
caching, UI, playback — lives in roughly 280 lines of
`coursera-searcher.js`. A Ruby publish script automates version bumping
and Web Store upload.

## Timeline

| Date | Commit | What happened |
| --- | --- | --- |
| 2015-05-11 | f33d53a | Whole project lands at once: extension, build, publish. Contains a latent first-run bug (inverted cache guard + undefined `srts`) and a committed zip artifact. |
| 2015-05-12 | 1607cce | First-run fix (`data: {}`, `!srts.hasOwnProperty(i)`), version 1.0.9, stop tracking zips. |

## How it works at runtime

1. Scrape the lecture index page for srt links, mp4 links, section
   headers.
2. Fetch missing srts, store raw text per course in PouchDB.
3. Index every subtitle cue in lunr with id `<videoIndex>#<seconds>`.
4. Inject a search box into the topbar via MutationObserver.
5. On query: lunr search → lodash chain regroups hits into
   sections/videos/quotes → Handlebars template in picoModal.
6. On click: inline `<video>` seeks with a `#t=start,start+10` media
   fragment.

## Decision index

- [001-client-side-subtitle-indexing.md](decisions/001-client-side-subtitle-indexing.md) — search runs entirely in the page, no backend.
- [002-pouchdb-per-course-cache.md](decisions/002-pouchdb-per-course-cache.md) — raw srts cached per course, incremental fetch.
- [003-concat-bundles-over-cdn.md](decisions/003-concat-bundles-over-cdn.md) — userscript → extension; Bower+Grunt concat instead of CDN `@require`.
- [004-ruby-grunt-publish-flow.md](decisions/004-ruby-grunt-publish-flow.md) — publish.rb + grunt-webstore-upload, secret.json kept out of git.

## Known sharp edges (as shipped)

- `takeMeAway()` in the template's inline `onclick` is undefined; the
  delegated jQuery handler does the real work.
- The `fetchSubtitles` promise chain resolves its deferred synchronously;
  persistence correctness leans on in-place mutation.
- DOM selectors are hard-wired to the 2015 Coursera layout.
- Timings handled with `setTimeout` (900/1500 ms) rather than events.
