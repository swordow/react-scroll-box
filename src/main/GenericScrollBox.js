import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

const
  SCROLL_CLASS = 'scroll-box',
  ENABLE_CLASS = 'scroll-box-enable',
  TRACK_CLASS = 'scroll-box-track',
  TRACK_X_CLASS = 'scroll-box-track-x',
  TRACK_Y_CLASS = 'scroll-box-track-y',
  HANDLE_CLASS = 'scroll-box-handle',
  HANDLE_X_CLASS = 'scroll-box-handle-x',
  HANDLE_Y_CLASS = 'scroll-box-handle-y',
  SCROLL_X_CLASS = 'scroll-box-x',
  SCROLL_Y_CLASS = 'scroll-box-y',
  SHOW_SCROLL_X_CLASS = 'show-scroll-x',
  SHOW_SCROLL_Y_CLASS = 'show-scroll-y',
  NATIVE_SCROLL_CLASS = 'scroll-box-native',
  OUTSET_SCROLL_CLASS = 'scroll-box-outset',
  DISABLED_CLASS = 'disabled',
  DRAGGED_CLASS = 'dragged';

export const ScrollAxes = Object.freeze({
  X: 'x',
  Y: 'y',
  XY: 'xy'
});

export const FastTrack = Object.freeze({
  PAGING: 'paging',
  REWIND: 'rewind',
  NONE: null
});

// Default easing function.
function easeCircOut(percentage, elapsedTime, min, max, duration) {
  return max * Math.sqrt(1 - (percentage -= 1) * percentage) + min;
}

/**
 * @class GenericScrollBox
 * @extends React.Component
 * @classdesc
 * Generic scrollable area that uses provided child as viewport, changing its `scrollTop` and
 * `scrollLeft` DOM attributes.
 *
 * By default, scrollable area does not have any height specified, you need to define it manually
 * in your component styles.
 *
 * @property {React.Props} props Tag attributes.
 * @property {ScrollAxes.X|ScrollAxes.Y|ScrollAxes.XY} [props.axes = ScrollAxes.XY] Scroll axes
 *           that are allowed. If scroll axis is not allowed, corresponding scroll offset would
 *           be constantly equal to 0.
 * @property {FastTrack.PAGING|FastTrack.REWIND|FastTrack.NONE} [props.fastTrack = FastTrack.REWIND]
 *           Expected behavior when user clicks on scroll track.
 * @property {Number} [props.fastTrackDuration = 500] Fast track animation duration.
 * @property {Boolean} [props.disabled = false] Disable control.
 * @property {Boolean} [props.captureKeyboard = true] Use keyboard for scrolling.
 * @property {Boolean} [props.outset = false] Display scrollbars outside of scrollable area.
 *           On mobile devices when native scrollbar is used `outset` property has no effect because
 *           scrollbars do not crop any space from viewport.
 * @property {Boolean} [props.native] Use native scrolling. By default, this flag is set to `true`
 *           on mobile platforms and `false` on desktops but you can change it manually.
 * @property {Number} [props.stepX = 30] Horizontal scroll step for keyboard scrolling in pixels.
 * @property {Number} [props.stepY = 30] Vertical scroll step for keyboard scrolling in pixels.
 * @property {Function} [props.easing] Easing function for animated scrolling.
 * @property {String} [props.className = "scroll enable-scroll"] List of style CSS class names.
 * @property {Function} [props.onViewportScroll] Callback that fires when content is being scrolled.
 *           Receives {@link GenericScrollBox} component as an argument.
 *
 * @property {React.Element} children Single element that is used as viewport with `.scroll-viewport`
 *           class specified.
 */
export class GenericScrollBox extends React.Component {

  static propTypes = {
    axes: PropTypes.oneOf([ScrollAxes.X, ScrollAxes.Y, ScrollAxes.XY]),
    fastTrack: PropTypes.oneOf([FastTrack.PAGING, FastTrack.REWIND, FastTrack.NONE]),
    fastTrackDuration: PropTypes.number,
    disabled: PropTypes.bool,
    captureKeyboard: PropTypes.bool,
    outset: PropTypes.bool,
    native: PropTypes.bool,
    stepX: PropTypes.number,
    stepY: PropTypes.number,
    easing: PropTypes.func,
    onViewportScroll: PropTypes.func
  };
  static defaultProps = {
    axes: ScrollAxes.XY,
    fastTrack: FastTrack.REWIND,
    fastTrackDuration: 500,
    disabled: false,
    captureKeyboard: true,
    outset: false,
    native: 'orientation' in window,
    stepX: 30,
    stepY: 30,
    easing: easeCircOut,
    onViewportScroll: scroll => {},
    className: ENABLE_CLASS
  };

  // Handle elements.
  handleX;
  handleY;

  // Scroll position in pixels that was last requested.
  // It may not be set immediately because animation may occur.
  x = 0;
  y = 0;

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

  // Maximum values for horizontal and vertical handle positions.
  trackMaxX = 0;
  trackMaxY = 0;

  // Handle currently dragged by user.
  draggedHandle = null;

  // Timestamp when scroll position was last updated.
  updateTimestamp = 0;

  // Duration of currently running animation. In case no animation is
  // in progress `animationDuration` equals to 0.
  animationDuration = 0;

  // Prevent triggering `onViewportScroll` if any scrolling occurs.
  quiet = false;

  // Is fast tracking in progress.
  fastTracking = false;

  /**
   * Horizontal scroll position in pixels that was last requested.
   * @method
   * @name GenericScrollBox#getTargetX
   * @returns {Number}
   */
  getTargetX() {
    return this.x;
  };

  /**
   * Vertical scroll position in pixels that was last requested.
   * @method
   * @name GenericScrollBox#getTargetY
   * @returns {Number}
   */
  getTargetY() {
    return this.y;
  };

  /**
   * Actual horizontal scroll position that user observes.
   * @method
   * @name GenericScrollBox#getScrollX
   * @returns {Number}
   */
  getScrollX() {
    return this.scrollX;
  };

  /**
   * Actual vertical scroll position that user observes.
   * @method
   * @name GenericScrollBox#getScrollY
   * @returns {Number}
   */
  getScrollY() {
    return this.scrollY;
  };

  /**
   * Actual vertical scroll position that user observes.
   * @method
   * @name GenericScrollBox#getDraggedHandle
   * @returns {HTMLElement}
   */
  getDraggedHandle() {
    return this.draggedHandle;
  }

  /**
   * Is handle being dragged.
   * @method
   * @name GenericScrollBox#isDraggingHandle
   * @returns {Boolean}
   */
  isDraggingHandle() {
    return Boolean(this.draggedHandle);
  }

  /**
   * Is user fast tracking scroll panel.
   * @method
   * @name GenericScrollBox#isFastTracking
   * @returns {Boolean}
   */
  isFastTracking() {
    return this.fastTracking;
  }

  /**
   * Get element provided as viewport.
   * @method
   * @name GenericScrollBox#getViewport
   * @returns {HTMLElement}
   */
  getViewport() {
    return findDOMNode(this).lastChild;
  }

  /**
   * Get horizontal track.
   * @method
   * @name GenericScrollBox#getTrackX
   * @returns {HTMLElement}
   */
  getTrackX() {
    return this.handleX.parentNode;
  }

  /**
   * Get vertical track.
   * @method
   * @name GenericScrollBox#getTrackY
   * @returns {HTMLElement}
   */
  getTrackY() {
    if (this.handleY) {
      return this.handleY.parentNode;
    }
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
   * @method
   * @name GenericScrollBox#scrollBy
   * @param {Number} [dx = 0] Horizontal offset.
   * @param {Number} [dy = 0] Vertical offset.
   * @param {Number} [duration = 0] How long the scrolling should run.
   * @param {Boolean} [quiet = false] Prevent invocation of `onViewportScroll` until requested
   *        scrolling is finished. Can be used for synchronization of multiple scroll areas.
   */
  scrollBy(dx, dy, duration = 0, quiet = false) {
    this.scrollTo(this.scrollX + dx, this.scrollY + dy, duration, quiet);
  }

  /**
   * Scroll content to a particular place in pixels.
   *
   * If non-numeric value is provided then corresponding position of
   * scroll bar coordinate is not changed.
   *
   * @method
   * @name GenericScrollBox#scrollTo
   * @param {Number} [x] Horizontal offset.
   * @param {Number} [y] Vertical offset.
   * @param {Number} [duration = 0] How long the scrolling should run.
   * @param {Boolean} [quiet = false] Prevent invocation of `onViewportScroll` until requested
   *        scrolling is finished. Can be used for synchronization of multiple scroll areas.
   */
  scrollTo(x, y, duration = 0, quiet = false) {
    // Consider actual scroll position to be a starting point.
    this.animationDuration = duration;
    this.updateTimestamp = Date.now();
    this.previousX = this.scrollX;
    this.previousY = this.scrollY;
    if (!isNaN(x)) {
      this.x = x;
    }
    if (!isNaN(y)) {
      this.y = y;
    }
    this.quiet = Boolean(quiet);
    this.forceSync();
  }

  /**
   * Synchronize scrollbar positions immediately without waiting for animation frame.
   *
   * @private
   * @method
   * @name GenericScrollBox#forceSync
   */
  forceSync() {
    let {handleX, handleY} = this;
    if (handleX == null) {
      return; // Component was unmounted.
    }

    let {native, outset, axes, easing, onViewportScroll} = this.props,
        el = findDOMNode(this),
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

    let {clientWidth, clientHeight, scrollWidth, scrollHeight} = viewport,
        scrollMaxX = axes.includes(ScrollAxes.X) * Math.max(0, scrollWidth - clientWidth),
        scrollMaxY = axes.includes(ScrollAxes.Y) * Math.max(0, scrollHeight - clientHeight);

    this.x = Math.max(0, Math.min(Math.round(this.x), scrollMaxX));
    this.y = Math.max(0, Math.min(Math.round(this.y), scrollMaxY));

    el.classList.toggle(SHOW_SCROLL_X_CLASS, scrollMaxX > 0);
    el.classList.toggle(SHOW_SCROLL_Y_CLASS, scrollMaxY > 0);

    let {x, y, scrollY, scrollX, previousX, previousY, animationDuration} = this;

    if (scrollY == viewport.scrollTop && scrollX == viewport.scrollLeft) {
      let elapsedTime = Date.now() - this.updateTimestamp;
      if (elapsedTime < animationDuration) {
        let ratio = easing(elapsedTime / animationDuration, elapsedTime, 0, 1, animationDuration);

        // Compute eased scroll positions.
        x = Math.round(previousX + ratio * (x - previousX));
        y = Math.round(previousY + ratio * (y - previousY));
      } else {
        // Scroll animation completed.
        this.animationDuration = 0;
      }
      viewport.scrollLeft = x;
      viewport.scrollTop = y;
    } else {
      // Viewport scroll position is not synced with component state.
      // This is usually caused by system scrolling, resize of element etc.
      // So stop running animation and update component state with current
      // viewport scroll offsets.
      this.animationDuration = 0;
      x = this.x = viewport.scrollLeft;
      y = this.y = viewport.scrollTop;
    }

    if (scrollX == x && scrollY == y && this.scrollMaxX == scrollMaxX && this.scrollMaxY == scrollMaxY) {
      if (this.animationDuration == 0) {
        // Animation has completed and geometry did not change, so reset flags possibly introduced
        // during scroll request (by `scrollTo` or fast tracking).
        this.quiet = false;
        this.fastTracking = false;
      }

      // Viewport did not change its scroll parameters, so invocation of `onViewportScroll` and
      // further altering geometry of handles and tracks is not required.
      return;
    }

    this.trackMaxX = 0;
    this.trackMaxY = 0;
    // Update non-native handle positions and sizes.
    if (!native) {
      // Scrollbar size represents ratio of content and viewport sizes.
      handleX.style.width = clientWidth / scrollWidth * 100 + '%';
      handleY.style.height = clientHeight / scrollHeight * 100 + '%';

      this.trackMaxX = this.getTrackX().clientWidth - handleX.offsetWidth;
      this.trackMaxY = this.getTrackY().clientHeight - handleY.offsetHeight;

      handleX.style.left = this.trackMaxX * x / scrollMaxX + 'px';
      handleY.style.top = this.trackMaxY * y / scrollMaxY + 'px';
    }
    this.scrollX = x;
    this.scrollY = y;
    this.scrollMaxX = scrollMaxX;
    this.scrollMaxY = scrollMaxY;

    if (!this.quiet) {
      onViewportScroll.call(this, this);
    }
  }

  onWheel = e => {
    // Do not disable wheel when native scrolling is enabled.
    // This helps to avoid native smooth scroll collisions.
    if (this.props.disabled) {
      return;
    }
    let {axes} = this.props,
        dx = e.deltaX * (axes.indexOf(ScrollAxes.X) >= 0),
        dy = e.deltaY * (axes.indexOf(ScrollAxes.Y) >= 0);

    if (dx + dy == 0) {
      return; // Nothing to scroll.
    }
    // By default, Google Chrome changes scrolling orientation if shift key is pressed,
    // so propagate this behavior to other browsers as well.
    if (e.shiftKey && !window.chrome) {
      [dx, dy] = [dy, dx];
    }
    e.preventDefault();
    this.scrollBy(dx, dy);
  };

  onKeyDown = e => {
    if (this.props.disabled || !this.props.captureKeyboard || e.isDefaultPrevented()) {
      return;
    }
    if (/3[6534879]|40/.test(e.keyCode)) {
      // Prevent page scrolling.
      e.preventDefault();
    }
    let {stepX, stepY} = this.props;
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
        this.scrollBy(0, -stepY);
        break;
      case 40: // Down
        this.scrollBy(0, stepY);
        break;
      case 37: // Left
        this.scrollBy(-stepX, 0);
        break;
      case 39: // Right
        this.scrollBy(stepX, 0);
        break;
    }
  };

  onDragStart(e, axis) {
    if (this.props.disabled) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    let draggedTrack;
    if (axis == ScrollAxes.X) {
      this.draggedHandle = this.handleX;
      draggedTrack = this.getTrackX();
    } else {
      this.draggedHandle = this.handleY;
      draggedTrack = this.getTrackY();
    }

    let offsetX = e.pageX - this.handleX.offsetLeft,
        offsetY = e.pageY - this.handleY.offsetTop;

    let onDrag = e => {
      if (this.handleX == null) {
        onDragEnd(); // Component was unmounted.
      }
      if (axis == ScrollAxes.X) {
        var x = this.scrollMaxX * (e.pageX - offsetX) / this.trackMaxX;
      } else {
        var y = this.scrollMaxY * (e.pageY - offsetY) / this.trackMaxY;
      }
      this.scrollTo(x, y, 0);
    };

    let onDragEnd = () => {
      this.draggedHandle = null;
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('blur', onDragEnd);
      if (this.handleX) {
        // Check component is mounted.
        draggedTrack.classList.remove(DRAGGED_CLASS);
      }
    };

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('blur', onDragEnd);
    draggedTrack.classList.add(DRAGGED_CLASS);
  };

  onDragStartX = e => this.onDragStart(e, ScrollAxes.X);

  onDragStartY = e => this.onDragStart(e, ScrollAxes.Y);

  onFastTrack(e, axis) {
    if (this.props.disabled) {
      return;
    }
    let x, y,
        {clientWidth, clientHeight, scrollWidth, scrollHeight} = this.getViewport(),
        pointerX = e.pageX - window.scrollX - this.getTrackX().getBoundingClientRect().left,
        pointerY = e.pageY - window.scrollY - this.getTrackY().getBoundingClientRect().top;

    switch (this.props.fastTrack) {

      case FastTrack.PAGING:
        if (axis == ScrollAxes.X) {
          x = this.x + (1 - 2 * (pointerX < this.handleX.offsetLeft)) * clientWidth;
        } else {
          y = this.y + (1 - 2 * (pointerY < this.handleY.offsetTop)) * clientHeight;
        }
        break;

      case FastTrack.REWIND:
        if (axis == ScrollAxes.X) {
          x = pointerX / this.getTrackX().clientWidth * scrollWidth - clientWidth / 2;
        } else {
          y = pointerY / this.getTrackY().clientHeight * scrollHeight - clientHeight / 2;
        }
        break;

      default: return;
    }
    this.fastTracking = true;
    this.scrollTo(x, y, this.props.fastTrackDuration);
  };

  onFastTrackX = e => this.onFastTrack(e, ScrollAxes.X);

  onFastTrackY = e => this.onFastTrack(e, ScrollAxes.Y);

  onRenderHandleX = ref => this.handleX = ref;

  onRenderHandleY = ref => this.handleY = ref;

  componentDidMount() {
    let requestForceSync = () => {
      if (this.handleX) {
        requestAnimationFrame(requestForceSync);
        this.forceSync();
      }
    };
    requestForceSync();
  }

  componentDidUpdate() {
    this.forceSync();
  }

  render() {
    let {disabled, axes, native, outset, className, children, style} = this.props;
    let classNames = [className, SCROLL_CLASS];
    if (disabled) {
      classNames.push(DISABLED_CLASS);
    }
    if (native) {
      classNames.push(NATIVE_SCROLL_CLASS);
    }
    if (outset) {
      classNames.push(OUTSET_SCROLL_CLASS);
    }
    if (axes.indexOf(ScrollAxes.X) >= 0) {
      classNames.push(SCROLL_X_CLASS);
    }
    if (axes.indexOf(ScrollAxes.Y) >= 0) {
      classNames.push(SCROLL_Y_CLASS);
    }
    return (
      <div style={style}
           className={classNames.join(' ')}
           onWheel={this.onWheel}
           onKeyDown={this.onKeyDown}
           tabIndex="-1">
        <div className={TRACK_CLASS + ' ' + TRACK_X_CLASS}
             onMouseDown={this.onFastTrackX}>
          <div ref={this.onRenderHandleX}
               onMouseDown={this.onDragStartX}
               className={HANDLE_CLASS + ' ' + HANDLE_X_CLASS}/>
        </div>
        <div className={TRACK_CLASS + ' ' + TRACK_Y_CLASS}
             onMouseDown={this.onFastTrackY}>
          <div ref={this.onRenderHandleY}
               onMouseDown={this.onDragStartY}
               className={HANDLE_CLASS + ' ' + HANDLE_Y_CLASS}/>
        </div>
        {React.Children.only(children)}
      </div>
    );
  }
}
