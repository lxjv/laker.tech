---
title: The Overwhelming Efficiency of the Terminal
subtitle: I blab about vim, mostly
date: 2024-04-11
tags: ['tech', 'setup', 'neovim']
image:
  src: head.jpg
  alt:
footnotes:
  1: "https://noboilerplate.org"
  2: "https://github.com/nvim-lua/kickstart.nvim"
---

I love using the terminal. I love the UI of it all and the speed of writing out commands and keybindings.

This was fueled by the 2 years I spent using Linux as my main operating system, starting with Mint, and eventually ending up on Arch (by the way).

But once I moved to MacOS last year, I stopped using the terminal almost all together.

I started using Visual Studio Code and essentially only used the terminal for running this site's dev server.

But I started to miss it. I missed Vim (even if I was (and still am tbh) terrible at it).

So I ripped up my incomplete dotfiles and started fresh (by accident, i forgot to back them up and `rm -rf`'ed)

### Neovim

I started with my Neovim config which was... dire.

I removed it all and started with a starter config called AstroNvim, on the recommendation of [Tris](https://noboilerplate.org),
but it felt too heavy weight for me.

At this point TJ DeVries, a core developer of `nvim` itself, released a new version of Kickstart.nvim[^2],
a framework of simple defaults so you can write your own Neovim config on top.

So I ripped up AstroNvim and started again, this time with Kickstart.

This got off to a better start as I actually knew what I was doing and could learn how to set things up.

> You can see my current Neovim config [here](https://go.laker.tech/neovim)!