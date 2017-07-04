---
title: ngConf 2015 - Learnings
date: 2015-03-08
tags: [AngularJS, ngConf, 2015]
coverImage: abstract-12.jpg
coverCaption: '[dargadgetz](http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/)'
readingtime: 8
---

Wow! So much to process from ngConf 2015! Here are the key themes I took away.

<!-- more -->

## Angular 2 is looking pretty good
The performance of Angular 2 over previous versions - and even over React - is (and I'm not one to exaggerate) amazing! There was a [demo](http://youtu.be/LgshdUnTNPc?list=PLOETEcp3DkCoNnlhE-7fovYvqwVPrRiY7) by Dave Smith comparing a weekly scheduling component running in 1.3, 1.3 + React, then in Angular 2. Check it out.

Despite my continued misgivings about TypeScript (see [below](#typescript)), the fact that the developers repeatedly said that you don't need it to write Angular 2 applications makes me much more keen to try Angular 2 sooner, rather than later.

The fact that change detection is unidirectional now (from Model > Component > View) is a good thing for understandability of Angular and for performance. I'm not sure if it is related to the Flux architcture's notion of unidirectional data flow, but I think it does.


## Component Architecure
The component-architecture (and the declarative animation syntax coming to ngAnimate) remind me **a lot** of Adobe Flex. For the uninitiated, Adobe Flex used ActionScript (almost identical to Javascript, but with optional types) which had a component architecture, and a declarative view syntax (like HTML), including the ability to declare animations like this:

{% codeblock lang:html %}
<Parallel>
  <Fade target="componentA" fromAlpha="0" toAlpha="1" duration="200"/>
  <Sequence>
    <Rotate target="componentB" fromAngle ...>
    <Resize ...>
  </Sequence>
</Parallel>
{% endcodeblock %}

Of course, Flex didn't really have this capability in CSS, so this syntax was the main way of doing animations (though you could also do it in ActionScript). But my point is this: Component architectures are starting to adopt the patterns used in previous component architectures, which I feel is a sign of maturity.

Lastly, there was a demo (the Material design one, actually) that showed how using and configuring an Angular 2 component was the same as configuring a "standard" Web Component - in this case, a [Polymer](https://www.polymer-project.org/) component. Plus, they announced that Angular 2 components will run even in browsers without a Shadow DOM. This is fantastic! One less reason to delay using Angular 2.


## Angular 1.4+ will offer a migration path to v2
The fact that **ngNewRouter**, **ngTranslate** and **ngAnimate** are all based off a single codebase and support 1.4+ and 2.x is a great sign. It means:

- it is *possible* to write your module once and have it work in both versions of Angular (good news for component developers)
- the Angular team is committed to bringing good ideas back to *today's* version of Angular


## Building for large applications
Jen Bourney's [presentation](http://youtu.be/cVTN8msr5DE?list=PLOETEcp3DkCoNnlhE-7fovYvqwVPrRiY7) on building platforms with Angular was salient to the work that I'm doing with Odecee. There's a few tings I can apply to my current project:

- Optimising the lazy-load process to load modules with temporary routes initially, until such time as the actual module is loaded and loads it's own routes (and then cleans up the temporary route. This is much better than the main routing module having to know up-front all of the routes of the lazily-loaded modules.
- Allowing components to look-up their configuration at run-time (we're kind-of doing that already, but it's affirming)
- Using pre-commit hooks to run tests and ensure code has been linted before it gets into the repository



## FireBase, BackAnd, Wakenda, Falcor
All of these companies are offering ways to make it easier to talk to data stores and setup applications faster - which is great! My only concern is that the demos we see keep doing things like this:

{% codeblock lang:html %}
function MyController($firebaseService/* or other db IMPLEMENTATION */) {
  this.users = $firebaseService.get('/users');
  
  this.edit = function (user) {
    user.$save();
  };
}
{% endcodeblock %}

This violates an architectural principle (which John Papa also subscribes too) in which controllers should not know about *how* data is fetched or stored. This is an implementation detail and does not belong next to view logic, but belongs in a data-access layer (implemented as a service, in Angular).

So I'm hoping that these demos that we've seen are understood by the community to be *demos*, not *how-tos* for using these data services. If not, every new version of Firebase/Wakenda/BackAnd that is released will force you to touch your view-logic code, instead of your centralised data-access code.

<a name="typescript"></a>

## TypeScript is wonderful (if you sell tools or don't want to RTFM...)
...which I guess is fair chunk of the programming community, now I that I think about it. But that doesn't make it right!

I guess the thing that still bothers me about TypeScript is the extra work that I, as a programmer, have to do to to make my IDE work properly:

- I need to find or generate TypeScript definition files for each JavaScript library I'm about to use. There goes 5 minutes.
- I need to include references to those libraries **inside my source code** (urrggh!).

"Two steps isn't so bad!", I hear you say! Well, then there's compiling and deployment steps:

- I need an IDE that compiles the code automatically, or a build task to do this (which increases my debug loop)
- I need to seperate the source code from the compiled code (WebStorm by default generates your JS code beside the TypeScript file, but you can configure that)
- Then I need to make sure that the generated code runs on browsers that the app must support. And depending on the ES6 features I've used, I need to include a shim.
  
In summary, using TypeScript requires more work than my current development process and increases my debug loop. It reminds me of the step you could perform for Java projects, whereby you tell the IDE where the source code for a JAR file is so that it could help you debug the JAR. It was extra configuration that I feel I shouldn't need to do.

Summary: While TypeScript increases my development effort, I don't intend to use it. But if that changes, I'll reconsider.


## Google Material Design
I have mixed feelings about this. 

### Pros
The Material design components that Google have built look pretty good. They appear to make it pretty easy to get a material-looking up working quickly. The 10-minute demo we saw on day 2 (despite some editing-tricks) was pretty good.

### Cons
If I use Google Material Design, won't my app be just like every other Material Design app? I guess it just feels *too* prescriptive, like Microsoft's UI Guidelines were for Windows programs. Now don't get me wrong - I'm *for* UI conventions that make it easy for people to use new apps. But as a user, do I want my apps to all look and feel the same (aside from some theme colours)? 

Nope. 

When you contrast this with what BootStrap (which is kind of a component library as well as a CSS framework) offers, I feel that designers have *waaaay* more freedom to customise the look and feel of their app using BootStrap than you have with Material Design. And they can do this without affecting usability or breaking common UI-conventions.


## Prototyping with Angular 
This was a pretty cool [presentation](http://youtu.be/ufZpHuiyepg?list=PLOETEcp3DkCoNnlhE-7fovYvqwVPrRiY7) showing how the UX guys use their own Angular components to quickly change and configure working protoypes of components and applications. I especially liked the demo where they hooked up the Google Voice API to Angular, and could command the component to change it's style by saying things like, "Make the header blue", "Change the background picture to the car image", and the app changed!


## Other noteworthy things
- Ionic would be my starting point for building mobile-centric apps. Lots of neat features like view-state caching (remembering which page on a tab you are viewing, so you can change tabs and come back to the one you were looking at (again, reminiscent of Adobe Flex)).
- Falcor by Netflix, when it is open sourced, could be better than FireBase? Maybe? It batches service requests to enable views to be served with *only* the data that they will render/use, rather than the complete object containing all the data-fields/properties
- Benchpress tool for Protractor looks cool and helpful
- John Papa's talk was excellent on the need for code readability, with glimpse of a new tool that can validate a style guide
- Protractor plugins for automatically finding accessibilty issues looks cool
  - In fact, I'd like to contribute to Protractor to fix the horrible syntax for getting and setting an input element's value: get uses `inputElem.setText()`, set uses `inputElem.getAttribute('value')` 
- Running the $digest() cycle in a Web Worker was interesting, and may be useful in certain edge cases (like prime number calculations)
