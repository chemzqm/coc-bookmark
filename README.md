# coc-bookmark

Bookmark manager extension for [coc.nvim](https://github.com/neoclide/coc.nvim)

Inspired by [vim-bookmarks](https://github.com/MattesGroeger/vim-bookmarks)

## Install

```
:CocInstall coc-bookmark
```

## Features

- Toggle bookmarks per line ⚑
- Add annotations per line ☰
- Navigate all bookmarks with quickfix window
- Bookmarks will be restored on next startup
- Bookmarks per working directory (optional)
- Fully customisable (signs, sign column, highlights, mappings)
- Integrates with Unite's quickfix source if installed
- Integrates with ctrlp.vim if installed
- Works independently from vim marks

## Configuration

```jsonc
"bookmark.maxsize": {
    "type": "number",
    "default": 5000,
    "description": "maxsize of bookmark"
}
```

more information, see [package.json](https://github.com/voldikss/coc-bookmark/blob/master/package.json)

## Commands

- `:CocCommand bookmark.toggle`: create/delete a bookmark
- `:CocCommand bookmark.annotate`: create a bookmark with annotation

## CocList

run `:CocList bookmark` to open the bookmark

- Filter your bookmarks and perform operations via `<Tab>`
- Use `preview` to preview the line you have marked
- Use `delete` to delete a bookmark
- Use `o` to jump to the line at the file

## License

MIT

## Screenshots

