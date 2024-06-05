---
title: How I use Raycast
subtitle:
date: 2024-05-26
tags: ["tech", "mac", "apps"]
draft: true
---

[Robb Knight](https://rknight.me) recently made [Three](https://rknight.me/blog/tags/raycast/)[^1] blog posts[^2] about switching to Raycast, an application launcher/Spotlight replacement/confetti machine available for MacOS.

[^1]: At the time of recording, at least.
[^2]: One of which mentions me! Thanks Robb, it's nice to be a good influence for once xD

So I thought I might as well show how I use it.

### Window Management

Every time I open an app I'm going to be using for more than 5 or so minutes I do 2 things: Add a new virtual desktop so all my apps won't get cluttered, and then open Raycast and hit `am`, my alias for Almost Maximise[^3] which centres the focused window and resizes to 90% of my screen so I can still see my wallpaper cause I think it looks lovely[^4].

![A screenshot of my terminal, after I've used the almost maximise command](https://cdn.laker.tech/dottech/image/posts/raycast/window-management.png)

[^3]: Since I wrote that sentence, I've switched to using mostly hotkeys for things like that. Now I hit `Hyper + A`.
[^4]: By the way, I just changed my wallpaper for the first time since June last year. It's not \#6768AA anymore. It's instead a collection of wallpapers from [Raycast's wallpaper pack](https://www.raycast.com/wallpapers). This is weird as hell to me but it's cute.

### Port Manager

It shows me what ports I'm using and lets me close the process that's using it.

I have this issue where VS Code sometimes persists my terminal session when I close it (or it's a skill issue) so the dev server for this site gets stuck and when I go over to edit in Neovim, it messes up when I open the server again as it goes onto a different port.

This kerplodes the server and I can start working.

![A screenshot of my terminal, after I've used the almost maximise command](https://cdn.laker.tech/dottech/image/posts/raycast/port-manager.png)

### Reminders

For my to-do lists, I use Apple's built in reminders app. I wanted a quicker way to use it. So I added it to Raycast and now i can do `Hyper + R` to add a new reminder to my lists, and `Hyper + 3` to see them (3 is close to R)

![A screenshot of the reminders view, with my to-do list censored (it's all boring to be honest)](https://cdn.laker.tech/dottech/image/posts/raycast/reminders.png)

### Some more things I can only write a single line about
- VSCode extension: has a Search Recent Projects command which... shows your recent project folders
