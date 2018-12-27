---
description: "Getting started with a Osagai."
icon: "arrow-right-rod"
layout: "guide"
title: "Getting Started"
weight: 1
---

<article id="install">

## Install

### Using package managers
You can get it on npm.

```text/x-sh
npm install osagai
```

Or with yarn

```text/x-sh
yarn add osagai
```

### Import from a CDN

You can also import directly from [unpkg](https://unpkg.com/#/)


```javascript
import { define } from "https://unpkg.com/osagai/osagai.mjs";

```

### CDN links

Osagai are available over a CDN.

```xml
<script src="https://unpkg.com/osagai/osagai.umd.js"></script>
```

</article>

<article id="defineComponent">

## Define a Web component

Osagai comes with a function called `define` that defines a new custom element that you can use in your application.
`define` receives the name of the custom element (it must contain a hyphen) and the Osagai component.
The Osagai component is a function that returns a Template with a string representing the layout of the web component.

```javascript
import { define } from 'osagai'

function MyComponent() {
	return () => `<h1>Hi 👋!</h1>`
}

define('waving-hand', MyComponent)

```

Now, you just need to use your new custom element in your application.

```xml
<waving-hand></waving-hand>
```

</article>

<article id="modules">

## Modules

Osagai is separated by different modules, in a way that you can import only what you need for your custom element.

### osagai

This is the main module where you can find the function for defining your custom element.

```javascript
import { define } from 'osagai'
```

### dom

This is the module with useful methods like `update` for efficiently update the DOM tree of your custom element

```javascript
import { update } from 'osagai/dom'

```

### events

This is the module with useful methods like `on` for adding event listeners to components

```javascript
import { on } from 'osagai/events'
```

### lifecycles

This is the module for the custom elements lifecyles like `connectedCallback` and `disconnectedCallback`

```javascript
import { onConnected, onDisconnected } from 'osagai/lifecycles'
```

</article>
