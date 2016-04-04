import React from 'react';
import {findDOMNode} from 'react-dom';
const {number, bool, func, oneOf, any, arrayOf} = React.PropTypes;

const
  CLASS_SCROLL_BOX = 'scroll-box',
  CLASS_VIEWPORT = 'scroll-box__viewport',
  CLASS_TRACK_X = 'scroll-box__track scroll-box__track_x',
  CLASS_TRACK_Y = 'scroll-box__track scroll-box__track_y',
  CLASS_HANDLE_X = 'scroll-box__handle scroll-box__handle_x',
  CLASS_HANDLE_Y = 'scroll-box__handle scroll-box__handle_y',

  CLASS_HAS_AXIS_X = 'scroll-box_has-axis-x',
  CLASS_HAS_AXIS_Y = 'scroll-box_has-axis-y',
  CLASS_SHOW_AXIS_X = 'scroll-box_show-axis-x',
  CLASS_SHOW_AXIS_Y = 'scroll-box_show-axis-y',

  CLASS_WRAPPED = 'scroll-box_wrapped',
  CLASS_NATIVE = 'scroll-box_native',
  CLASS_OUTSET = 'scroll-box_outset',
  CLASS_DISABLED = 'scroll-box_disabled',
  CLASS_TRACK_HOVER = 'scroll-box__track_hover',
  CLASS_TRACK_DRAGGED = 'scroll-box__track_dragged',

  EVENT_MOUSE_MOVE = 'mousemove',
  EVENT_MOUSE_UP = 'mouseup',
  EVENT_BLUR = 'blur';

export const ScrollAxes = {
  X: 'x',
  Y: 'y',
  XY: 'xy'
};
ScrollAxes.values = values(ScrollAxes);
Object.freeze(ScrollAxes);

export const FastTrack = {
  PAGING: 'paging',
  GOTO: 'goto',
  OFF: null
};
FastTrack.values = values(FastTrack);
Object.freeze(FastTrack);

export const ScrollKey = {
  HOME: 36,
  END: 35,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};
ScrollKey.values = values(ScrollKey);
Object.freeze(ScrollKey);

// Get values of an object.
function values(obj) {
  let values = [];
  for (let key of Object.keys(obj)) {
    values.push(obj[key]);
  }
  return values;
}

// Default easing function.
function easeCircOut(percentage, elapsedTime, min, max, duration) {
  return max * Math.sqrt(1 - (percentage -= 1) * percentage) + min;
}

// Toggle class name for an element.
function toggleClassName(el, className, force) {
  let classNames = el.className.split(' '),
      i = classNames.indexOf(className);
  if (force == null) {
    force = i < 0;
  }
  if (force) {
    if (i >= 0) {
      return; // Class already added.
    }
    classNames.push(className);
  } else {
    if (i < 0) {
      return; // Class already removed.
    }
    do {
      // Class name can be repeated multiple times.
      classNames.splice(i, 1);
      i = classNames.indexOf(className);
    } while (i >= 0);
  }
  el.className = classNames.join(' ');
}

function isTextInput(el) {
  let tagName = el.tagName.toLocaleLowerCase();
  return tagName == 'textarea' || (tagName == 'input' && el.type == 'text');
}

export class GenericScrollBox extends React.Component {

  static propTypes = {
    axes: oneOf(ScrollAxes.values),
    fastTrack: oneOf(FastTrack.values),
    fastTrackDuration: number,
    scrollDuration: number,
    hoverProximity: number,
    disabled: bool,
    captureKeyboard: bool,
    scrollKeys: arrayOf(oneOf(ScrollKey.values)),
    outset: bool,
    forceNativeScroll: bool,
    keyboardStepX: number,
    keyboardStepY: number,
    wheelStepX: number,
    wheelStepY: number,
    propagateWheelScroll: bool,
    swapWheelAxes: bool,
    scrollMinX: number,
    scrollMinY: number,
    easing: func,
    onViewportScroll: func,
    trackXChildren: any,
    trackYChildren: any,
    handleXChildren: any,
    handleYChildren: any
  };

  static defaultProps = {
    axes: ScrollAxes.XY,
    fastTrack: FastTrack.GOTO,
    fastTrackDuration: 500,
    scrollDuration: 100,
    hoverProximity: 50,
    disabled: false,
    captureKeyboard: true,
    scrollKeys: ScrollKey.values,
    outset: false,
    forceNativeScroll: 'orientation' in window,
    keyboardStepX: 30,
    keyboardStepY: 30,
    wheelStepX: 30,
    wheelStepY: 30,
    propagateWheelScroll: true,
    swapWheelAxes: false,
    scrollMinX: 2,
    scrollMinY: 2,
    easing: easeCircOut,
    onViewportScroll: target => {},
    className: CLASS_WRAPPED
  };

  // Handle elements.
  // Set to `null` when component is unmounted.
  handleX = null;
  handleY = null;

  // Track elements.
  // Set to `null` when component is unmounted.
  trackX = null;
  trackY = null;

  // Viewport element.
  // Set to `null` when component is unmounted.
  viewport = null;

  // Scroll position in pixels that was last requested.
  targetX = 0;
  targetY = 0;

  // Previously requested scroll position.
  previousX = 0;
  previousY = 0;

  // Actual scroll position that user observes.
  // This changes repeatedly during animation, while is static these
  // values are equal to `x` and `y`.
  scrollX = 0;
  scrollY = 0;

  // Maximum values for horizontal and vertical scroll positions.
  scrollMaxX = 0;
  scrollMaxY = 0;

  // Maximum values for horizontal and vertical handle positions. If native scroll is used then equals to 0.
  trackMaxX = 0;
  trackMaxY = 0;

  // Does scroll box require actual presence of horizontal or vertical scroll bars.
  // If set to `true`, then axis is permitted via `props.axes` and corresponding `scrollMax >= scrollMin`.
  exposesX = false;
  exposesY = false;

  // Timestamp when scroll position started to change last time.
  _start = 0;

  // Duration of currently running animation. In case no animation is in progress `_duration` equals to 0.
  _duration = 0;

  // If set to `true` prevents triggering `onViewportScroll` if any scrolling occurs.
  // Automatically reset to `false` then scroll animation finishes.
  _silent = false;

  /**
   * Scroll area by the given amount of pixels.
   *
   * Positive coordinates will scroll to the right and down the content.
   * Negative values will scroll to the left and up the content.
   *
   * If non-numeric value is provided then corresponding position of
   * scroll bar coordinate is not changed.
   *
   * @param {Number} [dx = 0] Horizontal offset.
   * @param {Number} [dy = 0] Vertical offset.
   * @param {Number} [duration = 0] How long the scrolling should run.
   * @param {Boolean} [silent = false] Prevent invocation of `onViewportScroll` until requested
   *        scrolling is finished. Can be used for synchronization of multiple scroll areas.
   */
  scrollBy(dx, dy, duration, silent) {
    this.scrollTo(this.scrollX + dx, this.scrollY + dy, duration, silent);
  }

  /**
   * Scroll content to a particular place in pixels.
   *
   * If non-numeric value is provided then corresponding position of
   * scroll bar coordinate is not changed.
   *
   * @param {Number} [x] Horizontal offset.
   * @param {Number} [y] Vertical offset.
   * @param {Number} [duration = 0] How long the scrolling should run.
   * @param {Boolean} [silent = false] Prevent invocation of `onViewportScroll` until requested
   *        scrolling is finished. Can be used for synchronization of multiple scroll areas.
   */
  scrollTo(x, y, duration = this.props.scrollDuration, silent = false) {
    // Consider actual scroll position to be a starting point.
    this._duration = duration;
    this._start = Date.now();
    this.previousX = this.scrollX;
    this.previousY = this.scrollY;
    if (!isNaN(x)) {
      this.targetX = x;
    }
    if (!isNaN(y)) {
      this.targetY = y;
    }
    this._silent = Boolean(silent);
    this._forceSync();
  }

  // Synchronize scrollbar positions immediately without waiting for animation frame.
  _forceSync() {
    const {handleX, handleY, viewport, _start, _silent} = this;
    if (!viewport) {
      return; // Component was unmounted.
    }
    const {scrollY, scrollX, previousX, previousY, exposesX, exposesY, _duration} = this,
          {axes, forceNativeScroll, outset, easing, onViewportScroll, scrollMinX, scrollMinY} = this.props,
          {clientWidth, clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight, scrollTop, scrollLeft} = viewport;

    const SCROLL_MAX_X = Math.max(0, scrollWidth - clientWidth),
          SCROLL_MAX_Y = Math.max(0, scrollHeight - clientHeight);

    this.exposesX = axes.indexOf(ScrollAxes.X) > -1 && SCROLL_MAX_X >= scrollMinX;
    this.exposesY = axes.indexOf(ScrollAxes.Y) > -1 && SCROLL_MAX_Y >= scrollMinY;

    let el = findDOMNode(this);
    toggleClassName(el, CLASS_SHOW_AXIS_X, this.exposesX);
    toggleClassName(el, CLASS_SHOW_AXIS_Y, this.exposesY);

    // Scrollbars may have non-zero thickness so in case of outset positioning
    // pixes cropped by scrollbar must be compensated.
    let width = '100%',
        height = '100%';
    if (forceNativeScroll && outset) {
      let trackYWidth = offsetWidth - clientWidth,
          trackXHeight = offsetHeight - clientHeight;
      if (trackYWidth) {
        width = `calc(100% + ${trackYWidth}px)`;
      }
      if (trackXHeight) {
        height = `calc(100% + ${trackXHeight}px)`;
      }
    }
    viewport.style.width = width;
    viewport.style.height = height;

    let targetX = Math.max(0, Math.min(Math.round(this.targetX), SCROLL_MAX_X)) * this.exposesX,
        targetY = Math.max(0, Math.min(Math.round(this.targetY), SCROLL_MAX_Y)) * this.exposesY,
        x = targetX,
        y = targetY;

    if (!forceNativeScroll && scrollY == scrollTop && scrollX == scrollLeft) {
      let elapsedTime = Date.now() - _start;
      if (elapsedTime < _duration) {
        let ratio = easing(elapsedTime / _duration, elapsedTime, 0, 1, _duration);

        // Compute eased scroll positions.
        x = Math.round(previousX + ratio * (targetX - previousX));
        y = Math.round(previousY + ratio * (targetY - previousY));
      } else {
        // Scroll animation completed.
        this._duration = 0;
      }
      // Prevent native scrolling glitches, especially if native scroll is inertial or smooth.
      viewport.scrollLeft = x;
      viewport.scrollTop = y;
    } else {
      // Viewport scroll position is not synced with component state.
      // This is usually caused by system scrolling, resize of element etc.
      // So stop running animation and update component state with current
      // viewport scroll offsets.
      this._duration = 0;
      x = targetX = scrollLeft;
      y = targetY = scrollTop;
    }
    this.targetX = targetX;
    this.targetY = targetY;

    if (scrollX == x && scrollY == y && this.scrollMaxX == SCROLL_MAX_X && this.scrollMaxY == SCROLL_MAX_Y) {
      if (!this._duration) {
        // Animation has completed and geometry did not change.
        this._silent = false;
      }
      // Viewport did not change its scroll parameters, so invocation of `onViewportScroll` and
      // further altering geometry of handles and tracks is not required.
      return;
    }
    this.scrollX = x;
    this.scrollY = y;
    this.scrollMaxX = SCROLL_MAX_X;
    this.scrollMaxY = SCROLL_MAX_Y;
    this.trackMaxX = 0;
    this.trackMaxY = 0;

    // Update custom handle positions and sizes.
    // Scrollbar size represents ratio of content and viewport sizes.
    if (!forceNativeScroll) {
      this.trackMaxX = this.trackX.clientWidth - handleX.offsetWidth;
      this.trackMaxY = this.trackY.clientHeight - handleY.offsetHeight;

      handleX.style.width = clientWidth / scrollWidth * 100 + '%';
      handleX.style.left = this.trackMaxX * x / SCROLL_MAX_X + 'px';

      handleY.style.height = clientHeight / scrollHeight * 100 + '%';
      handleY.style.top = this.trackMaxY * y / SCROLL_MAX_Y + 'px';
    }
    if (!_silent && !(scrollX == x && scrollY == y)) {
      onViewportScroll(this);
    }
  }

  onTouchStart = e => {
  };

  onTouchEnd = e => {
  };

  onScroll = e => {
    if (this.props.forceNativeScroll && e.target == this.viewport) {
      this._forceSync();
    }
  };

  onWheel = e => {
    const {axes, wheelStepX, wheelStepY, forceNativeScroll, disabled, propagateWheelScroll, swapWheelAxes} = this.props,
          {targetX, targetY, scrollMaxX, scrollMaxY} = this,
          el = e.target;
    if (forceNativeScroll || disabled || e.isDefaultPrevented() || (el != this.viewport && isTextInput(el))) {
      return;
    }
    // Normalize mouse wheel delta among browsers and devices.
    // Usually `event.delta*` in IE 100-400, in Chrome 100-300, in FF 3-10, and these values may even
    // differ in different browser versions. Those W3C guys should better have standard on that.
    let dx = e.deltaX / Math.abs(e.deltaX) * wheelStepX * this.exposesX || 0,
        dy = e.deltaY / Math.abs(e.deltaY) * wheelStepY * this.exposesY || 0;
    if (
      (dx < 0 && !targetX) || (dx > 0 && targetX == scrollMaxX) ||
      (dy < 0 && !targetY) || (dy > 0 && targetY == scrollMaxY)
    ) {
      // Content is scrolled to its possible limit.
      if (!propagateWheelScroll) {
        e.preventDefault();
      }
      return;
    }
    // By default, Google Chrome changes scrolling orientation if shift key is pressed,
    // so propagate this behavior to other browsers as well.
    if (e.shiftKey && !dx) {
      dx = dy;
      dy = 0;
    }
    if (swapWheelAxes) {
      [dx, dy] = [dy, dx];
    }
    e.preventDefault();
    this.scrollTo(targetX + dx, targetY + dy);
  };

  onKeyDown = e => {
    const {keyboardStepX, keyboardStepY, disabled, captureKeyboard, scrollKeys} = this.props;
    if (disabled || !captureKeyboard || e.isDefaultPrevented() || scrollKeys.indexOf(e.keyCode) < 0 || isTextInput(e.target)) {
      return;
    }
    // Prevent page scrolling.
    e.preventDefault();
    switch (e.keyCode) {
      case 36: // Home
        this.scrollTo(0, 0);
        break;
      case 35: // End
        this.scrollTo(this.scrollMaxX, this.scrollMaxY);
        break;
      case 33: // PgUp
      case 34: // PgDn
        let dy = this.viewport.clientHeight,
            dx = this.viewport.clientWidth;
        if (e.keyCode == 33) {
          // For PageUp invert direction.
          dy *= -1;
          dx *= -1;
        }
        if (e.shiftKey) {
          this.scrollBy(dx, 0);
        } else {
          this.scrollBy(0, dy);
        }
        break;
      case 38: // Up
        this.scrollBy(0, -keyboardStepY);
        break;
      case 40: // Down
        this.scrollBy(0, keyboardStepY);
        break;
      case 37: // Left
        this.scrollBy(-keyboardStepX, 0);
        break;
      case 39: // Right
        this.scrollBy(keyboardStepX, 0);
        break;
    }
  };

  onDragStart(e, axis) {
    if (this.props.disabled || e.button != 0) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    let track;
    if (axis == ScrollAxes.X) {
      track = this.trackX;
    } else {
      track = this.trackY;
    }
    const OFFSET_X = e.clientX - this.handleX.offsetLeft,
          OFFSET_Y = e.clientY - this.handleY.offsetTop;

    let onDrag = e => {
      if (!this.viewport || e.button != 0) {
        onDragEnd(); // Component was unmounted or button was released.
      }
      if (axis == ScrollAxes.X) {
        var x = this.scrollMaxX * (e.clientX - OFFSET_X) / this.trackMaxX;
      } else {
        var y = this.scrollMaxY * (e.clientY - OFFSET_Y) / this.trackMaxY;
      }
      this.scrollTo(x, y, 0);
    };

    let onDragEnd = e => {
      removeEventListener(EVENT_MOUSE_MOVE, onDrag);
      removeEventListener(EVENT_MOUSE_UP, onDragEnd);
      removeEventListener(EVENT_BLUR, onDragEnd);
      if (this.viewport) {
        // Ensure component is mounted.
        toggleClassName(track, CLASS_TRACK_DRAGGED, false);
      }
    };

    addEventListener(EVENT_MOUSE_MOVE, onDrag);
    addEventListener(EVENT_MOUSE_UP, onDragEnd);
    addEventListener(EVENT_BLUR, onDragEnd);
    toggleClassName(track, CLASS_TRACK_DRAGGED, true);
  };

  onDragStartX = e => this.onDragStart(e, ScrollAxes.X);

  onDragStartY = e => this.onDragStart(e, ScrollAxes.Y);

  onFastTrack(e, axis) {
    const {disabled, fastTrack, fastTrackDuration} = this.props;
    if (disabled || e.button != 0) {
      return; // Component is disabled or secondary mouse button is being pressed.
    }
    let x, y;
    const {clientWidth, clientHeight, scrollWidth, scrollHeight} = this.viewport,
          POINTER_X = e.clientX - this.trackX.getBoundingClientRect().left,
          POINTER_Y = e.clientY - this.trackY.getBoundingClientRect().top;

    switch (fastTrack) {

      case FastTrack.PAGING:
        if (axis == ScrollAxes.X) {
          x = this.targetX + (1 - 2 * (POINTER_X < this.handleX.offsetLeft)) * clientWidth;
        } else {
          y = this.targetY + (1 - 2 * (POINTER_Y < this.handleY.offsetTop)) * clientHeight;
        }
        break;

      case FastTrack.GOTO:
        if (axis == ScrollAxes.X) {
          x = POINTER_X / this.trackX.clientWidth * scrollWidth - clientWidth / 2;
        } else {
          y = POINTER_Y / this.trackY.clientHeight * scrollHeight - clientHeight / 2;
        }
        break;

      default: return;
    }
    this.scrollTo(x, y, fastTrackDuration);
  };

  onFastTrackX = e => this.onFastTrack(e, ScrollAxes.X);

  onFastTrackY = e => this.onFastTrack(e, ScrollAxes.Y);

  onRenderHandleX = ref => this.handleX = ref && findDOMNode(ref);

  onRenderHandleY = ref => this.handleY = ref && findDOMNode(ref);

  _updateTrackHoverStatus(e, track) {
    const {clientX, clientY} = e,
          {hoverProximity} = this.props,
          {width, left, top, height} = track.getBoundingClientRect();

    toggleClassName(track, CLASS_TRACK_HOVER,
      clientY - height - top < hoverProximity && top - clientY < hoverProximity &&
      clientX - width - left < hoverProximity && left - clientX < hoverProximity);
  }

  onCursorApproachingTrack = e => {
    // Do not track cursor proximity for native scroll bar, when handle is being dragged,
    // when selection is in progress or when another handle is being dragged (even on another
    // scroll box instance).
    if (this.props.forceNativeScroll || e.buttons > 0) {
      return;
    }
    // Update track hover status only if it is actually in use.
    if (this.exposesX) {
      this._updateTrackHoverStatus(e, this.trackX);
    }
    if (this.exposesY) {
      this._updateTrackHoverStatus(e, this.trackY);
    }
  };

  _updateReferences() {
    this.trackX = this.handleX.parentNode;
    this.trackY = this.handleY.parentNode;
    this.viewport = findDOMNode(this).lastChild;
  }

  componentDidMount() {
    let requestForceSync = () => {
      if (!this.viewport) {
        return; // Component was unmounted.
      }
      if (window.requestAnimationFrame) {
        requestAnimationFrame(requestForceSync);
      } else {
        setTimeout(requestForceSync, 1000 / 30);
      }
      this._forceSync();
    };
    this._updateReferences();
    requestForceSync();
    addEventListener(EVENT_MOUSE_MOVE, this.onCursorApproachingTrack);
  }

  componentDidUpdate() {
    this._updateReferences();
    this._forceSync();
  }

  componentWillUnmount() {
    this.trackX = null;
    this.trackY = null;
    this.viewport = null;
    removeEventListener(EVENT_MOUSE_MOVE, this.onCursorApproachingTrack);
  }

  render() {
    const {axes, trackXChildren, trackYChildren, handleXChildren, handleYChildren, disabled, forceNativeScroll, outset, className, children, style} = this.props;
    let classNames = [className, CLASS_SCROLL_BOX];
    if (disabled) {
      classNames.push(CLASS_DISABLED);
    }
    if (forceNativeScroll) {
      classNames.push(CLASS_NATIVE);
    }
    if (outset) {
      classNames.push(CLASS_OUTSET);
    }
    if (axes.indexOf(ScrollAxes.X) > -1) {
      classNames.push(CLASS_HAS_AXIS_X);
    }
    if (axes.indexOf(ScrollAxes.Y) > -1) {
      classNames.push(CLASS_HAS_AXIS_Y);
    }
    return (
      <div style={style}
           className={classNames.join(' ')}
           onScroll={this.onScroll}
           onWheel={this.onWheel}
           onKeyDown={this.onKeyDown}
           onTouchStart={this.onTouchStart}
           onTouchEnd={this.onTouchEnd}
           onTouchCancel={this.onTouchEnd}
           tabIndex="-1">
        <div className={CLASS_TRACK_X}
             onMouseDown={this.onFastTrackX}>
          <div ref={this.onRenderHandleX}
               onMouseDown={this.onDragStartX}
               className={CLASS_HANDLE_X}>
            {handleXChildren}
          </div>
          {trackXChildren}
        </div>
        <div className={CLASS_TRACK_Y}
             onMouseDown={this.onFastTrackY}>
          <div ref={this.onRenderHandleY}
               onMouseDown={this.onDragStartY}
               className={CLASS_HANDLE_Y}>
            {handleYChildren}
          </div>
          {trackYChildren}
        </div>
        {React.Children.only(children)}
      </div>
    );
  }
}
