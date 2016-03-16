# React Scroll Box Component

Cross-browser and cross-platform scrollable container implementation with no external dependencies but React.

[Live Demo](http://smikhalevski.github.io/react-scroll-box/)

## Contents

1. [`ScrollBox`](#scroll-box)
2. [`GenericScrollBox`](#generic-scroll-box)
  1. [Parameters](#parameters)
  2. [Methods](#methods)
  3. [Media Queries](#media-queries)
3. [`ScrollAxes`](#scroll-axes)
4. [`FastTrack`](#fast-track)

## <a name="scroll-box"></a>`ScrollBox`

Pure component that renders its children inside scrollable area.

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
  <textarea className="scroll-box-viewport">
    I can even scroll a textarea element!
  </textarea>
</GenericScrollBox>
```

### Parameters

#### <a name="generic-scroll-box-axes"></a><code>{<a href="#scroll-axes">ScrollAxes</a>} [axes = <a href="#scroll-axes-xy">ScrollAxes.XY</a>]</code>

Scroll axes that are allowed to be affected. If scroll axis is not allowed to be changed, corresponding scroll offset would be constantly equal to 0.

#### <a name="generic-scroll-box-fast-track"></a><code>{<a href="#fast-track">FastTrack</a>} [fastTrack = <a href="#fast-track-rewind">FastTrack.REWIND</a>]</code>

Expected behavior when user clicks on scroll track.

#### <a name="generic-scroll-box-fast-track-duration"></a>`{Number} [fastTrackDuration = 500]`

Fast track animation duration in milliseconds.

#### <a name="generic-scroll-box-disabled"></a>`{Boolean} [disabled = false]`

Disable scroll box control.

#### <a name="generic-scroll-box-capture-keyboard"></a>`{Boolean} [captureKeyboard = true]`

Use keyboard for scrolling when scroll box is focused. Arrow keys, `Home`, `End`, `Page Up`, `Page Down` are captured. You can also use `Shift` key along with `Page Up`, `Page Down` to scroll in horizontal axis.

#### <a name="generic-scroll-box-outset"></a>`{Boolean} [outset = false]`

Display scrollbars outside of scrollable area. On mobile devices when native scrollbar is used `outset` property has no effect because scrollbars do not crop any space from viewport.

#### <a name="generic-scroll-box-native"></a>`{Boolean} [native]`

Use native scroll bars. By default, this flag is set to `true` on mobile platforms and `false` on desktops but you can change it manually.

#### <a name="generic-scroll-box-step-x"></a>`{Number} [stepX = 30]`

Horizontal scroll step for keyboard scrolling in pixels.

#### <a name="generic-scroll-box-step-y"></a>`{Number} [stepY = 30]`

Vertical scroll step for keyboard scrolling in pixels.

#### <a name="generic-scroll-box-easing"></a>`{Function} [easing (percentage, elapsedTime, min, max, duration)]`

Easing function to animate scrolling.

#### <a name="generic-scroll-box-class-name"></a>`{String} [className = "wrapped"]`

Space-separated style class names.

#### <a name="generic-scroll-box-on-viewport-scroll"></a>`{Function} [onViewportScroll ({GenericScrollBox} target)]`

Callback that is invoked when any scrolling occurs. Repetedly called during animation, handle dragging and fast tracking.

### Methods

#### <a name="generic-scroll-box-get-target-x"></a>`{Number} getTargetX ()`

Horizontal scroll position in pixels that was last requested via [`scrollTo`](#generic-scroll-box-scroll-to) or [`scrollBy`](generic-scroll-box-scroll-by).

#### <a name="generic-scroll-box-get-target-y"></a>`{Number} getTargetY ()`

Vertical scroll position in pixels that was last requested via [`scrollTo`](#generic-scroll-box-scroll-to) or [`scrollBy`](generic-scroll-box-scroll-by).

#### <a name="generic-scroll-box-get-scroll-x"></a>`{Number} getScrollX ()`

Actual horizontal scroll position that user observes.

#### <a name="generic-scroll-box-get-scroll-y"></a>`{Number} getScrollY ()`

Actual vertical scroll position that user observes.

#### <a name="generic-scroll-box-get-dragged-handle"></a>`{?HTMLElement} getDraggedHandle ()`

Handle that is being dragged by user or `null` if no handle is being dragged at the moment of invocation.

#### <a name="generic-scroll-box-is-dragging-handle"></a>`{Boolean} isDraggingHandle ()`

Returns `true` if user is dragging handle, `false` otherwise. Useful to destinguish scrolling cause in `onViewportScroll` callback.

#### <a name="generic-scroll-box-is-fast-tracking"></a>`{Boolean} isFastTracking ()`

Returns `true` if fast tracking is in progress, `false` otherwise. Useful to destinguish scrolling cause in `onViewportScroll` callback.

#### <a name="generic-scroll-box-get-viewport"></a>`{HTMLElement} getViewport ()`

Get element provided as viewport.

#### <a name="generic-scroll-box-get-track-x"></a>`{HTMLElement} getTrackX ()`

Get horizontal track element.

#### <a name="generic-scroll-box-get-track-y"></a>`{HTMLElement} getTrackY ()`

Get vertical track element.

#### <a name="generic-scroll-box-scroll-by"></a>`{void} scrollBy (dx, dy, [duration = 0], [quiet = false])`

Scroll by the given amount of pixels.

Positive coordinates will scroll to the right and down the content. Negative values will scroll to the left and up the content.

If non-numeric value is provided as `dx` or `dy` then corresponding position of scroll bar coordinate is not changed.

Specify how long the scrolling should run with `duration` in milliseconds.

Set `quiet` to `true` to prevent invocation of `onViewportScroll` until requested scrolling is finished. Can be used for synchronization of multiple scroll areas.

#### <a name="generic-scroll-box-scroll-to"></a>`{void} scrollTo (x, y, [duration = 0], [quiet = false])`

Scroll content to a particular place in pixels.

Positive coordinates will scroll to the right and down the content. Negative values will scroll to the left and up the content.

If non-numeric value is provided as `x` or `y` then corresponding position of scroll bar coordinate is not changed.

Specify how long the scrolling should run with `duration` in milliseconds.

Set `quiet` to `true` to prevent invocation of `onViewportScroll` until requested scrolling is finished. Can be used for synchronization of multiple scroll areas.

### Media Queries

If you are using same markup for different platforms, sometimes it is useful to unwrap scroll box element and allow user to scroll its content along with page. Do achive this behavior follow these steps:

1. Remove `wrapped` from `className` parameter.
2. Add media query restrictions and use `.scroll-box-wrap()` LESS mixin.

```less
@media (min-width: 960px) {
  // Now scroll box would unwrap its content if browser viewport is less than 960px in width.
  .scroll-box-wrap();
}
```

## <a name="scroll-axes"></a>`ScrollAxes`

Enum of combinations af axes that can be scrolled.

#### <a name="scroll-axes-x"></a>`ScrollAxes.X = "x"`

Allow horizontal scrolling only.

#### <a name="scroll-axes-y"></a>`ScrollAxes.Y = "y"`

Allow vertical scrolling only.

#### <a name="scroll-axes-xy"></a>`ScrollAxes.XY = "xy"`

Allow both vertical and horizontal scrolling.

## <a name="fast-track"></a>`FastTrack`

Enum of fast track behaviors.

#### <a name="fast-track-paging"></a>`FastTrack.PAGING = "paging"`

When user clicks on scrolling track, content is scrolled by one page in corresponding direction.

#### <a name="fast-track-rewind"></a>`FastTrack.REWIND = "rewind"`

When user clicks on scrolling track, content is scrolled directly to the corresponding position.

#### <a name="fast-track-none"></a>`FastTrack.NONE = null`

Prevent fast tracking.
