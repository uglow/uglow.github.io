---
published: true
layout: post
title: "Web Accessibility on iOS7 devices"
description: ""
modified: 2014-08-03
tags: [accessibility, ios, aria, wcag, AngularJS]
comments: true
share: true 
image:
  feature: abstract-7.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

**UPDATE August 2nd 2014: The [Australia Post mobile site](http://m.auspost.com.au/) has been deemed AA compliant with respect to the WCAG accessibility guidelines!**

This page is dedicated to documenting some of the lessons learnt while implementing accessibility on iOS devices for the [Australia Post mobile site](http://m.auspost.com.au/).

Note: the term "everyone" in this article means "sighted users and users of VoiceOver technology on iOS devices". It is accepted practice - at least
in Australia - to focus accessibility testing on iOS devices due to the superior (as of 2014) screen reading technology on those devices, which is known as VoiceOver.
[Vision Australia](https://www.visionaustralia.org/) endorses this approach because their user-statistics indicate that people that have a need for a mobile screen reader almost exclusively (98%+) use iOS 
devices, due to the superior experience. On the Android side, there are many screen-reader options with varying degrees of ability and utility.  

##1. Element Visibility

- Use `aria-hidden` to hide things from screen readers
- Create a `visually-hidden` (or `sr-only` in Bootstrap lingo) CSS class to hide things from display but make them 'visible' to screen readers
- Use `ng-show` / `ng-hide` / `style="display:none` to hide things from everyone

##2. Setting focus
Moving the focus around is crucial for VoiceOver users to understand what they are "looking" at.

- Use `tabindex="0"` on non-focussable elements is best. `tabindex="-1"` doesn't always work with VoiceOver - it sometimes hits-then-skips to the next/nearest visible element instead of remaining on the focussed element 
- Set focus to the page heading when the page changes. This is especially necessary for single-page applications.
- May need to add descriptive text (e.g. `fieldset` with a `legend`) and `aria-describedby`
- Ideally, try to find a visible-to-everyone element that you can set the focus to. Setting focus on elements that are only visible to VoiceOver
seems to be unreliable/fragile. (This was the approach I ended up taking when showing search results (see below)). 


##3. Showing search results

It took a few attempts to get a search-results presentation scheme that worked for everyone. Key points:

- set focus to the first result
- add "result x of y," message to the beginning of each result item, to provide more context (and avoids the need for a separate "Y results found" label).
Note that this string can be hidden from sighted-users.
- Using `<span>` elements inside an anchor element, in combination with `aria-labelledby` (and `aria-describedby`, for secondary text)
 allows VoiceOver to read the anchor text smoothly, rather than reading the text-blocks that are inside the anchor one-at-a-time. 
 Using `<div>` elements caused the "read-one-text-block-at-a-time" behaviour.
- Adding a `role` attribute to a visually-hidden button element changed the VoiceOver behaviour so that it no longer focussed on the button (when
without the `role` attribute, it DID focus it. Roles tried: `status`, `alert`, `log`, `heading`. I tried this approach initially with a "Y results found" label
- adding `aria-controls="searchRegion"` to the search textbox created a link to the "searchRegion" element, which would have worked well if it was visible
 
##4. Accessible radio buttons and checkboxes that look nice
- Need certain structure to overlay the input-element on-top-of the label/button to work with Safari
- Use the same name for the collection of inputs, but provide unique ids for each element to allow the label-click to work
- group controls with fieldset

##5. Abbreviations
- We wrote an `<abbr>` directive to make abbreviations accessible by converting the `<abbr title="...">...</abbr>` text into a visually-hidden child node of the `<abbr>` element,
then using `aria-hidden` on the abbreviation itself. This doesn't work when the abbreviation is inside an block that you are using via
`aria-labelledby` or `aria-describedby`, which just reads the text (ignoring the aria-hidden attributes in most cases) or reverts to reading in block mode 
instead of reading the text like a sentence.

##6. Tabs
Not too hard to implement, though there are still some unexpected (to me at least) behaviours when opening/closing tab-accordians.

###Standard tabs
Basically, you have a parent element with `role="tablist"` to contain the tab, each tab has `role="tab"`, tab panels have `role="tabpanel"`.
You can use `aria-labelledby` to label the tabs some content in the corresponding tab panel.

###Tab accordians
Same as standard tabs: parent element has `role="tablist"`, each tab has `role="tab"`, tab panels have `role="tabpanel"`.
Additionally, add an `aria-expanded="true/false"` to each tab, backed up with some visually hidden text to match (e.g. "expanded", "collapsed")

####Unexpected behaviour
When the tab state changes (and hence, the text inside the tab element (or the `aria-selected` value) changes), Voiceover reads the OLD state THEN the new state.
Before the tab panel is opened, Voiceover says "collapsed, <tab text>, tab, <tab-number> of <total-tabs>". When the tab is activated, it says, 
"collapsed, <tab text>, tab, <tab-number> of <total-tabs>, selected. expanded, <tab text>, tab, <tab-number> of <total-tabs + 1>" - which means that it treats the **tab-panel**
 (if it is a child of the element with `role="tablist"`) as a **tab** element.


##7. Checkboxes
- If using `ngModel` with `ng-checked` property, you need to be careful to ensure that `ng-checked` includes the `ng-model` expression in it's own expression.
I had a case where the `ng-model` expression was not part of the `ng-checked` expression, and when the checkbox changed from checked to unchecked (with the `ngModel` value still `true`),
visually the checkbox looked checked, but clicking on it did not change the `ngModel` value (it was still `true`). It required a second click to change the checked state.
E.g. `ng-model="a"   ng-checked="a || b || c" // Include "a" in the expression`


    