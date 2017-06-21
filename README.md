# React Scroll Box

[![npm version](https://badge.fury.io/js/react-scroll-box.svg)](https://www.npmjs.com/package/react-scroll-box)

Charged cross-browser and cross-platform scrollable container implementation with no external dependencies but React 0.15+.

Requires [`classList` polyfill](https://www.npmjs.com/package/classlist-polyfill) to work properly in IE10+.

Tested in FF, Chrome, Safari, iOS Safari, Opera and IE10+.

Any help with improvement of this component would be greatly appreciated.

[**API Playground and Live Demo**](http://smikhalevski.github.io/react-scroll-box/) **Outdated v0.2.6**

## Contents

1. [Motivation](#motivation)
2. [`ScrollBox`](#scrollbox)
  1. [Attributes](#attributes)
3. [`AbstractScrollBox`](#abstract-scroll-box)
  1. [Layout](#layout)
  2. [Properties](#properties)
  3. [Methods](#methods)
4. [License](#license)

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

## `ScrollBox`

In most cases you should use `ScrollBox` to create a scrollable area, but in case you need more control over viewport use [`AbstractScrollBox`](#abstract-scroll-box).

By default, `ScrollBox` has no decoration and behaves as a regular `div` container. Specify height for scroll box in your styles, otherwise container would contract to zero height.

```jsx
var ScrollBox = require('react-scroll-box').ScrollBox; // ES5

import {ScrollBox} from 'react-scroll-box'; // ES6

<ScrollBox style={{height: '200px'}}>
  Place any content here.
</ScrollBox>
```

### Attributes

_`bool`_ **`nativeScrollBars`** `false`

Should component use native scrollbars or not.
<br><br>


_`string`_ **`className`** `'scroll-box--wrapped'`

Style class name of the root element of scroll box.
<br><br>


_`object`_ **`style`** `null`

Style of the root element of scroll box.
<br><br>


**`disabled`** _`bool`_ `false`

Disable scroll box.
<br><br>


_`func`_ <code>**onScrollStart**(scrollBox, causeX, causeY) {}</code>

_`func`_  <code>**onScrollStartX**(scrollBox, causeX) {}</code>

_`func`_  <code>**onScrollStartY**(scrollBox, causeY) {}</code>

Listeners that are invoked when scroll position change was requested, ex. [`scrollTo`](#abstract-scroll-scroll-to) was called. You can check requested scroll position via inspecting [`targetX`](#abstract-scroll-box-target-x) and [`targetY`](#abstract-scroll-box-target-y) and interrupt scroll via calling [`scrollTo`](#abstract-scroll-box-scroll-to) or setting new values directly to [`targetX`](#abstract-scroll-box-target-x) or [`targetY`](#abstract-scroll-box-target-y).

`caseX` and `causeY` are [`ScrollCause`](#scroll-cause) values or `null` if scrolling on correspondin axis was not requested.
<br><br>


_`func`_ <code>**onScroll**(scrollBox, dx, dy, causeX, causeY)</code>  

_`func`_ <code>**onScrollX**(scrollBox, dx, causeX) {}</code>

_`func`_ <code>**onScrollY**(scrollBox, dy, causeY) {}</code>

Listeners that are invoked on every change of [`scrollX`](#abstract-scroll-box-scroll-x) and [`scrollY`](#abstract-scroll-box-scroll-y).

`dx` and `dy` and scroll distance since last invocation.

`caseX` and `causeY` are [`ScrollCause`](#scroll-cause) values or `null` if scrolling on correspondin axis was did not occur.
<br><br>


_`func`_  <code>**onScrollEnd**(scrollBox, causeX, causeY) {}</code>

_`func`_  <code>**onScrollEndX**(scrollBox, causeX) {}</code>

_`func`_  <code>**onScrollEndY**(scrollBox, causeY) {}</code>

Listeners that are invoked when scroll completes, ex. user releases dragged handle, inertial scroll reached its finish position.
<br><br>


_`bool`_ **`disableScrollX`** `false`

_`bool`_ **`disableScrollY`** `false`

Prevent scroll in corresponding axis. Prohibits scrolling on disabled axis event with [`scrollTo`](#abstract-scroll-box-scroll-to).
<br><br>


_`bool`_ **`hideScrollBarX`** `false`

_`bool`_ **`hideScrollBarY`** `false`

Hides scrollbar but still allow to scroll programmatically.
<br><br>


_`bool`_ **`outsetScrollBarX`** `false`

_`bool`_ **`outsetScrollBarY`** `false`

Display scrollbars outside of scrollable area. Outset scrllbars don't require additional space and don't affect surrounding layout. On mobile devices when native scrollbars are used this property has no effect because scrollbars have zero width and thus don't crop any space from viewport.
<br><br>


_`number`_ **`scrollMinX`** `2`

_`number`_ **`scrollMinY`** `2`

Minimum difference in pixels in content and viewport sizes to enable scrolling.
<br><br>


_`number`_ **`trackHoverProximityX`** `50`

_`number`_ **`trackHoverProximityY`** `50`

Maximum distance in pixels between cursor and scroll track edge when track is considered to be hovered. Useful when you want to have thin scrollbars and increase theit thickness when cursor aproaches them so user don't have to aim precisely. Set to 0 to disable hover proximity detection.
<br><br>


_`func`_ **`easingX`** `ScrollEasing.easeQuadOut`

_`func`_ **`easingY`** `ScrollEasing.easeQuadOut`

Default easing functions for scroll that has non-zero duration.

This callbacks are compatible with jQuery easing functions and are invoked with following arguments:

- _`float`_ `percent` Scroll percentage in range [0, 1].
- _`integer`_ `elapsed` Number of milliseconds passed since animation began.
- _`integer`_ `min` `max` Output value range.
- _`integer`_ `duration` Animation duration in milliseconds.

Easing can also be specified as an argument of [`scrollTo`](#abstract-scroll-box-scroll-to).
<br><br>


_`bool`_ **`captureHandleDragX`** `true`

_`bool`_ **`captureHandleDragY`** `true`

Allow user to drag scroll handles. If handle drag is disabled along with enabled fast track then clicking on a handle would cause fast tracking.
<br><br>


_`bool`_ **`interruptibleHandleDrag`** `true`

Can handle drag be programmatically interrupted or not.
<br><br>


_`bool`_ **`captureFastTrackX`** `true`

_`bool`_ **`captureFastTrackY`** `true`

Can use scroll via clicking on the track.
<br><br>


_`FastTrackMode`_ **`fastTrackModeX`** `FastTrackMode.GOTO`

_`FastTrackMode`_ **`fastTrackModeY`** `FastTrackMode.GOTO`

What should scrollbox do if user click on track:

- `FastTrackMode.GOTO` scroll to poition where user clicked.
- `FastTrackMode.PAGING` scroll one page in direction of user click.
<br><br>


_`number`_ **`fastTrackScrollDurationX`** `500`

_`number`_ **`fastTrackScrollDurationY`** `500`

Animation duration of fast track smooth scroll.
<br><br>


_`bool`_ **`captureKeyboard`** `true`

Use keyboard for scrolling when scroll box viewport or its nested content is focused. Keyboard is not captured for `<input type="text"/>` and `<textarea/>` elements placed inside scroll box. <kbd>PgUp</kbd> <kbd>PgDown</kbd> <kbd>Home</kbd> <kbd>End</kbd> and arrow keys are captured. You can page-scroll alternate axis with <kbd>Shift</kbd>&nbsp;+&nbsp;<kbd>PgUp</kbd> and <kbd>Shift</kbd>&nbsp;+&nbsp;<kbd>PgDown</kbd> shortcuts.
<br><br>


_`number`_ **`keyboardStepX`** `30`

_`number`_ **`keyboardStepY`** `30`

Distance in pixels to scroll by when arrow keys are pressed.
<br><br>


_`number`_ **`keyboardScrollDurationX`** `200`

_`number`_ **`keyboardScrollDurationY`** `200`

Keyboard smooth scrolling animation duration in milliseconds. Set to 0 to disable smooth keyboard scrolling.
<br><br>


_`bool`_ **`captureWheel`** `true`

Use mouse wheel for scrolling. You can scroll alternate axis with <kbd>Shift</kbd> key is pressed.
<br><br>


_`number`_ **`wheelLineHeight`** `24`

Height of line used if scroll by line was requested.
<br><br>


_`number`_ **`wheelStepX`** `100`

_`number`_ **`wheelStepY`** `100`

Wheel scrolling distance in pixels. Scroll box heavily relies on native wheel implementation, so this speed can vary a bit depending on browser, platform and scrolling device (trackpad or mouse wheel).
<br><br>


_`bool`_ **`propagateWheelScrollX`** `false`

_`bool`_ **`propagateWheelScrollY`** `true`

Propagate wheel scroll event to parent if scrolling reached maximum or minimum value.
<br><br>


_`bool`_ **`swapWheelAxes`** `false`

Swap wheel scrolling axes.
<br><br>


_`number`_ **`wheelScrollDurationX`** `100`

_`number`_ **`wheelScrollDurationY`** `100`

Wheel smooth scrolling animation duration. Set to 0 to disable smooth wheel scrolling.
<br><br>


_`bool`_  **`captureTouch`** `true`

Capture touch events.
<br><br>


_`bool`_  **`propagateTouchScrollX`** `true`

_`bool`_  **`propagateTouchScrollY`** `true`

Propagate touch scroll event to parent if scrolling reached maximum or minimum value.
<br><br>


_`bool`_  **`touchSingleAxis`** `true`

Prevent user from scrolling on two axis simultaneously.
<br><br>


_`number`_  **`touchStartDistance`** `10`

Distance in pixels that finger should pass to detect actual scrolling axis.
<br><br>


_`bool`_  **`continuousTouchScrollX`** `false`

_`bool`_  **`continuousTouchScrollY`** `false`

Should touch scroll be propagated to parent continiously or user would have to restart touch scroll.
<br><br>


_`func`_  **`inertiaEasingX`** `ScrollEasing.easeQuadOut`

_`func`_  **`inertiaEasingY`** `ScrollEasing.easeQuadOut`

Inertial easing functions.
<br><br>


_`func`_  **`inertiaDistanceX`** `(dx, dt) => dx / dt * 100`

_`func`_  **`inertiaDistanceY`** `(dy, dt) => dy / dt * 100`

Returns distance in pixels that inertial scrolling shold travel.
<br><br>


_`func`_  **`inertiaDurationX`** `(dx, dt) => dx / dt * 100`

_`func`_  **`inertiaDurationY`** `(dy, dt) => dy / dt * 100`

Returns duration of inertial scrolling.
<br><br>


_`node | arrayOf(node)`_  **`trackChildrenX`** `null`

_`node | arrayOf(node)`_  **`trackChildrenY`** `null`

Children appended to track elements.
<br><br>


_`node`_  **`handleChildrenX`** `null`

_`node`_  **`handleChildrenY`** `null`

Children appended to handle elements.


## `AbstractScrollBox`

Expects viewport element at its only child. Has all the same attributes as `ScrollBox`.

```jsx
var AbstractScrollBox = require('react-scroll-box').AbstractScrollBox; // ES5

import {AbstractScrollBox} from 'react-scroll-box'; // ES6

<AbstractScrollBox style={{height: '200px'}}>
  <div className="scroll-box__viewport">
    Place any content here.
  </div>
</AbstractScrollBox>
```

### Layout

```jsx
<div class="scroll-box scroll-box--wrapped">
  <div class="scroll-box__track scroll-box__track--x">
    <div class="scroll-box__handle scroll-box__handle--x"></div>
  </div>
  <div class="scroll-box__track scroll-box__track--y">
    <div class="scroll-box__handle scroll-box__handle--y"></div>
  </div>
  <div class="scroll-box__viewport">
    Place any content here.
  </div>
</div>
```

Class Name | Description
--- | ---
`scroll-box--wrapped` | Causes scroll box to look like an actual scroll box. If omitted, then scrollbox behaves like a simple `div` element.
`scroll-box--disabled` | Scroll box is disabled. By default, hides scrollbars and prevents scrolling.
`scroll-box--native` | Display native scroll bars.
`scroll-box--outset` | Show scroll bars ouside of scrollable area.
`scroll-box--has-axis-x` | Scroll box can be scrolled horizintally if content is wider than viewport.
`scroll-box--has-axis-y` | Scroll box can be scrolled vertically if content is taller than viewport.
`scroll-box--show-axis-x` | Content is wider than viewport.
`scroll-box--show-axis-y` | Content is taller than viewport.
`scroll-box__track--hover` | Tack is hovered.
<code>scroll&#8209;box__track&#8209;&#8209;dragged</code> | Track handle is dragged.

Modifier `.scroll-box--wrapped-on-large-screens` would conditionally wrap scroll box on screens larger than 360 px. Content would be scrolled along with page itself on smaller screens.

```less
@media (min-width: 360px) {
  .scroll-box--wrapped-on-large-screens {
    .scroll-box-wrap();
  }
}
```

### Properties

<code>**scrollTo**(options = {})</code>

<code>**scrollToX**(x, options = {})</code>

<code>**scrollToY**(y, options = {})</code>

Scroll to particular position. Following options are available:

- `x` and `y`  
Coordinates to scroll to.

- `easing`  
`easingX = easing || this.props.easingX`  
`easingY = easing || this.props.easingY`  
Easing to use for this scroll request.

- `duration = 0`  
`durationX = duration`  
`durationY = duration`  
Scroll duration.

- `dispatchPrevented = false`  
Do not trigger any listeners during processing of this request.
<br><br>


<code>**scrollBy**({dx, dy, ...options} = {})</code>

<code>**scrollByX**(dx, options = {})</code>

<code>**scrollByY**(dy, options = {})</code>

Scroll by number of pixels.
<br><br>


<code>**scrollToPage**({x, y, ...options} = {})</code>

<code>**scrollToPageX**(x, options = {})</code>

<code>**scrollToPageY**(y, options = {})</code>

Scroll to particular page.
<br><br>


<code>**scrollByPage**({dx, dy, ...options} = {})</code>

<code>**scrollByPageX**(dx, options = {})</code>

<code>**scrollByPageY**(dy, options = {})</code>

Scroll by number of pages.
<br><br>


<code>**getPageWidth**()</code>

<code>**getPageHeight**()</code>

Size of viewport in pixels.
<br><br>


_`number`_ **`targetX`**

_`number`_ **`targetY`**

Scroll position in pixels that was last requested.
<br><br>


_`number`_ **`scrollX`**

_`number`_ **`scrollY`**

Actual scroll position that user observes. This changes repeatedly during scroll animation, when no animation is in proggress equals to `targetX` and `targetY` respectively.
<br><br>


_`readonly number`_ **`scrollMaxX`**

_`readonly number`_ **`scrollMaxY`**

Maximum values for horizontal and vertical content scroll positions. See [MDN `window.scrollMaxX`](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollMaxX) for more info.


## License

The code is available under [MIT licence](LICENSE.txt).
