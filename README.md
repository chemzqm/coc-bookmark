# coc-bookmark

Bookmark manager extension for [coc.nvim](https://github.com/neoclide/coc.nvim)

Inspired by [vim-bookmarks](https://github.com/MattesGroeger/vim-bookmarks)

## Install

```
:CocInstall coc-bookmark
```

## Features/Notes

- Toggle bookmark for a line
- Add annotation for a line
- Navigate all bookmarks with CocList
- Bookmark will be deleted if the line was changed

## Configuration

```jsonc
"bookmark.enable": {
    "type": "boolean",
    "default": true,
    "description": "Whether to enable this extension"
},
"bookmark.maxsize": {
    "type": "number",
    "default": 5000,
    "description": "Maxsize of bookmark"
},
"bookmark.sign": {
    "type": "string",
    "default": "⚑",
    "description": "Bookmark icon for sign column"
},
"bookmark.signFg": {
    "type": "string",
    "default": "",
    "description": "foreground color of bookmark sign"
},
"bookmark.signBg": {
    "type": "string",
    "default": "",
    "description": "background color of bookmark sign"
}
```

more information, see [package.json](https://github.com/voldikss/coc-bookmark/blob/master/package.json)

## Commands

- `:CocCommand bookmark.toggle`: create/delete a bookmark
- `:CocCommand bookmark.annotate`: create a bookmark with annotation

## Keymaps

- Normal mode: `<Plug>(coc-bookmark-next)`
- Normal mode: `<Plug>(coc-bookmark-prev)`
- Normal mode: `<Plug>(coc-bookmark-toggle)`
- Normal mode: `<Plug>(coc-bookmark-annotate)`

```vim
nmap <Leader>bj <Plug>(coc-bookmark-next)
nmap <Leader>bk <Plug>(coc-bookmark-prev)
```

## CocList

run `:CocList bookmark` to open the bookmark

- Filter your bookmarks and perform operations via `<Tab>`
- Use `preview` to preview the line you have marked
- Use `delete` to delete a bookmark
- Use `o` to jump to the line at the file

## License

MIT
