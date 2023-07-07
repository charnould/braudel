# Braudel

## Foreword

Braudel is at the same time a learning experience and a tool to scratch my own itch. It might not work for you for various reasons. I'll try to make it robust in the future. But currently it serves me kind of-well.

Braudel does **not** follow `semVer`.

## What's Braudel?

**A `git log` Changelog, News & New contributors Generator.**

- When heavy guns (e.g. [`release-please`](https://github.com/googleapis/release-please) or [`semantic-release`](https://github.com/semantic-release/semantic-release)) aren't necessary.
- When you don't want a full-blown system with GitHub bot, `PR` and `Releases`...
- When you use `squash merging` (you get a much more cleaner changelog)
- When you want to add special `news` to your changelog
- When you want an `UPDATES.md` to be some commits behind 😅
- Minimal. Bugged (almost no error catching). No dependencies. No fuss.

## Usage

_Require Node.js > `18.x` or Bun.sh._  
_Braudel works (best) if commits follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)._

### Generate an `UPDATES.md`

1. Use `git` as usual and whenever you feel it's the right moment:
2. `npx braudel@latest --gh "{username}/{repo}"` (e.g. `charnould/braudel`)  
   You can add a `--group` flag (`day`|`week`|`month`|`year`)
3. It will output `UPDATES.md` in your root directory.

### Add a `news` to your `UPDATES.md`

1. `npx braudel --news "A Headline" --message "Some content"`  
   It will create an empty commit with above headline and content

## Demo

`Braudel` [`UPDATES.md`](./UPDATES.md) is generated using itself!  
But I've just cleaned up my `git` history (was a mess!)

## Todo/roadmap

- [ ] Catch errors
- [ ] Add tests
- [ ] Allow to add link in `news`
- [ ] Make it work better: regex, sorting, etc.
- [ ] Generate a 'new contributors' chapter
- [ ] Be able to modify output file
- [ ] Lookup between git user and GitHub username (?)
- [ ] Be able to disable 'new contributors' and/or 'changelog'

# Licence

MIT.  
Copyright (c) 2023-present, Charles-Henri Arnould
