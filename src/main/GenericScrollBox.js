import React from 'react';
import {findDOMNode} from 'react-dom';
const {number, bool, func, oneOf, any, arrayOf} = React.PropTypes;

const
  CLASS_SCROLL_BOX = 'scroll-box',
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
    native: bool,
    keyboardStepX: number,
    keyboardStepY: number,
    wheelStepX: number,
    wheelStepY: number,
    propagateScroll: bool,
    wheelAxesSwap: bool,
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
    native: 'orientation' in window,
    keyboardStepX: 30,
    keyboardStepY: 30,
    wheelStepX: 30,
    wheelStepY: 30,
    propagateScroll: true,
    wheelAxesSwap: false,
    easing: easeCircOut,
    onViewportScroll: target => {},
    className: CLASS_WRAPPED
  };

  // Handle elements.
  handleX = null;
  handleY = null;

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

  // Sizes of handles in pixels.
  handleXWidth = 0;
  handleYHeight = 0;
  
  // Maximum values for horizontal and vertical handle positions.
  trackMaxX = 0;
  trackMaxY = 0;

  // PRIVATE PROPERTIES
  
  // Handle currently dragged by user.
  _draggedHandle = null;

  // Timestamp when scroll position was last updated.
  _timestamp = 0;

  // Duration of currently running animation. In case no animation is in progress `_duration` equals to 0.
  _duration = 0;

  // Prevent triggering `onViewportScroll` if any scrolling occurs.
  _silent = false;

  // Is fast tracking in progress.
  _fastTracking = false;

  // Is user currently touching device display.
  _touching = false;

  isNative() {
    return this.props.native;
  }

  hasAxis(axis) {
    return this.props.axes.indexOf(axis) >= 0;
  }

  getDraggedHandle() {
    return this._draggedHandle;
  }

  // Is handle being dragged.
  isDraggingHandle() {
    return Boolean(this._draggedHandle);
  }

  isFastTracking() {
    return this._fastTracking;
  }

  // Get element provided as viewport.
  getViewport() {
    let el = findDOMNode(this);
    return el && el.lastChild;
  }

  // Get horizontal track.
  getTrackX() {
    return this.handleX && this.handleX.parentNode;
  }

  // Get vertical track.
  getTrackY() {
    return this.handleY && this.handleY.parentNode;
  }

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
    this._timestamp = Date.now();
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

  _updateViewport() {
    const {native, outset} = this.props;
    let el = findDOMNode(this),
        viewport = this.getViewport(),
        width = '100%',
        height = '100%';

    // On desktops scrollbars may have non-zero thickness so in case of outset
    // scrollbar positioning cropped pixes must be compensated.
    if (native && outset) {
      let trackYSize = viewport.offsetWidth - viewport.clientWidth,
          trackXSize = viewport.offsetHeight - viewport.clientHeight;
      if (trackYSize) {
        width = `calc(${width} + ${trackYSize}px)`;
      }
      if (trackXSize) {
        height = `calc(${height} + ${trackXSize}px)`;
      }
    }
    viewport.style.width = width;
    viewport.style.height = height;

    toggleClassName(el, CLASS_SHOW_AXIS_X, this.scrollMaxX > 0);
    toggleClassName(el, CLASS_SHOW_AXIS_Y, this.scrollMaxY > 0);
  }

  // Synchronize scrollbar positions immediately without waiting for animation frame.
  _forceSync() {
    const {handleX, handleY} = this;
    if (!handleX) {
      return; // Component was unmounted.
    }
    let viewport = this.getViewport();
    const {native, easing, onViewportScroll} = this.props,
          {clientWidth, clientHeight, scrollWidth, scrollHeight} = viewport,
          SCROLL_MAX_X = Math.max(0, scrollWidth - clientWidth),
          SCROLL_MAX_Y = Math.max(0, scrollHeight - clientHeight);

    this.targetX = this.hasAxis(ScrollAxes.X) * Math.max(0, Math.min(Math.round(this.targetX), SCROLL_MAX_X));
    this.targetY = this.hasAxis(ScrollAxes.Y) * Math.max(0, Math.min(Math.round(this.targetY), SCROLL_MAX_Y));

    const {targetX, targetY, scrollY, scrollX, previousX, previousY, _duration} = this;
    let x = targetX,
        y = targetY;

    if (!native && !this._touching && scrollY == viewport.scrollTop && scrollX == viewport.scrollLeft) {
      let elapsedTime = Date.now() - this._timestamp;
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
      x = this.targetX = viewport.scrollLeft;
      y = this.targetY = viewport.scrollTop;
    }

    if (scrollX == x && scrollY == y && this.scrollMaxX == SCROLL_MAX_X && this.scrollMaxY == SCROLL_MAX_Y) {
      if (this._duration == 0) {
        // Animation has completed and geometry did not change, so reset flags possibly introduced
        // during scroll request (by `scrollTo` or fast tracking).
        this._silent = false;
        this._fastTracking = false;
      }

      // Viewport did not change its scroll parameters, so invocation of `onViewportScroll` and
      // further altering geometry of handles and tracks is not required.
      return;
    }

    this.handleXWidth = 0;
    this.handleYHeight = 0;
    this.trackMaxX = 0;
    this.trackMaxY = 0;

    // Update non-native handle positions and sizes.
    if (!native) {
      // Scrollbar size represents ratio of content and viewport sizes.
      handleX.style.width = clientWidth / scrollWidth * 100 + '%';
      handleY.style.height = clientHeight / scrollHeight * 100 + '%';

      this.handleXWidth = handleX.offsetWidth;
      this.handleYHeight = handleY.offsetHeight;
      this.trackMaxX = this.getTrackX().clientWidth - this.handleXWidth;
      this.trackMaxY = this.getTrackY().clientHeight - this.handleYHeight;

      handleX.style.left = this.trackMaxX * x / SCROLL_MAX_X + 'px';
      handleY.style.top = this.trackMaxY * y / SCROLL_MAX_Y + 'px';
    }
    this.scrollX = x;
    this.scrollY = y;
    this.scrollMaxX = SCROLL_MAX_X;
    this.scrollMaxY = SCROLL_MAX_Y;

    if (!this._silent) {
      onViewportScroll(this);
    }
  }

  onTouchStart = e => {
    this._touching = true;
  };

  onTouchEnd = e => {
    this._touching = false;
  };

  onScroll = e => {
    if (this.props.native && e.target == this.getViewport()) {
      this._forceSync();
    }
  };

  onWheel = e => {
    const {wheelStepX, wheelStepY, native, disabled, propagateScroll, wheelAxesSwap} = this.props,
          {targetX, targetY, scrollMaxX, scrollMaxY} = this,
          el = e.target;
    if (native || disabled || e.isDefaultPrevented() || (el != this.getViewport() && isTextInput(el))) {
      return;
    }
    // Normalize mouse wheel delta among browsers and devices.
    // Usually `event.delta*` in IE 100-400, in Chrome 100-300, in FF 3-10, and
    // these values may even differ in different browser versions.
    let dx = e.deltaX / Math.abs(e.deltaX) * wheelStepX * this.hasAxis(ScrollAxes.X) || 0,
        dy = e.deltaY / Math.abs(e.deltaY) * wheelStepY * this.hasAxis(ScrollAxes.Y) || 0;
    if (
      (dx < 0 && !targetX) || (dx > 0 && targetX == scrollMaxX) ||
      (dy < 0 && !targetY) || (dy > 0 && targetY == scrollMaxY)
    ) {
      // Content is scrolled to its possible limit.
      if (!propagateScroll) {
        e.preventDefault();
      }
      return;
    }
    // By default, Google Chrome changes scrolling orientation if shift key is pressed,
    // so propagate this behavior to other browsers as well.
    if (e.shiftKey && !dx) {
      [dx, dy] = [dy, dx];
    }
    if (wheelAxesSwap) {
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
        let viewport = this.getViewport(),
            dy = viewport.clientHeight,
            dx = viewport.clientWidth;
        if (e.keyCode === 33) {
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

    let draggedTrack;
    if (axis == ScrollAxes.X) {
      this._draggedHandle = this.handleX;
      draggedTrack = this.getTrackX();
    } else {
      this._draggedHandle = this.handleY;
      draggedTrack = this.getTrackY();
    }

    const OFFSET_X = e.clientX - this.handleX.offsetLeft,
          OFFSET_Y = e.clientY - this.handleY.offsetTop;

    let onDrag = e => {
      if (!this.handleX || e.button != 0) {
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
      this._draggedHandle = null;
      removeEventListener(EVENT_MOUSE_MOVE, onDrag);
      removeEventListener(EVENT_MOUSE_UP, onDragEnd);
      removeEventListener(EVENT_BLUR, onDragEnd);
      if (this.handleX) {
        // Ensure component is mounted.
        toggleClassName(draggedTrack, CLASS_TRACK_DRAGGED, false);
      }
    };

    addEventListener(EVENT_MOUSE_MOVE, onDrag);
    addEventListener(EVENT_MOUSE_UP, onDragEnd);
    addEventListener(EVENT_BLUR, onDragEnd);
    toggleClassName(draggedTrack, CLASS_TRACK_DRAGGED, true);
  };

  onDragStartX = e => this.onDragStart(e, ScrollAxes.X);

  onDragStartY = e => this.onDragStart(e, ScrollAxes.Y);

  onFastTrack(e, axis) {
    const {disabled, fastTrack, fastTrackDuration} = this.props;
    if (disabled || e.button > 0) {
      return; // Component is disabled or mouse button is being pressed.
    }
    let x, y;
    const {clientWidth, clientHeight, scrollWidth, scrollHeight} = this.getViewport(),
          POINTER_X = e.clientX - this.getTrackX().getBoundingClientRect().left,
          POINTER_Y = e.clientY - this.getTrackY().getBoundingClientRect().top;

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
          x = POINTER_X / this.getTrackX().clientWidth * scrollWidth - clientWidth / 2;
        } else {
          y = POINTER_Y / this.getTrackY().clientHeight * scrollHeight - clientHeight / 2;
        }
        break;

      default: return;
    }
    this._fastTracking = true;
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
    if (this.props.native || e.buttons > 0) {
      return;
    }
    // Update track hover status only if it is actually visible.
    if (this.scrollMaxX) {
      this._updateTrackHoverStatus(e, this.getTrackX());
    }
    if (this.scrollMaxY) {
      this._updateTrackHoverStatus(e, this.getTrackY());
    }
  };

  componentDidMount() {
    let requestForceSync = () => {
      if (!this.handleX) {
        return; // Component was unmounted.
      }
      if (window.requestAnimationFrame) {
        requestAnimationFrame(requestForceSync);
      } else {
        setTimeout(requestForceSync, 1000 / 30);
      }
      this._updateViewport();
      this._forceSync();
    };
    requestForceSync();
    addEventListener(EVENT_MOUSE_MOVE, this.onCursorApproachingTrack);
  }

  componentWillUnmount() {
    removeEventListener(EVENT_MOUSE_MOVE, this.onCursorApproachingTrack);
  }

  componentDidUpdate() {
    this._updateViewport();
    this._forceSync();
  }

  render() {
    const {trackXChildren, trackYChildren, handleXChildren, handleYChildren, disabled, native, outset, className, children, style} = this.props;
    let classNames = [className, CLASS_SCROLL_BOX];
    if (disabled) {
      classNames.push(CLASS_DISABLED);
    }
    if (native) {
      classNames.push(CLASS_NATIVE);
    }
    if (outset) {
      classNames.push(CLASS_OUTSET);
    }
    if (this.hasAxis(ScrollAxes.X)) {
      classNames.push(CLASS_HAS_AXIS_X);
    }
    if (this.hasAxis(ScrollAxes.Y)) {
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
