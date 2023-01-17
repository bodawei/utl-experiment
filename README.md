# utl

## Introduction

- [Enzyme is dead. Now what?](https://dev.to/wojtekmaj/enzyme-is-dead-now-what-ekl)
  - [Reddit thread on the above](https://www.reddit.com/r/reactjs/comments/rkks6o/enzyme_is_dead_now_what/)

[Enzyme](https://github.com/enzymejs/enzyme) is a testing utility that has been being used by the React community for quite some time. As the articles above suggest, it has drifted into the realm of "neglect-ware". While some responsibility seems to be on the shoulders of ljharb who seems to be the "maintainer", the reality is that the React community as a whole has not really stepped forward to deal with this.

I had premonitions of the death of Enzyme a couple years before this blog entry was posted. A coworker was advocating abandoning Enzyme in favor of Testing Library. Many people on the Reddit thread say the same thing. "Use Testing Library!" Or even "Use Cypress!".

I have, for at least as long, felt that it is a serious bad reflection on those building web apps that so few voices are arguing that Testing Library (and Cypress) are not great replacements for all of Enzyme.

Of course, part of the problem may be that Enzyme offers a range of testing tools, and different people may have different ideas of what "using Enzyme" means. For the moment, let's consider it to have two modes: A shallow renderer system (good for pure unit tests) and a mounting renderer (good for integration tests or sociable unit tests, depending on which set of terms you like better). To my mind, Testing Library is pretty good for "integration" tests. But it is not a very good unit testing system.

### The testing pyramid

In the ideal world, we would write all of our automated tests with Cypress or Playwright or some similar tool where we run our tests against the browser. After all that is the truest representation of the application that our users will use.

I think for small apps, this (in fact) makes perfect sense.

However, with each new page or feature one adds to one's app, and with each new developer added to the team, this gets less and less bearable. Tests in Cypress run slowly (one must start up a whole browser, and then run through the test sequence one click or type at a time), and become painful to maintain (whoops, feature X just moved from page A to page B. Now you must redo a lot of big, tedious tests), and finally they are fragile (an unacceptably slow latency that might happen one out of one thousand times will happen pretty frequently over the course of repeated test runs).

This is a classic problem in software application development, as old as automated testing itself. How do you test your app when your automated test runs start exceeding (say) 24 hours? How do you avoid the fear of adding a new feature, knowing that doing so is going to take you an hour to write the code and six hours to update a bunch of tests?

These concerns birthed the notion of the "[test pyramid](https://martinfowler.com/bliki/TestPyramid.html)".

The core observation here is that you create different kinds of tests to capture different aspects of your application behavior. You create "unit tests" to exercise the core logic in each function in your app. You create an intermediate layer of tests which exercise chunks of your application in isolation, and then create a higher layer of tests to exercise your application as a whole.

Tools like Cypress, Playwright, Puppeteer are great for running that highest layer of tests. They may run slowly, be tedious to write and maintain and may even be the most fragile. But you usually have only a small number of them that you use to prove that core functional flows work, and that your interactions with other services are correct.

Tools like Testing Library or Enzyme's `mount()` are great for that intermediate layer. They let you test a particular user flow in detail in a way that doesn't involve starting a whole browser (so they run faster and are more stable). Testing Library has an added benefit that its design forces the test to work at a higher level of the application structure (more or less the way the user sees the application) which suits this kind of test even better.

When it comes to unit tests, however, there currently are not very good tools for this in the React world. You may be able to use Testing Library, or Cypress or the like. But, comparatively, they execute slowly, and tedious to maintain. And one of the real values of unit tests, namely directly interacting with the inputs and outputs of each function, is not directly accessible.

Surprisingly, React has a [Test Renderer](https://reactjs.org/docs/test-renderer.html). This is maintained by the React team. So, unlike Enzyme, it is kept up to date with React (so it works with hooks and other of the latest React features). I say "Surprisingly", because I've almost never heard it mentioned in this context. To be sure, Test Renderer is probably slightly too "low level", but at a glance from 10,000 feet, it serves the same purpose as Enzyme's `shallow()` call.

## What is UTL?

This is an exploration of what it would take to build a thin wrapper around React's Test Renderer. The rest of this readme will be summarizing how this works with different React features, and doing some comparisons with some of the other tools.

If this goes well, I'd like to aim for 1.0 being an actual usable unit test library for React. Beyond that, I envision some way to make migration off of Enzyme to this easier, and other tools to make writing tests easier.

## Simple component test

## Refs and other features
