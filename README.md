### Attributes


_`string`_
<a name="abstract-scroll-box-class-name"></a> <code>**className** = 'scroll-box--wrapped'</code>

Style class name of the root element of scroll box. Several class names are available out of the box:

- `.scroll-box--disabled` is added when scroll box is disabled with <code>[disabled](#abstract-scroll-box-disabled)={true}</code>. Hides scrollbars and prevents scrolling for both native and non-native scroll bars.

- `.scroll-box--wrapped` makes scroll box behave like an actual scroll box. If omitted, then scrollbox behaves like a plane `div` element and expands its height to a maximum possible value.

- `.scroll-box--native-scroll-bars` is a stylesheet analogue of <code>[nativeScrollBars](#abstract-scroll-box-native-scroll-bars)={true}</code> setting and causes scroll box to display native scroll bars. This class is very handy if you want to enable native scrollbars for specific media query.

- `.scroll-box--outset-x`, `.scroll-box--outset-y` show corresponding scroll bars ouside of a scrollable area without changing scroll box size.

- `.scroll-box__track` and `.scroll-box__handle` are class names placed on both scroll tracks and handles respectively. You can reffer to a particular track or handle with `.scroll-box__track--x` or `.scroll-box__handle--y`.

- `.scroll-box__track--hover` is added when track is being hovered or cursor is in close proximity. See [`trackHoverProximityX`](#abstract-scroll-box-track-hover-proximity-x) and [`trackHoverProximityY`](#abstract-scroll-box-track-hover-proximity-y) for more details.

- `.scroll-box__track--dragged` is added when handle of this track is being dragged by user.


_`object`_
<a name="abstract-scroll-box-style"></a> <code>**style** = null</code>

Style of the root element of the scroll box.


_`bool`_
<a name="abstract-scroll-box-native-scroll-bars"></a> <code>**nativeScrollBars** = false</code>

Use native client scroll bars instead of custom scroll bars. Handle- and track-related features do not have any effect when native scrollbars are enabled.


_`bool`_
<a name="abstract-scroll-box-disabled"></a> <code>**disabled** = false</code>

Disable scroll box entirely. When disabled any scrolling is prevented, including prorgammatic scroll with [`sctollTo`](#abstract-scroll-box-scroll-to). If you want to disable or hide scrollbars of particular axis reffer to [`disableScrollX`](#abstract-scroll-box-disable-scroll-x) [`disableScrollY`](#abstract-scroll-box-disable-scroll-y) and [`hideScrollBarX`](#abstract-scroll-box-hide-scroll-bar-x) [`hideScrollBarY`](#abstract-scroll-box-hide-scroll-bar-y) respectively.


_`func`_ 
<a name="abstract-scroll-box-scroll-start"></a>   <code>**onScrollStart**(scrollBox, causeX, causeY)</code>
<a name="abstract-scroll-box-scroll-start-x"></a> <code>**onScrollStartX**(scrollBox, causeX)</code>
<a name="abstract-scroll-box-scroll-start-y"></a> <code>**onScrollStartY**(scrollBox, causeY)</code>

Listeners that are invoked when scroll position change was requested, ex. [`scrollTo`](#abstract-scroll-box-scroll-to) was called or user pressed <kbd>Page Down</kbd>. You can check requested scroll position via inspecting [`targetX`](#abstract-scroll-box-target-x) and [`targetY`](#abstract-scroll-box-target-y) and interrupt scroll via calling [`scrollTo`](#abstract-scroll-box-scroll-to) or setting new values directly to [`targetX`](#abstract-scroll-box-target-x) or [`targetY`](#abstract-scroll-box-target-y).

`causeX` and `causeY` are [`ScrollCause`](#scroll-cause) values or `null` if scrolling on corresponding axis was not requested.


_`func`_
<a name="abstract-scroll-box-on-scroll"></a>   <code>**onScroll**(scrollBox, dx, dy, causeX, causeY)</code>
<a name="abstract-scroll-box-on-scroll-x"></a> <code>**onScrollX**(scrollBox, dx, causeX)</code>
<a name="abstract-scroll-box-on-scroll-y"></a> <code>**onScrollY**(scrollBox, dy, causeY)</code>

Listeners that are invoked on every change of [`scrollX`](#abstract-scroll-box-scroll-x) and [`scrollY`](#abstract-scroll-box-scroll-y).

`dx` and `dy` are scroll distance since last invocation.

`causeX` and `causeY` are [`ScrollCause`](#scroll-cause) values or `null` if scrolling on correspondin axis was did not occur.


_`func`_
<a name="abstract-scroll-box-scroll-end"></a>   <code>**onScrollEnd**(scrollBox, causeX, causeY)</code>
<a name="abstract-scroll-box-scroll-end-x"></a> <code>**onScrollEndX**(scrollBox, causeX)</code>
<a name="abstract-scroll-box-scroll-end-y"></a> <code>**onScrollEndY**(scrollBox, causeY)</code>

Listeners that are invoked when scroll completes, ex. user releases dragged handle, inertial scroll reached its finish position. Scroll is considered to end when cause has changed or new target scroll coordinates were set.


_`bool`_
<a name="abstract-scroll-box-disable-scroll-x"></a> <code>**disableScrollX** = false</code>
<a name="abstract-scroll-box-disable-scroll-y"></a> <code>**disableScrollY** = false</code>

Prevent scroll in corresponding axis. Prohibits scrolling on disabled axis event with [`scrollTo`](#abstract-scroll-box-scroll-to).


_`bool`_
<a name="abstract-scroll-box-hide-scroll-bar-x"></a> <code>**hideScrollBarX** = false</code>
<a name="abstract-scroll-box-hide-scroll-bar-y"></a> <code>**hideScrollBarY** = false</code>

Hides scrollbar but still allow to scroll programmatically.


_`bool`_ 
<a name="abstract-scroll-box-outset-scroll-bar-x"></a> <code>**outsetScrollBarX** = false</code>
<a name="abstract-scroll-box-outset-scroll-bar-y"></a> <code>**outsetScrollBarY** = false</code>

Display scrollbars outside of scrollable area. Outset scrllbars don't require additional space and don't affect surrounding layout. On mobile devices when native scrollbars are used this property has no effect because scrollbars have zero width and thus don't crop any space from viewport.


_`number`_
<a name="abstract-scroll-box-scroll-min-x"></a> <code>**scrollMinX** = 2</code>
<a name="abstract-scroll-box-scroll-min-y"></a> <code>**scrollMinY** = 2</code>

Minimum difference in pixels in content and viewport sizes to enable scrolling.


_`number`_
<a name="abstract-scroll-box-scroll-min-x"></a> <code>**trackHoverProximityX** = 50</code>
<a name="abstract-scroll-box-scroll-min-y"></a> <code>**trackHoverProximityY** = 50</code>

Maximum distance in pixels between cursor and scroll track edge when track is considered to be hovered. Useful when you want to have thin scrollbars and increase theit thickness when cursor aproaches them so user don't have to aim precisely. Set to 0 to disable hover proximity detection.


_`func`_
<a name="abstract-scroll-box-easing-x"></a> <code>**easingX** = ScrollEasing.easeQuadOut</code>
<a name="abstract-scroll-box-easing-y"></a> <code>**easingY** = ScrollEasing.easeQuadOut</code>

Default easing functions that are applied to scroll that has non-zero duration. This callbacks are compatible with jQuery easing functions and are invoked with following arguments:

- `percent` Scroll percentage in range [0, 1].
- `elapsed` Number of milliseconds passed since animation began.
- `min` Minimum output value.
- `max` Maximum output value.
- `duration` Animation duration in milliseconds.

Easing can also be specified as an argument of [`scrollTo`](#abstract-scroll-box-scroll-to).


_`bool`_
<a name="abstract-scroll-box-outset-capture-handle-drag-x"></a> <code>**captureHandleDragX** = true</code>
<a name="abstract-scroll-box-outset-capture-handle-drag-x"></a> <code>**captureHandleDragY** = true</code>

Allow user to drag scroll handles. If handle drag is disabled along with enabled fast track then clicking on a handle would cause fast tracking.


_`bool`_
<a name="abstract-scroll-box-interruptible-handle-drag"></a> <code>**interruptibleHandleDrag** = true</code>

Can handle drag be programmatically interrupted or not.


_`bool`_
<a name="abstract-scroll-box-capture-fast-track-x"></a> <code>**captureFastTrackX** = true</code>
<a name="abstract-scroll-box-capture-fast-track-y"></a> <code>**captureFastTrackY** = true</code>

Can use scroll via clicking on the track.


_`FastTrackMode`_
<a name="abstract-scroll-box-capture-fast-track-x"></a> <code>**fastTrackModeX** = FastTrackMode.GOTO</code>
<a name="abstract-scroll-box-capture-fast-track-y"></a> <code>**fastTrackModeY** = FastTrackMode.GOTO</code>

What should scrollbox do if user clicks on the track:

- `FastTrackMode.GOTO` scroll to poition where user clicked.
- `FastTrackMode.PAGING` scroll one page in direction of user click.


_`number`_
<a name="abstract-scroll-box-fast-track-scroll-duration-x"></a> <code>**fastTrackScrollDurationX** = 500</code>
<a name="abstract-scroll-box-fast-track-scroll-duration-Y"></a> <code>**fastTrackScrollDurationY** = 500</code>

Animation duration of fast track smooth scroll.


_`bool`_
<a name="abstract-scroll-box-capture-keyboard"></a> <code>**captureKeyboard** = true</code>

Use keyboard for scrolling when scroll box viewport or its nested content is focused. Keyboard is not captured for `<input type="text"/>` and `<textarea/>` elements placed inside scroll box. <kbd>Page Up</kbd> <kbd>Page Down</kbd> <kbd>Home</kbd> <kbd>End</kbd> and arrow keys are captured. You can page-scroll alternate axis with <kbd>Shift</kbd>&nbsp;+&nbsp;<kbd>Page Up</kbd> and <kbd>Shift</kbd>&nbsp;+&nbsp;<kbd>Page Down</kbd> shortcuts.


_`number`_
<a name="abstract-scroll-box-keyboard-step-x"></a> <code>**keyboardStepX** = 30</code>
<a name="abstract-scroll-box-keyboard-step-y"></a> <code>**keyboardStepY** = 30</code>

Distance in pixels to scroll by when arrow keys are pressed.


_`number`_
<a name="abstract-scroll-box-keyboard-scroll-duration-x"></a> <code>**keyboardScrollDurationX** = 200</code>
<a name="abstract-scroll-box-keyboard-scroll-duration-y"></a> <code>**keyboardScrollDurationY** = 200</code>

Keyboard smooth scrolling animation duration in milliseconds. Set to 0 to disable smooth keyboard scrolling.


_`bool`_
<a name="abstract-scroll-box-capture-wheel"></a> <code>**captureWheel** = true</code>

Use mouse wheel for scrolling. You can scroll alternate axis with <kbd>Shift</kbd> key is pressed.


_`number`_
<a name="abstract-scroll-box-wheel-line-height"></a> <code>**wheelLineHeight** = 24</code>

Height of line used if scroll by line was requested.


_`number`_
<a name="abstract-scroll-box-wheel-step-x"></a> <code>**wheelStepX** = 100</code>
<a name="abstract-scroll-box-wheel-step-y"></a> <code>**wheelStepY** = 100</code>

Wheel scrolling distance in pixels. Scroll box heavily relies on native wheel implementation, so this speed can vary a bit depending on browser, platform and scrolling device (trackpad or mouse wheel).


_`bool`_
<a name="abstract-scroll-box-propagate-wheel-scroll-x"></a> <code>**propagateWheelScrollX** = true</code>
<a name="abstract-scroll-box-propagate-wheel-scroll-Y"></a> <code>**propagateWheelScrollY** = true</code>

Propagate wheel scroll event to parent if scrolling reached maximum or minimum value.


_`bool`_
<a name="abstract-scroll-box-swap-wheel-axes"></a> <code>**swapWheelAxes** = false</code>

Swap wheel scrolling axes.


_`number`_
<a name="abstract-scroll-box-wheel-scroll-duration-x"></a> <code>**wheelScrollDurationX** = 100</code>
<a name="abstract-scroll-box-wheel-scroll-duration-y"></a> <code>**wheelScrollDurationY** = 100</code>

Wheel smooth scrolling animation duration. Set to 0 to disable smooth wheel scrolling.


_`bool`_
<a name="abstract-scroll-box-capture-touch"></a> <code>**captureTouch** = true</code>

Enable capture of touch events.


_`bool`_
<a name="abstract-scroll-box-propagate-touch-scroll-x"></a> <code>**propagateTouchScrollX** = true</code>
<a name="abstract-scroll-box-propagate-touch-scroll-y"></a> <code>**propagateTouchScrollY** = true</code>

Propagate touch scroll event to parent if scrolling reached maximum or minimum value.


_`bool`_
<a name="abstract-scroll-box-touch-single-axis"></a> <code>**touchSingleAxis** = true</code>

Prevent user from scrolling on two axis simultaneously.


_`number`_
<a name="abstract-scroll-box-touch-start-distance"></a> <code>**touchStartDistance** = 10</code>

Distance in pixels that finger should pass to detect actual scrolling axis.


_`bool`_
<a name="abstract-scroll-box-continuous-touch-scroll-x"></a> <code>**continuousTouchScrollX** = false</code>
<a name="abstract-scroll-box-continuous-touch-scroll-y"></a> <code>**continuousTouchScrollY** = false</code>

Should touch scroll be propagated to parent continiously or user would have to restart touch scroll.


_`func`_
<a name="abstract-scroll-box-inertia-easing-x"></a> <code>**inertiaEasingX** = ScrollEasing.easeQuadOut</code>
<a name="abstract-scroll-box-inertia-easing-y"></a> <code>**inertiaEasingY** = ScrollEasing.easeQuadOut</code>

Inertial easing functions.


_`func`_
<a name="abstract-scroll-box-inertia-distance-x"></a> <code>**inertiaDistanceX**(dx, dt)</code>
<a name="abstract-scroll-box-inertia-distance-Y"></a> <code>**inertiaDistanceY**(dx, dt)</code>

Returns distance in pixels that inertial scrolling should travel.


_`func`_
<a name="abstract-scroll-box-inertia-duration-x"></a> <code>**inertiaDurationX**(dx, dt)</code>
<a name="abstract-scroll-box-inertia-duration-y"></a> <code>**inertiaDurationY**(dx, dt)</code>

Returns duration of inertial scrolling.


_`node`_
<a name="abstract-scroll-box-track-children-x"></a> **`trackChildrenX`**
<a name="abstract-scroll-box-track-children-y"></a> **`trackChildrenY`**

Children appended to track elements.

_`node`_
<a name="abstract-scroll-box-handle-children-x"></a> **`handleChildrenX`**
<a name="abstract-scroll-box-handle-children-y"></a> **`handleChildrenY`**

Children appended to handle elements.








---


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




### asdasd



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
