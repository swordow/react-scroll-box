# React ScrollBox Component

[Live Demo](http://smikhalevski.github.io/react-scroll-box/)

## <a name="scroll-box"></a>`ScrollBox`

Pure component that renders its children inside scrollable area.

```javascript
<ScrollBox style={{height: '100px'}}>
  Scrollable content goes here.
</ScrollBox>
```

## <a name="generic-scroll-box"></a>`GenericScrollBox`

The only difference from `ScrollBox` is that only one child element can be provided and that element is considered to be a scrolled viewport.

```javascript
<GenericScrollBox style={{height: '100px'}}>
  <textarea className="scroll-box-viewport">
    I can even scroll a textarea element!
  </textarea>
</GenericScrollBox>
```

### Props

#### <a name="axes"></a><code><i>{"x"|"y"|"xy"}</i> [axes = "xy"]</code>

Scroll axes that are allowed. If scroll axis is not allowed, corresponding scroll offset would be constantly equal to 0.

#### <a name="fast-track"></a><code><i>{"paging"|"rewind"|null}</i> [fastTrack = "rewind"]</code>

Expected behavior when user clicks on scroll track.

#### <a name="fast-track-duration"></a><code><i>{Number}</i> [fastTrackDuration = 500]</code>

Fast track animation duration.

#### <a name="disabled"></a><code><i>{Boolean}</i> [disabled = false]</code>

Disable control.

#### <a name="capture-keyboard"></a><code><i>{Boolean}</i> [captureKeyboard = true]</code>

Use keyboard for scrolling.

#### <a name="outset"></a><code><i>{Boolean}</i> [outset = false]</code>

Display scrollbars outside of scrollable area. On mobile devices when native scrollbar is used `outset` property has no effect because scrollbars do not crop any space from viewport.

#### <a name="native"></a><code><i>{Boolean}</i> [native]</code>

Use native scroll bars. By default, this flag is set to `true` on mobile platforms and `false` on desktops but you can change it manually.

#### <a name="step-x"></a><code><i>{Number}</i> [stepX = 30]</code>

Horizontal scroll step for keyboard scrolling in pixels.

#### <a name="step-y"></a><code><i>{Number}</i> [stepY = 30]</code>

Vertical scroll step for keyboard scrolling in pixels.

#### <a name="easing"></a><code><i>{Function}</i> [easing]</code>

Easing function for animated scrolling. See jQuery easings for more info.

```javascript
function easeCircOut(percentage, elapsedTime, min, max, duration) {
  return max * Math.sqrt(1 - (percentage -= 1) * percentage) + min;
}
```

#### <a name="class-name"></a><code><i>{String|Object}</i> [className]</code>

List of style CSS class names concatenated with [`classnames`](https://github.com/JedWatson/classnames).

#### <a name="on-viewport-scroll"></a><code><i>{Function}</i> [onViewportScroll]</code>

Callback that is invoked when scrolling occurs.

### Instance Methods

#### <a name="get-target-x"></a><code><i>{Number}</i> getTargetX ()</code>

Horizontal scroll position in pixels that was last requested.

#### <a name="get-target-y"></a><code><i>{Number}</i> getTargetY ()</code>

Vertical scroll position in pixels that was last requested.

#### <a name="get-scroll-x"></a><code><i>{Number}</i> getScrollX ()</code>

Actual horizontal scroll position that user observes.

#### <a name="get-scroll-y"></a><code><i>{Number}</i> getScrollY ()</code>

Actual vertical scroll position that user observes.

#### <a name="get-dragged-handle"></a><code><i>{HTMLElement}</i> getDraggedHandle ()</code>

Handle that is being dragged by user.

#### <a name="is-dragging-handle"></a><code><i>{Boolean}</i> isDraggingHandle ()</code>

Is handle being dragged.

#### <a name="is-fast-tracking"></a><code><i>{Boolean}</i> isFastTracking ()</code>

Is user fast tracking scroll box.

#### <a name="get-viewport"></a><code><i>{HTMLElement}</i> getViewport ()</code>

Get element provided as viewport.

#### <a name="get-track-x"></a><code><i>{HTMLElement}</i> getTrackX ()</code>

Get horizontal track.

#### <a name="get-track-y"></a><code><i>{HTMLElement}</i> getTrackY ()</code>

Get vertical track.

#### <a name="scroll-by"></a><code><i>{void}</i> scrollBy (dx, dy, [duration = 0], [quiet = false])</code>

Scroll area by the given amount of pixels.

Positive coordinates will scroll to the right and down the content. Negative values will scroll to the left and up the content.

If non-numeric value is provided then corresponding position of scroll bar coordinate is not changed.

Specify how long the scrolling should run with `duration` (msec).

Set `quiet` to `true` to prevent invocation of `onViewportScroll` until requested scrolling is finished. Can be used for synchronization of multiple scroll areas.

#### <a name="scroll-to"></a><code><i>{void}</i> scrollTo (x, y, [duration = 0], [quiet = false])</code>

Scroll area by the given amount of pixels.

Positive coordinates will scroll to the right and down the content. Negative values will scroll to the left and up the content.

If non-numeric value is provided then corresponding position of scroll bar coordinate is not changed.

Specify how long the scrolling should run with `duration` (msec).

Set `quiet` to `true` to prevent invocation of `onViewportScroll` until requested scrolling is finished. Can be used for synchronization of multiple scroll areas.
