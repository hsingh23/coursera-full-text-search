# 002 — PouchDB per-course cache with incremental fetch

Date: 2015-05-11 (commit f33d53a), fixed 2015-05-12 (commit 1607cce)
Status: implemented, shipped

## Context

A course can have hundreds of lectures; re-downloading every srt on each
visit would be slow and rude to Coursera's servers. But the lunr index
cannot be persisted, only the raw subtitle text can.

## Decision

- One PouchDB database (`coursera_fts`), one document per course, `_id` =
  course slug from `window.location.pathname`.
- Document shape: `{ _id, data: { <lectureIndex>: <srt text> } }`.
- On load: if the document is missing, fetch all srts then store; if
  present, fetch only indices absent from `data`, then store, then re-
  index everything into lunr.
- Raw text (not parsed cues) is cached so parsing/indexing stays in one
  code path (`addLunrDocuments`) for both fresh and cached data.

## Consequences

- Repeat visits skip network entirely once subtitles are cached; new
  lectures download individually.
- The initial ship had the guard inverted (`if (srts.hasOwnProperty(i))`)
  and initialized `data` from an undefined `srts` variable, so a fresh
  course indexed nothing — fixed in 1607cce by `data: {}` plus
  `!srts.hasOwnProperty(i)`.
- Per-course docs keyed by lecture index mean re-ordered lecture lists
  would map cached text to the wrong video; acceptable for a course site
  that appends rather than reorders.
