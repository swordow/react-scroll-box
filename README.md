# React `ScrollBox` Component v0.2.0

Charged cross-browser and cross-platform scrollable container implementation with no external dependencies but React 0.13+.

Tested in FF, Chrome, Safari, iOS Safari, Opera and IE9+.

[API and Live Demo](http://smikhalevski.github.io/react-scroll-box/)

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

## How to import

ES6
```javascript
import {ScrollBox, GenericScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';
```

ES5
```javascript
var ScrollBox = require('react-scroll-box').ScrollBox;
```

## License

The code is available under [MIT licence](LICENSE.txt).
