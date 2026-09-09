# 001 — Client-side subtitle indexing (no backend)

Date: 2015-05-11 (commit f33d53a)
Status: implemented, shipped

## Context

Coursera published an srt subtitle file next to every lecture video, and
the lecture list only searched titles. We wanted "where in the course did
they say X?" without running a server, an account system, or a crawler.

## Decision

Do everything inside a content script on the lecture page:

- The lecture index page already links every srt; scrape those links plus
  each lecture's mp4 and section header from the DOM.
- Fetch the srts with the page's own session (same-origin `$.get`).
- Index each subtitle cue into an in-memory lunr index, keyed
  `<videoIndex>#<startSeconds>` so a hit carries both which video and
  which second.
- Render results and play video with plain DOM APIs.

## Consequences

- Zero infrastructure; users install an extension and it works.
- The index is rebuilt from cached srts on every page load (lunr 0.5
  indexes are not serializable here), costing some CPU per visit but
  keeping the design simple — see 002 for the cache that makes this
  cheap.
- Extension lifespan is tied to Coursera's DOM structure and srt
  endpoints; when `class.coursera.org` retired, the extension retired
  with it.
