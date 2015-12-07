---
published: true
layout: post
title: "YOW! Conference 2015"
description: ""
modified: 2015-12-08
tags: [conference, yow, learn, lesson]
comments: true
share: true 
image:
  feature: yow2015.jpg
  credit: Me
  creditlink: 
---

> Testing... testing... one, two... is this thing on?

I know. It's been a while. But I've been happily refactoring code and learning new things since my last post, but not game
enough to talk about anything in particular. But then my fabulous company [Odecee](http://www.odecee.com.au) gave me
a ticket to [YOW! Conference Melbourne](http://melbourne.yowconference.com.au/) for being such an excellent guy - how could I refuse?

So this post is more-or-less my notes from the conference. There will be inaccuracies, missing pieces and interpretations. I hope you enjoy. It's in order of best-to-not-as-good, (IMHO).

##Main Learnings##
- The future is functional and concurrent (and event driven)
- [Docker](#deploying-and-scaling-microservices---sam-newman-thoughtworks) might be the best kind of software artifact that everyone can use and understand
- [Conway's Law](https://www.thoughtworks.com/insights/blog/demystifying-conways-law)
- [Transcript](#transcript-end-user-programming-of-mobile-social-apps---jonathan-edwards)
- [Generators are cool!](#the-miracle-of-generators---bodil-stokke)
- [The limits of my language are the limits of my world](#avoiding-rigor-mortis---dave-thomas)


##Keynote Thursday 9am - Adrian Cockcroft - "It's complicated..."##

- In modern systems there can be so many moving parts that we cannot intuit what a system will do *next*. But we deal with this complexity by using patterns,
conventions and personalising our user interfaces (e.g. cars, phones).
- When companies become more complex, they add rules to prevent past problems from re-occurring. You can often tell what has happened in a company
by looking at their HR manual, and noticing the things that they focus on.
- Netflix has tried to create a culture whereby the company gets out of the way of their engineers. They ask employees to figure out how to meet the companies goals.
If someone does something great, they then ask, "Can you grow bigger wings?" (rather than squashing them)
  - This is what is known as a *Freedom and Responsibility* culture (Reed Hastings)
- Imposing process drives away talent (and innovation)
- *Conway's Law: You will design systems which reflect the communication structures in your organisation*. 
- Netflix had lots of little teams talking to lots of over little teams - microservice patterns naturally emerged.
- Microservices enforce the separation needed in a good architecture.
- Visualisation of complex systems is need to help us understand those systems better
  - [Spigo](http://github.com/adrianco/spigo)
  - OpenZipkin


##Transcript: End user programming of mobile social apps - Jonathan Edwards##

- Spoke about the gap between anyone being able to program a spreadsheet, and only specialists able to create applications.
- Hypercard bridged this gap, when it was around.
- **Transcript** is a work-in-progress language that:
  - is designed to work on mobile devices
  - is socially aware (knows who you are, allows other people to join in)
  - allows you to create social applications
  - uses a DSL to describe the data types, tasks, user access, editablity of data and UI definition
  - works without email - uses notifications
  - allows you to build workflows
  - the document *IS* the user interface
- Examples:
  - a TODO application in 3 lines of code
{% highlight js  %}
worklist {
  do: string,
  completed: response(check)
}
{% endhighlight %}
  
  - a book club application with voting and comments in about 10 lines
  - a teaching application where students could ask for help on a particular topic, and the teachers with knowledge on that topic would be notified
- Still a [work in progress](http://alarmingdevelopment.org/)
- Can we programming so simple that it disappears?

 
##The Miracle of Generators - Bodil Stokke##

*This was a great talk!*

###Iterators###
- Getting an iterator from an array:
{% highlight js  %}
let arr = [1, 2, 3];
let i = arr.values();
i.next(); // returns 1
{% endhighlight %}

- Using an iterator in a `for` loop:
{% highlight js  %}
for (let i of arr) console.log(i);  // Displays "1\n2\n3\n"
{% endhighlight %}

- You can create your own iterators using [Symbol.iterator] as a function name in your object!:
{% highlight js  %}
{
  [Symbol.iterator]: () => {
    // some logic, then return an object with a next() method
    return {
      next: () => ...
    }
  }
}
{% endhighlight %}

- `Array.from(<any iterable object>)` returns an array
- `&iterableObj` is a shortcut which returns the first 10 items from an iterable (useful for demo purposes)
- Unlike arrays, iterable objects can return an *infinite set* of values


###Generators###

- Remove the boilerplate code from iterators
- In the following snippet, the value of `n` is returned when the `yield` statement is encountered. So the yielded values when 
calling `inifinity.next()` 3 times are: `0 1 2`:
{% highlight js  %}
infinity = function*() {
  let n = 0;
  while(true) {
    yield n++;
  }
}
{% endhighlight %}

- Iterators only return values. Generators allow you to *input* values as well.
  - You need to call `next()` the first time to prime the value into the generator
{% highlight js  %}
// Syntax: assign the result of "yield" to a variable, and then yield the variable in the next call.
x = yield x;
{% endhighlight %}

- You can use this behaviour with promises.
- Asynchronous code ends up looking like synchronous code
- Anything with a `then()` method in ES6 can be treated as a promise
- "Imagine a world without callbacks" -> Haskell -> Monads
- A Promise is an input-output (IO) Monad
- 3 laws of Monads \([for dummies like me](http://jabberwocky.eu/2012/11/02/monads-for-dummies/)\)
- [Slides - including live code editor!](http://bodil.lol/generators/)


##Deploying and Scaling Microservices - Sam Newman (ThoughtWorks)##
- Managing lots of little things can be complex

###Core Principles when designing CI/CD###
- Independent deploy-ability: being able to deploy a single service at a time.
  - If you get this wrong, you have failed!
  - If you need to deploy services in a certain order, you have FAILED!
  - Why? Because it shows you have coupled things together yet you are trying to treat them as separate things.
- Move one artifact through many stages
  - Don't keep rebuilding your artifact for each environment (if you do, how can you be sure it hasn't changed?)
- Use the same deployment process in each environment
- Ideal deployment command:
{% highlight console  %}
$ deploy <serviceName> <version> <environment>
{% endhighlight %}
  - where,
    - \<serviceName\> is the name of the service
    - \<version\> is a version number, or a shortcut like "latest" or "local"
    - \<environment\> refers to configuration for a topology

###Artifacts###
- We want an *ideal artifact* to be:
  - Easy to create
  - Easy to deploy
  - Abstracted from the tech stack
  - Good for developers and good for operations
- Options that aren;t the best: Tarball/ZIP, Nuget/Pip/Jar/Gems/Npm, OS-specific (MSI, apt-get)
- Best option: **Docker**! But managing Docker images is still a work-in-progress...

###Platforms - for managing Docker###
- We want:
  - Separate artifact from topology
  - Abstract the work for handling images
  - Support Docker images
- Desired state: *You tell the system what state you want the platform to be in, and it goes and configures itself into that state, and then maintains that state*.
  - Autonomic computing, self healing!
- Options: Docker Swarm (least best), Kubernetes (next best), Mesos (best at the moment, but can be complex)
  

## Mobile Performance @ Facebook - Mike Magruder##

- Facebook found: If part of an application becomes more performant, people use it more.
- Performance:
  - Treat it like any other feature
  - Needs deep organisational support (from devs AND upper management)
  - Build empathy. At Facebook, they run a "2G Tuesday" program whereby everyone's build is configured to run at 2G-network speeds for the day
  - Need to set real, measurable metrics
- Recommended website on methodical thinking [www.brendangregg.com](www.brendangregg.com)


##Autonomy and Asynchrony: the Key to Designing Reliable Systems - Indu Alagarsamy##

- Event-driven architecture is what this was about
- How can we write software which just does stuff, on it's own? E.g. Mars orbiter was out-of-contact with the Earth for 2 days, but it was able to make decisions to keep itself "alive".
- Messaging (publish-subscribe) inherently solves temporal coupling (e.g. module A is waiting for a response from B, so A blocks).
- Events should be specific, matching the business model.
- You can use parts of your application to publish events. The number and importance of these events grows over time, taking over from the monolithic code
- **Reliability = Make things small & autonomous PLUS Asynchronous (via messaging)**
- Recommended course by Udi Dahan: [Advanced Distributed Design](http://go.particular.net/YOW)



##Alternatives to MVC: React Native, ReactiveCocoa - two guys##

- Goal is to manage state *better*
- ReactiveCocoa is a Functional Reactive Programming (FRP) library for Swift (iOS)
- Talked a little about the **Elm** language, which has inspired many of the ideas in current FRP frameworks
  - Elm unifies FRP with declarative UIs
  - Designed to build web UIs
  - Action, Model and View are *all* signals. Action => Model => View, => Action ...
  

##Avoiding Rigor Mortis - Dave Thomas##

- Avoid saying, "I'm a <insert language> programmer", as it is like saying, "I'm a hammer user". You should be aiming to be a
programmer, able to program in any language you pickup. Not stuck in a rut.
- The future is functional and concurrent.
- The limits of my language are the limits of my world
- Spoke about **Elixir**, a new programming language that uses pattern matching (rules) to produce behaviour
{% highlight js  %}
{c, d} = {2, 3} // The equals sign means "match"
{% endhighlight %}
- Programs then start to reflect the specification (used Fibonacci specification as an example -> the Elixir program looked the same as the spec)
- Implementation reflects transformation
- Each *match* specifies a *state transformation*  (sounds like a pure function, Redux)
  

##The Mother of all Programming Language Demos - Sean McDirmid##

- Sean is from Microsoft Research in China
- Q. How do we make programming better? A. **Give better feedback loops!  (so true)**
- Sean then demo-ed a visual editor that had the code on one side, and the running code on the other side.
  - Changing the code, changed the live-view
  - Changing the live-view, changed the code
  - If you changed the live-view to a value that was "significant" (e.g. 90deg, aligned with another value), the code would "bind"
    to that value so that, for example, objects aligned nicely, or a right-angled triangle remained at 90 degrees even when other parameters changed.
- The idea that you could start with a concrete example and the system would create abstract code, which would then allow you to create other concrete examples.


##The Future of Software Engineering - Glenn Vandenburg##

- Talked a lot about the history of SE (1967 NATO conference)
- SE initially based on civil engineering - the engineering discipline that it is LEAST like!
- Engineering is about design, trial and error, applying process.
- Requirements are often *discovered* by engineers, not all known up-front.
- We need to be able to design structures that are highly changeable, *unlike most other engineering disciplines**
- The future: focus on teaching programmers how good programmers think.


##Wrangling the internet of things with Haskell - Reid Draper##

- I didn't get much out of this session. It was about some things and platforms and events...

