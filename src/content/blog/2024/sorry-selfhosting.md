---
title: Moving back to GitHub and Vercel (for now)
subtitle: I love you self-hosting, but I must eat my words and make things easy for myself.
date: 2024-07-04
tags: ["meta", "self-hosting"]
draft: true
image:
  src:
  alt:
---

I spend at least 20% of my time on my computer fiddling with self-hosting services such as [Forgejo](https://git.laker.tech), [Cobalt](https://cobalt.laker.tech) etc.
That includes this site. However, it's also a right faff[^1] to set things up.

I also have a tendency to be quite... heavy-handed with the button that rebuilds my VPS that everything I host runs on.
Last time I did that, [^2] I knocked out this site for 20 minutes and that made me **extremely** anxious as I scrambled to get it back up. [^3]

[^1]: faff: North-East England slang - an annoyance or ordeal etc.
[^2]: About a month ago, apparently.. ([toot on mastodon](https://social.lol/@la/112302559259145332))
[^3]: Hashtag One Hundred Percent Uptime

I forgot to save any of the site's config that wasn't in the Git repo, so I had to grab an old version of the script I use to build the site
from a paste and remember how Caddyfiles worked as both got deleted in the rebuilding.

So I'm moving back to Vercel to host laker.tech for a short to medium while, mostly while I work out how I should do things.
Plus it redeploys on commit to the main branch instead of me having to deploy it myself. [^4] [^5]

I'll still be using Bunny CDN for images cause it's easier than fiddling about with binary files on Git. 
(oh yeah, i set that up and forgot to write about it)

[^4]: I could do this on my VPS but SSH over github / forgejo actions sounds like hell to setup
[^5]: It also means I get a reason to make my git commits actually make sense

### Everybody Likes You, Github (except me) [[source](https://www.youtube.com/watch?v=4xElp-lYnyE)]

The reason I'm moving back to GitHub (not including Vercel) is everybody[^6] else uses it.
Which means all the tooling, integrations, and all other manner of cool shit is entirely dependent on GitHub
and I've got neither the time or the skills to remake everything I use.

