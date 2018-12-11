# Osagai 🀄️ [![Build Status](https://travis-ci.com/HenriqueLimas/osagai.svg?branch=master)](https://travis-ci.com/HenriqueLimas/osagai)

A tiny library in a functional and browser way.

## Why?

Creating WebComponent shouldn't be limited to extending `class`es. It should be easy to create and in a functional way.
It should be able to be framework-agnostic and be reused in different libraries. Updating components should be fast and it should
use native solutions without VirtualDOM and data binding magics. It should not need build processes for compiling non
native solution (JSX) and take advantage in what the language has. ([Template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals))

## Install

You can get it on npm.

```
npm install osagai --save
```

Or import from unpkg

```js
import { define } from "https://unpkg.com/osagai/osagai.mjs";
import { on } from "https://unpkg.com/osagai/events.mjs";
```

## Example

```html
<!DOCTYPE html>
<html lang="en">
  <title>Osagai demo</title>

  <x-items></x-items>

  <script type="module">
    import { define } from "https://unpkg.com/osagai/osagai.mjs";
    import { on } from "https://unpkg.com/osagai/events.mjs";

    function Items({ update, query }) {
      const initialState = {
        items: []
      };

      on("click", query(".btn"), () => {
        update(({ items } = initialState) => {
          items.push({
            name: `Item nr ${items.length + 1}`
          });

          return {
            items
          };
        });
      });

      return ({ items } = initialState) =>
        `<div>
              <button class="btn">Add item</button>
              ${`
          <ul class="list">
            ${items.map(item => `<li>${item.name}</li>`).join("")}
          </ul>`}
            </div>`;
    }

    define("x-items", Items);
  </script>
</html>
```

- Hacker News PWA example: https://github.com/HenriqueLimas/osagai-hn

## Project status

Osagai is still under development and it needs some feedback from the community. If you want to collaborate, please
add an [issue](https://github.com/HenriqueLimas/osagai/issues) or [PR](https://github.com/HenriqueLimas/osagai/pulls) with
your suggestions or concerns.
