# Changelog

All notable changes to this project. Dates reflect original authorship.
Newest first.

> History note (2026-09-08): commit messages on `master` were improved via a
> messages-only history rewrite (trees and file contents unchanged). Commit
> hashes below are the post-rewrite hashes; content and authorship date of
> each commit are identical to the originals.

## 2015-05-12 — 1607cce — fix: fetch subtitles on first run by inverting cache guard

- Fix `fetchSubtitles` initializing its data store from an undefined `srts`
  variable and only downloading subtitle indices already present in the
  cache — on a fresh course nothing was fetched, so no videos were indexed
  or searchable the first time.
- Initialize the PouchDB document's `data` to `{}` and invert the guard to
  `!srts.hasOwnProperty(i)` so every uncached subtitle is downloaded.
- Apply the same fix to both the source (`coursera-searcher.js`) and the
  generated bundle (`coursera-fts.js`).
- Bump extension manifest version to 1.0.9.
- Ignore `*.zip` in `.gitignore` and remove the accidentally committed
  `coursera-searcher.zip` build artifact (publish.rb regenerates it).

## 2015-05-11 — f33d53a — feat: add Coursera full-text video search extension with publish tooling

- Initial import of the "Coursera Searcher" Chrome extension (Manifest V2)
  that full-text-searches lecture videos on `class.coursera.org/*/lecture`
  pages by indexing their subtitle (srt) files.
- Scrape the lecture list for subtitle links (`a[title='Subtitles (srt)']`),
  MP4 download links, and section headers; fetch each srt and index every
  cue with lunr.js using the id `<videoIndex>#<startSeconds>`.
- Cache raw srt text per course in PouchDB (`coursera_fts`), keyed by course
  slug, so revisits skip already-downloaded subtitles.
- Inject a search box into the course topbar via a `MutationObserver` (waits
  for the nav list to exist), submit runs the lunr query.
- Transform search hits with a lodash chain into sections → videos →
  timestamped quotes, rendered by a compiled Handlebars template
  (`result.hbs` → `templates.js`) inside a picoModal dialog.
- Clicking a result seeks an inline `<video>` element to the quote using a
  media fragment (`#t=start,start+10`).
- Add the build/publish pipeline: Gruntfile compiles Handlebars templates
  and concatenates Bower vendor libs (lodash, lunr, jQuery, PouchDB, Q,
  Handlebars runtime) into `coursera-fts.lib.js` plus app code into
  `coursera-fts.js`; `grunt-webstore-upload` pushes the zip to the Chrome
  Web Store using a gitignored `secret.json`; `publish.rb` bumps the
  manifest version, re-zips, and runs the publish task.
- Add `package.json`, `bower.json`, `README.md`, `.gitignore`, extension
  icon, and (at this commit) a committed zip artifact later removed.
