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

## Components

### `ScrollBox`

In most cases you should use `ScrollBox` to create a scrollable area, but in cause you need more control over viewport use `GenericScrollBox`.

By default, `ScrollBox` has no decoration and behaves as a regular `div` container. Specify height for scroll box in your styles, otherwise container would contract to zero height.

```jsx
var ScrollBox = require('react-scroll-box').ScrollBox; // ES5

import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box'; // ES6

<ScrollBox style={{height: '200px'}} axes={ScrollAxes.Y} fastTrack={FastTrack.PAGING}>
  Place any content here.
</ScrollBox>
```

Property | Type | Default | Description
--- | --- | --- | --- 
`nativeScroll` | boolean | | Use native scrollbars. By default, this flag is set to `true` on mobile platforms and `false` on desktops. Paltforms are distinguished by presence of `window.orientation`. If you are developing isomorphic application and want to render scroll box on server side then you shoud explicitly specify this property.
`axes` | [`ScrollAxes`](#scroll-axes) | [`ScrollAxes.XY`](#scroll-axes-xy) | Scroll axes which are managed by the scroll box. If scroll axis is not listed then corresponding scroll offset would be constantly equal to 0 and any scrolling requests via API or from UI for that axes would be ignored.
`hoverProximity` | integer | 50 | Maximum distance in pixels between cursor and scroll track edge when track is considered to be hovered. Useful when you want to have thin scrollbars and increase theit thickness when cursor aproaches them so user don't have to aim precisely. Set to 0 to disable hover proximity detection.
`disabled` | boolean | `false` | Disable scroll box.
`outset` | boolean | `false` | Display scrollbars outside of scrollable area. Outset scrllbars don't require additional space and don't affect surrounding layout. On mobile devices when native scrollbars are used this property has no effect because scrollbars have zero width and thus don't crop any space from viewport.
`scrollMinX`<br/>`scrollMinY` | integer | 2 | Minimum difference in pixels in content and viewport sizes to enable scrolling.
`captureKeyboard` | boolean | `true` | Use keyboard for scrolling when scroll box viewport or its nested content is focused. Keyboard is not captured for `<input type="text"/>` and `<textarea/>` elements placed inside scroll box. <kbd>PgUp</kbd> <kbd>PgDown</kbd> <kbd>Home</kbd> <kbd>End</kbd> and arrow keys are captured. You can page-scroll alternate axis with <kbd>Shift</kbd>&nbsp;+&nbsp;<kbd>PgUp</kbd> and <kbd>Shift</kbd>&nbsp;+&nbsp;<kbd>PgDown</kbd> shortcuts.
`keyboardStepX`<br/>`keyboardStepY` | integer | 30 | Distance in pixels to scroll by when arrow keys are pressed.
`keyboardScrollDuration` | integer | 200 | Keyboard smooth scrolling animation duration in milliseconds. Set to 0 to disable smooth keyboard scrolling.
`fastTrack` | [`FastTrack`](#fast-track) | [`FastTrack.GOTO`](#fast-track-goto) | Defines expected behavior when user clicks on scroll track. 
`fastTrackDuration` | integer | 500 | Animation duration of fast track smooth scroll.
`captureHandleDrag` | boolean | `true` | Allow user to drag scroll handles. If handle drag is disabled along with enabled fast track then clicking on a handle would cause fast tracking.
`captureWheel` | boolean | `true` | Use mouse wheel for scrolling. You can scroll alternate axis with Shift key is pressed.
`wheelStepX`<br/>`wheelStepY` | integer | 30 | Wheel scrolling distance in pixels. Scroll box heavily relies on native wheel implementation, so this speed can vary a bit depending on browser, platform and scrolling device (trackpad or mouse wheel).
`propagateWheelScroll` | boolean | `false` | Propagate wheel scroll event to parent if scrolling reached maximum or minimum value.
`swapWheelAxes` | boolean | `false` | Swap wheel scrolling axes.
`wheelScrollDuration` | integer | 100 | Wheel smooth scrolling animation duration. Set to 0 to disable smooth whee scrolling.
`className` | string | | Style class name to use.
`style` | object | | Style to apply to root element of scroll box.
`defaultEasing` | function | | Easing to use when none is provided.
`onViewportScroll` | function | | Scroll event callback.

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
