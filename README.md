# React Scroll Box

[![npm version](https://img.shields.io/npm/v/react-scroll-box.svg?style=flat)](https://www.npmjs.com/package/react-scroll-box)

Charged cross-browser and cross-platform scrollable container implementation with no external dependencies but React 0.13+.

Requires [`classList` polyfill](https://www.npmjs.com/package/classlist-polyfill) to work properly in IE9+.

Tested in FF, Chrome, Safari, iOS Safari, Opera and IE9+.

Any help with improvement of this component would be greatly appreciated.

[**API and Live Demo**](http://smikhalevski.github.io/react-scroll-box/)

## Motivation

- Use custom or native scroll bars.
- Highly customizable tracks and handles for both mobile and desktop.
- Inset and outset scroll bars with ease.
- Optional fallback to native inertial scrolling on mobile devices.
- Animated and smooth scrolling with customizable easing functions.
- Scrollbars detect mouse in close proximity and change their style accordingly for better UX.
- Scrollbars are automatically added, removed and resized when scroll box dimensions are changed.
- Scrolling speed is equalized among browsers.
- Customizable keyboard scrolling support.
- Scroll boxes can be nested.
- Custom viewports can be used. Have a look at [`react-text-input`](https://github.com/smikhalevski/react-text-input) for `textarea` with customizable scrollbars.
- Conditionally unwrap scroll box to scroll its content along with page. This can even be done using a media query.
- Scrollbar size represents ratio of content and viewport sizes and can be constrained from CSS.
- LESS styles with a mixin to simplify coloring.
- Lots of other properties to customize scrolling behavior.

## Basic Usage

```jsx
var ScrollBox = require('react-scroll-box').ScrollBox; // ES5

import {ScrollBox, GenericScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box'; // ES6

<ScrollBox axes={ScrollAxes.Y}>
  Your content goes here
</ScrollBox>
```

## Components

This module exports `GenericScrollBox` and `ScrollBox`. In most cases you should use `ScrollBox` to create a scrollable area, but in cause you need more control over viewport use `GenericScrollBox`.

### `GenericScrollBox`



Produced layout:
```jsx
<div class="
    scroll-box
    scroll-box--disabled
    scroll-box--native
    scroll-box--outset
    scroll-box--has-axis-x
    scroll-box--has-axis-y
    scroll-box--show-axis-x
    scroll-box--show-axis-y">
  <div class="
      scroll-box__track
      scroll-box__track--x
      scroll-box__track--hover
      scroll-box__track--dragged">
    <div class="
        scroll-box__handle
        scroll-box__handle--x">
    </div>
  </div>
  <div class="
      scroll-box__track
      scroll-box__track--y
      scroll-box__track--hover
      scroll-box__track--dragged">
    <div class="
        scroll-box__handle
        scroll-box__handle--y">
    </div>
  </div>
  <div class="scroll-box__viewport"></div>
</div>
```

## License

The code is available under [MIT licence](LICENSE.txt).
