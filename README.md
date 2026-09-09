# Coursera Full Text Search

Because life is short, and searching with computers is faster.

A Chrome extension (Manifest V2, circa 2015) that adds full-text search to
Coursera course lecture pages: it downloads every lecture's subtitle file,
indexes the text with [lunr.js](https://lunrjs.com/), and lets you jump
straight to the moment in the video where something was said.

> Status: historical. It targets the retired `class.coursera.org` UI and
> old library versions, so it will not run against today's Coursera. It is
> preserved as a compact example of client-side search over video
> subtitles. See [prompt.md](prompt.md) to recreate it from scratch.

## Why

Coursera's lecture list only let you search titles. If you remembered a
phrase a professor used but not which week it was in, you were stuck
scrubbing videos manually. This extension answers "where did they say
that?" by indexing the srt subtitle files that Coursera already publishes
alongside each lecture.

## Features

- Full-text search across all lecture subtitles of the current course.
- Results grouped by course section, then video, with timestamped quotes.
- Click a quote to play the video inline from that exact second
  (10-second preview window via a media fragment).
- Subtitles are fetched once per course and cached in PouchDB
  (IndexedDB), so revisits are instant and only newly published
  lectures are downloaded.
- Search box appears in the course topbar once the page finishes building
  its navigation (MutationObserver, no page reload needed).
- Results render in a lightweight modal (picoModal) with a Handlebars
  template.

## Stack

| Layer | Choice |
| --- | --- |
| Platform | Chrome extension, content scripts (Manifest V2) |
| Search index | lunr.js 0.5.x (in-memory, per page load) |
| Cache | PouchDB 3.4 (browser IndexedDB, per-course docs) |
| DOM / AJAX | jQuery 2.1 |
| Async | Q promises |
| Data shaping | lodash 3.8 |
| Templating | Handlebars 3.0 runtime |
| Modal | picoModal (vendored) |
| Build | Grunt + Bower (template compile, concatenation) |
| Publish | Ruby script + grunt-webstore-upload |

## Quickstart

Requirements (as of the original era): Node.js + npm, Bower, Ruby, and the
`zip` utility.

```sh
npm install          # grunt + tasks
bower install        # vendor libs into bower_components/
grunt make           # compile result.hbs and build the two bundles
```

Load it unpacked in Chrome: `chrome://extensions` → Developer mode →
"Load unpacked extension…" → select `coursera-searcher/`. Then open any
`https://class.coursera.org/<course>/lecture` page (2015-era Coursera).

To publish a new version (requires an untracked `secret.json` with Chrome
Web Store API credentials — name only; never commit it):

```sh
./publish.rb   # or: ruby publish.rb
```

## Structure

```
coursera-searcher/          # the extension itself (load this directory)
  manifest.json             # MV2 manifest; matches */lecture pages
  coursera-fts.lib.js       # GENERATED: lodash+lunr+jQuery+PouchDB+Q+Handlebars
  coursera-fts.js           # GENERATED: templates.js + picomodal.js + app code
  coursera-searcher.js      # SOURCE: scraping, indexing, caching, search UI
  result.hbs                # SOURCE: Handlebars template for the results modal
  templates.js              # GENERATED: compiled result.hbs
  picomodal.js              # vendored modal library
  icons/search.png          # extension icon
Gruntfile.js                # handlebars compile + concat + webstore upload
publish.rb                  # version bump + zip + grunt publish
package.json / bower.json   # npm dev deps / Bower vendor deps
```

## Environment / configuration names

- `secret.json` (repo root, gitignored) — Chrome Web Store API credentials
  used by `grunt-webstore-upload`; expected keys `client_id`,
  `client_secret`.
- No other environment variables or config files; all other behavior is
  hard-coded in the sources above.

## Notes

- Indexed document id format is `<videoIndex>#<startSeconds>`, which is
  how a search hit maps back to a video and a seek position.
- See [CHANGELOG.md](CHANGELOG.md) for history,
  [AGENTS.md](AGENTS.md) for working on the code, and
  [architectural-diary/](architectural-diary/) for design decisions.
