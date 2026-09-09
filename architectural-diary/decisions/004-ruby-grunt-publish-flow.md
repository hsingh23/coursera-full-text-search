# 004 — Ruby + Grunt publish flow with out-of-git secrets

Date: 2015-05-11 (commit f33d53a)
Status: implemented, shipped

## Context

Releasing to the Chrome Web Store by hand means: bump the manifest
version, repackage the zip, open the developer dashboard, upload. Easy to
get wrong and tedious per iteration.

## Decision

- `publish.rb` (Ruby, stdlib `json` only):
  1. Bump `coursera-searcher/manifest.json` version; patch-level 9 rolls
     into the minor digit (x.y.9 → x.(y+1).0).
  2. `zip -r coursera-searcher coursera-searcher` to (re)build the
     package.
  3. Shell out to `grunt publish`.
- `Gruntfile.js` `webstore_upload` task reads `secret.json` at the repo
  root (gitignored) for the Web Store API `client_id` / `client_secret`
  and targets extension app id `ibdlkknhoibmpmoglnmkapalkminbidc`,
  uploading `coursera-searcher.zip` with `publish: true` (submit
  immediately after upload).

## Consequences

- One command releases a version: `ruby publish.rb`.
- Credentials live only in the gitignored `secret.json`; the repo's
  `.gitignore` has covered it since the first commit, and no secret
  material is tracked.
- Version bumping is string surgery in Ruby rather than npm tooling —
  fine for a three-digit semver in a small manifest.
- The Gruntfile interpolates `<%= secret.client_id %>` /
  `<%= secret.client_secret %>`, so `grunt publish` fails loudly when
  `secret.json` is absent.
