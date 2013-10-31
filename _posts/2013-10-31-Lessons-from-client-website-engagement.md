---
published: true
layout: post
title: "Notes from a recent mobile project"
description: ""
modified: 2013-10-31
tags: [client, mobile, web, SASS, HTML5, CSS3, AngularJS, CMS, Compass]
image:
  feature: abstract2.jpg
comments: true
share: true
---

I have been developing a website for a top-tier client in Melbourne. The site is built using AngularJS (v1.1.5 as of time of writing), SASS, Compass and GruntJs to pull it all together. The development team consisted of myself as lead dev, Mario Skouros, Peter Mescalchin and Steven Yip, with assistance from Michael Black and Vlado Grancaric. Well done guys!

#Design

The visual and interface design was by George Metaxas, who is part of the client's design team.

#Under the hood

The site is part application, part CMS-driven website. It was technically challenging to get the client's CMS to produce the content in a format and structure that AngularJS could consuem, but we found a solution that was workable.

The site is build for modern browsers (Android 2.3+, i-devices, Blackberry, ...) and should work with desktop browsers as well (recent versions of Chrome, Safari and Firefox). We elected early on not to support IE because, well, IE is not very standards-compliant. But in our case, there are not many IE-users of the old mobile site, so it wasn't worth investing in at this point in time.

##Engine & Chassis - AngularJS

We used AngularJS 1.1.5 - which added nice animation support and the ability to cancel timeouts. Using Angular was fantastic, but there were difficulties getting the Apache re-write rules to work for when the site was at the root and when it was a sub-directory site. Overall, I'd highly recommend using it for web applications and websites (up to N-hundred pages).

##Bolts - GruntJS

GruntJS is a fantastic tool for front-end devs. It allowed us to integrate font-icon-building, image optimization and source-code minimisation into our build process. Combined with Apache's mod_deflate, we were able to get the home page download from 1.2MB to less than 300kB (75% reduction).

##Paint - HTML5 & CSS3

The site design was implemented using SASS & Compass (with HTML). This kept the CSS from growing too big and the variable names allow us to maintain things more easily going forward. The CSS3 animation support in the Compass 0.13.alpha.4 helped us to do some nice CSS animations (like the loading spinner).

