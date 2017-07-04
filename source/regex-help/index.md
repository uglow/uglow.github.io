---
title: RegEx Tips
date: 2013-11-14 22:43:56
---


These are some useful regular expressions that I should remember but I don't. So I've written them here for later reference ☺.


Purpose | Expression | Example
:------ | :--------- | :------
Ignore whitespace chars | `[\s\S]*?` | `/some html text with a line break and tabs between here[\s\S]*?and here/`
Non-capturing group | `(?!:)` | `/(?:match but ignore this data) (match this though)/`