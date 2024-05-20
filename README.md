# Tree Sitter Bend

Tree-sitter grammar for [Bend](https://github.com/HigherOrderCO/Bend/).

!["universe"](img/demo1.jpg?raw=true "Simple highlighting demo")

## Installation

This project isn't published to nvim-treesitter yet, in the meatime you can do a local install:

- Make sure you have `nvim-treesitter` installed and working.
- Clone this repository and run `tree-sitter generate` from the root.
- Add this to your nvim's `init.lua`:

```lua
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.bend= {
  install_info = {
    url = "<tree-sitter-bend directory>", -- local path or git repo
    files = {"src/parser.c"}, -- note that some parsers also require src/scanner.c or src/scanner.cc
	branch = "main", -- default branch in case of git repo if different from master
  }
}
```

- Create a `bend` directory in `nvim-treesitter`'s `queries/` directory. If you installed `nvim-treesitter` with `Plug.vim`, it's likely `~/.vim/plugged/nvim-treesitter/queries/`.
- Copy `queries/highlights.scm` into the directory you just created. Alternatively, you can use a symlink: `ln -s <this_repo>/queries/highlights.scm ~/.vim/plugged/nvim-treesitter/queries/bend/highlights.scm`
- Finally, open vim and run `TSInstall bend`
- That's it!

## Getting updates
- `git pull` in the repo
- Run `tree-sitter generate` at the root of this repo
- Open vim and run `:TSUpdate`
- Copy `query/highlights.scm` if you didn't set up a symlink.

## Recognizing `.bend` files

If you haven't set up your `nvim` to recognize `.bend` files, you can put this in `~/.config/nvim/ftdetect/bend.vim`:

```vim
au BufRead,BufNewFile *.bend                set filetype=bend
```
