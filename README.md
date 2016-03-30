# React `ScrollBox` Component v0.1.1

Cross-browser and cross-platform scrollable container implementation with no external dependencies but React 0.13+.

Tested in FF, Chrome, Safari, iOS Safari, Opera and IE9+.

[Live Demo](http://smikhalevski.github.io/react-scroll-box/) ([Source Code](https://github.com/smikhalevski/react-scroll-box/blob/master/src/demo/index.js))

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


## Contents

1. [How to import](#how-to-import)
2. [`ScrollBox`](#scroll-box)
3. [`GenericScrollBox`](#generic-scroll-box)
  1. [Parameters](#parameters)
  2. [Instance Members](#instance-members)
4. [Styling](#styling)
5. [`ScrollAxes`](#scroll-axes)
6. [`FastTrack`](#fast-track)


## How to import

ES6
```javascript
import {ScrollBox, GenericScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';
```

ES5
```javascript
var ScrollBox = require('react-scroll-box').ScrollBox;
```


## <a name="scroll-box"></a>`ScrollBox`

Pure component that renders its children inside scrollable `div`.

By default, scroll container has no height specified, so it would collapse and become invisible.

Delegates properties to [`GenericScrollBox`](#generic-scroll-box). Accepts arbitrary number of children and renders them inside default viewport.

```jsx
<ScrollBox style={{height: '100px'}}>
  Scrollable content goes here.
</ScrollBox>
```


## <a name="generic-scroll-box"></a>`GenericScrollBox`

Generic scrollable area that uses provided child element as a viewport, changing its `scrollTop` and `scrollLeft` DOM attributes. By default, scrollable area does not have any height specified, you need to define it manually in your component styles.

You can prevent scrolling via calling `event.preventDefault()` for keboard or mousewheel events.

```jsx
<GenericScrollBox style={{height: '100px'}}>
  <textarea className="scroll-box__viewport">
    I can even scroll a textarea element!
  </textarea>
</GenericScrollBox>
```

### Parameters

#### {<a href="#scroll-axes">ScrollAxes</a>} [axes = <a href="#scroll-axes-xy">ScrollAxes.XY</a>]</code>

Scroll axes that are allowed to be affected. If scroll axis is not allowed to be changed, corresponding scroll offset would be constantly equal to 0.

#### <code>{<a href="#fast-track">FastTrack</a>} [fastTrack = <a href="#fast-track-goto">FastTrack.GOTO</a>]</code>

Expected behavior when user clicks on scroll track.

#### `{Number} [fastTrackDuration = 500]`

Fast track animation duration in milliseconds.

#### `{Number} [scrollDuration = 100]`

Smooth scrolling duration in milliseconds.

#### `{Number} [hoverProximity = 50]`

Maximum distance between cursor and scroll track border when track is considered to be hovered. Useful when you want to hav thin scrollbars but don't want make user aim precisely with cursor to grab them.

#### `{Boolean} [disabled = false]`

Disable scroll box control.

#### `{Boolean} [captureKeyboard = true]`

Use keyboard for scrolling when scroll box viewport or its nested content is focused. Keyboard is never captured for text input elements placed in scroll box.

#### <code>{Array.&lt;<a href="#scroll-key">ScrollKey</a>>} [scrollKeys = <a href="#scroll-key-values">ScrollKey.values</a>]</code>

Array of keys that can be used for scrolling. Arrow keys, `Home`, `End`, `Page Up`, `Page Down` are captured. You can also use `Shift` key along with `Page Up`, `Page Down` to scroll in horizontal axis.

#### `{Boolean} [outset = false]`

Display scrollbars outside of scrollable area. On mobile devices when native scrollbar is used `outset` property has no effect because scrollbars do not crop any space from viewport.

#### `{Boolean} [native]`

Use native scroll bars. By default, this flag is set to `true` on mobile platforms and `false` on desktops but you can change it manually.

#### `{Number} [keyboardStepX = 30]`, `[keyboardStepY]`

Horizontal and vertical scroll step for keyboard scrolling in pixels.

#### `{Number} [wheelStepX = 30]`, `[wheelStepY = 30]`

Horizontal and vertical scroll step for mouse wheel scrolling in pixels.

#### `{Boolean} [propagateScroll = true]`

Propagate mouse wheel scroll to parent element of scroll box if content reached its minimum or maximum scroll position. 

#### `{Function} [easing (percentage, elapsedTime, min, max, duration)]`

Easing function to animate scrolling.

#### `{Object} [style]`

Style to apply to `.scroll-box` element.

#### `{String} [className = "scroll-box_wrapped"]`

Space-separated style class names.

#### `{Function} [onViewportScroll ({GenericScrollBox} target)]`

Callback that is invoked when any scrolling occurs. Repetedly called during animation, handle dragging and fast tracking.

#### `{*} [trackXChildren]`, `[trackYChildren]`

Content appended to corresponding track elements for additional customization.

#### `{*} [handleXChildren]`, `[handleYChildren]`

Content appended to corresponding handle elements for additional customization.


### Instance Members

#### `{Number} targetX`, `targetY`

Scroll position in pixels that was last requested.

#### `{Number} previousX`, `previousY`

Previously requested scroll position.

#### `{Number} scrollX`, `scrollY`

Actual scroll position that user observes. This changes repeatedly during animation, while is static these values are equal to `x` and `y`.

#### `{Number} scrollMaxX`, `scrollMaxY`

Maximum values for horizontal and vertical scroll positions.

#### `{Number} trackMaxX`, `trackMaxY`

Maximum values for horizontal and vertical handle positions.

#### `{Number} handleXWidth`, `handleYHeight`

Actual sizes of handles in pixels.

#### `{?HTMLElement} getActiveHandle ()`

Handle that is being dragged by user or `null` if no handle is being dragged at the moment of invocation.

#### `{Boolean} isDraggingHandle ()`

Returns `true` if user is dragging handle, `false` otherwise. Useful to destinguish scrolling cause in `onViewportScroll` callback.

#### `{Boolean} isFastTracking ()`

Returns `true` if fast tracking is in progress, `false` otherwise. Useful to destinguish scrolling cause in `onViewportScroll` callback.

#### `{HTMLElement} getViewport ()`

Get element provided as viewport.

#### `{HTMLElement} getTrackX ()`

Get horizontal track element.

#### `{HTMLElement} getTrackY ()`

Get vertical track element.

#### `{void} scrollBy (dx, dy, [duration = 0], [quiet = false])`

Scroll by the given amount of pixels.

Positive coordinates will scroll to the right and down the content. Negative values will scroll to the left and up the content.

If non-numeric value is provided as `dx` or `dy` then corresponding position of scroll bar coordinate is not changed.

Specify how long the scrolling should run with `duration` in milliseconds.

Set `quiet` to `true` to prevent invocation of `onViewportScroll` until requested scrolling is finished. Can be used for synchronization of multiple scroll areas.

#### `{void} scrollTo (x, y, [duration = 0], [quiet = false])`

Scroll content to a particular place in pixels.

Positive coordinates will scroll to the right and down the content. Negative values will scroll to the left and up the content.

If non-numeric value is provided as `x` or `y` then corresponding position of scroll bar coordinate is not changed.

Specify how long the scrolling should run with `duration` in milliseconds.

Set `quiet` to `true` to prevent invocation of `onViewportScroll` until requested scrolling is finished. Can be used for synchronization of multiple scroll areas.


## Styling

All styling of the component (position of scroll tracks and handles, paddings and margins, their size constraints etc.) is done via CSS.

If you are using same markup for different platforms, sometimes it is useful to unwrap scroll box element and allow user to scroll its content along with page. Do achive this behavior follow these steps:

1. Remove class `.scroll-box_wrapped` from `className` parameter.
2. Add media query restrictions and use `.scroll-box-wrap()` LESS mixin.

```less
@media (min-width: 960px) {
  // Now scroll box would unwrap its content if browser viewport is less than 960px in width.
  .scroll-box {
    .scroll-box-wrap();
  }
}
```


## <a name="scroll-axes"></a>`ScrollAxes`

Enum of combinations af axes that can be scrolled.

#### `{String} ScrollAxes.X = "x"`

Allow horizontal scrolling only.

#### `{String} ScrollAxes.Y = "y"`

Allow vertical scrolling only.

#### <a name="scroll-axes-xy"></a>`ScrollAxes.XY = "xy"`

Allow both vertical and horizontal scrolling.

#### `{Array.<String>} ScrollAxes.values`

Array of values of `ScrollAxes` enum.


## <a name="fast-track"></a>`FastTrack`

Enum of fast track behaviors.

#### `FastTrack.PAGING = "paging"`

When user clicks on scrolling track, content is scrolled by one page in corresponding direction.

#### <a name="fast-track-goto"></a>`FastTrack.GOTO = "goto"`

When user clicks on scrolling track, content is scrolled directly to the corresponding position.

#### <a name="fast-track-none"></a>`FastTrack.OFF = null`

Prevent fast tracking.

#### `{Array.<?String>} FastTrack.values`

Array of values of `FastTrack` enum.


## <a name="scroll-key"></a>`ScrollKey`

Enum of keys used for scrolling.

#### `{Number} ScrollKey.HOME = 36`
#### `{Number} ScrollKey.END = 35`
#### `{Number} ScrollKey.PAGE_UP = 33`
#### `{Number} ScrollKey.PAGE_DOWN = 34`
#### `{Number} ScrollKey.UP = 38`
#### `{Number} ScrollKey.DOWN = 40`
#### `{Number} ScrollKey.LEFT = 37`
#### `{Number} ScrollKey.RIGHT = 39`
