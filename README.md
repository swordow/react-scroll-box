# React Scroll Box

[![npm version](https://badge.fury.io/js/react-scroll-box.svg)](https://www.npmjs.com/package/react-scroll-box)

Charged cross-browser and cross-platform scrollable container implementation with no external dependencies but React 0.13+.

Requires [`classList` polyfill](https://www.npmjs.com/package/classlist-polyfill) to work properly in IE9+.

Tested in FF, Chrome, Safari, iOS Safari, Opera and IE9+.

[**API and Live Demo**](http://smikhalevski.github.io/react-scroll-box/)

## Motivation

- Use custom or native scroll bars.
- Highly customizable tracks and handles for both mobile and desktop.
- Inset and outset scroll bars with ease.
- Seamless native inertial scrolling on mobile devices.
- Smooth scrolling support.
- Animated scrolling to particular position.
- Scrollbars detect mouse in close proximity and change their style accordingly for better UX.
- Scrollbars are automatically added, removed and resized when scroll box dimensions are changed.
- Scrolling speed is equalized among browsers.
- Customizable keyboard scrolling support.
- Scroll boxes can be nested.
- Custom viewports can be used (ex. `textarea`).
- Conditionally unwrap scroll box to scroll its content along with page. This can even be done using a media query!
- LESS styles with a mixin to simplify coloring.
- Lots of other properties to customize scrolling behavior.
- Scrollbar size represents ratio of content and viewport sizes.
- Custom easing function can be specified for every `scrollTo` and `scrollBy` invocation.

## Usage

```jsx
var ScrollBox = require('react-scroll-box').ScrollBox; // ES5

import {ScrollBox, GenericScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box'; // ES6

<ScrollBox axes={ScrollAxes.Y}>
  Your content goes here
</ScrollBox>
```

## License

The code is available under [MIT licence](LICENSE.txt).
