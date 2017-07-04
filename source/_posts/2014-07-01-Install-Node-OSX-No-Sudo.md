---
title: Simple sudo-less NPM installs on OSX
date: 2014-07-01
tags: [node, npm, sudo, osx]
coverImage: abstract-2.jpg
coverCaption: '[dargadgetz](http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/)'
---

OK, so I finally understand [why it's bad](http://blog.hood.ie/2014/02/why-you-shouldnt-use-sudo-with-npm/) to use `sudo npm install`.

<!-- more -->

Here's how I got a sudo-free install of Node+NPM on OSX:

1. Download [OSX Node package](http://nodejs.org/download/)
2. Install the package using the defaults
3. Open terminal, and type `npm config set prefix /path/to/your/npm/global/folder`. The path that you use should be a path that you have full permissions to (e.g. you created/own the folder)
4. Edit your `~/.bash_profile` to include `/path/to/your/npm/global/folder/bin` in your `$PATH` (note the **/bin**)

In my case, I used `npm config set prefix /mydev/tools/npm`. This sets the location where [global NPM packages are dropped](https://www.npmjs.org/doc/files/npm-folders.html#prefix-configuration).

You need to put the `/path/to/your/npm/global/folder/bin` location on your path so that the globally-installed packages (e.g. `npm install -g grunt`) can be executed from the command line using `command` instead of `/path/to/your/npm/global/folder/bin/command`.
