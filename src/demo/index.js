import 'classlist-polyfill';

import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import classNames from 'classnames';

import './index.less';
import {ScrollBox} from '../main/ScrollBox';
import {GenericScrollBox, FastTrack, ScrollAxes} from '../main/GenericScrollBox';

function toPositiveInteger(val) {
  return Math.max(0, val / 1);
}

class Demo extends Component {

  state = {
    nativeScroll: null,
    axes: ScrollAxes.XY,
    hoverProximity: 50,
    disabled: false,
    outset: true,
    scrollMinX: 2,
    scrollMinY: 2,

    captureHandleDrag: true,

    // Fast tracking
    fastTrack: FastTrack.GOTO,
    fastTrackDuration: 500,

    // Keyboard
    captureKeyboard: true,
    keyboardStepX: 30,
    keyboardStepY: 30,
    keyboardScrollDuration: 200,

    // Wheel
    captureWheel: true,
    wheelStepX: 30,
    wheelStepY: 30,
    propagateWheelScroll: true,
    swapWheelAxes: false,
    wheelScrollDuration: 100
  };

  onKeyPressNumbersOnly(e) {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  }

  render() {
    let {nativeScroll, ...props} = this.state;
    if (nativeScroll == null) {
      props.nativeScroll = 'orientation' in window;
    } else {
      props.nativeScroll = nativeScroll;
    }
    return (
      <div className="container">
        <h1><span className="light">React</span> <abbr about="Scroll" aria-label="Scroll">Scro<i className="fa fa-long-arrow-up"/><i className="fa fa-long-arrow-down"/></abbr> Box <span className="light">0.2.1</span></h1>
        <div className="row">

          <ScrollBox {...props} className="scroll-box_example scroll-box--wrapped">
            <div className="scroll-box__bg">

              <GenericScrollBox className="form-control scroll-box__nested-example scroll-box--wrapped">
                <textarea className="scroll-box__viewport"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              </GenericScrollBox>

            </div>
          </ScrollBox>

        </div>
        <div className="row">
          <div className="col-md-12">
            <h2>Attributes</h2>
          </div>
        </div>
        <div className="row">
          <form>
            <div className="col-md-4">
              <h3>General</h3>

              <fieldset className="form-group">
                <p><a name="native-scroll"/><code>{'{boolean}'}</code> <code className="prop-name">nativeScroll</code></p>
                <p>Use native scrollbars. By default, this flag is set to <code>true</code> on mobile platforms and <code>false</code> on desktops. Paltforms are distinguished by presence of <code>window.orientation</code>.</p>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="native-scroll"
                           checked={this.state.nativeScroll === false}
                           onChange={e => this.setState({nativeScroll: false})}/>
                    Custom scrollbars
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="native-scroll"
                           checked={this.state.nativeScroll === true}
                           onChange={e => this.setState({nativeScroll: true})}/>
                    Native scrollbars
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="native-scroll"
                           checked={this.state.nativeScroll === null}
                           onChange={e => this.setState({nativeScroll: null})}/>
                    Platform-dependent scrollbars
                  </label>
                </div>
            </fieldset>

              <fieldset className="form-group">
                <p><code>{'{ScrollAxes}'}</code> <code className="prop-name">axes</code></p>
                <p>Scroll axes which are managed by scroll box. If scroll axis is not listed then corresponding scroll offset would be constantly equal to 0.</p>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="axes"
                           checked={this.state.axes === ScrollAxes.X}
                           onChange={e => this.setState({axes: ScrollAxes.X})}/>
                    <code>ScrollAxes.X</code>
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="axes"
                           checked={this.state.axes === ScrollAxes.Y}
                           onChange={e => this.setState({axes: ScrollAxes.Y})}/>
                    <code>ScrollAxes.Y</code>
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="axes"
                           checked={this.state.axes === ScrollAxes.XY}
                           onChange={e => this.setState({axes: ScrollAxes.XY})}/>
                    <code>ScrollAxes.XY</code>
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code>{'{int}'}</code> <code className="prop-name">hoverProximity</code></p>
                <p>
                  <a href="#native-scroll"
                     className={classNames({hidden: !props.nativeScroll})}>
                    <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                  </a>
                </p>
                <p>Maximum distance between cursor and scroll track edge where track is considered to be hovered. Useful when you want to have thin scrollbars but don't want make user aim precisely to grab them. Set to 0 to disable hover proximity detection.</p>
                <div className="input-group">
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.hoverProximity}
                         onKeyPress={this.onKeyPressNumbersOnly}
                         onChange={e => this.setState({hoverProximity: toPositiveInteger(e.target.value)})}/>
                  <div className="input-group-addon">px</div>
                </div>
              </fieldset>

              <fieldset className="form-group">
                <p><code>{'{boolean}'}</code> <code className="prop-name">disabled</code></p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           checked={this.state.disabled}
                           onChange={e => this.setState({disabled: e.target.checked})}/>
                    Disable scroll box
                  </label>
                </div>
              </fieldset>

              <fieldset className="form-group">
                <p><code>{'{boolean}'}</code> <code className="prop-name">outset</code></p>
                <p>Display scrollbars outside of scrollable area. Outset scrllbars do not require additional space and do not affect surrounding layout.</p>
                <p>On mobile devices when native scrollbars are used this property has no effect because scrollbars have zero width and thus don't crop any space from viewport.</p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           checked={this.state.outset}
                           onChange={e => this.setState({outset: e.target.checked})}/>
                    Ouset scrollbars
                  </label>
                </div>
              </fieldset>

              <fieldset className="form-group">
                <p><code>{'{int}'}</code> <code className="prop-name">scrollMinX</code> <code className="prop-name">scrollMinY</code></p>
                <p>Minimum difference in content and viewport sizes to enable scrolling.</p>
                <div className="input-group">
                  <div className="input-group-addon">X</div>
                  <input type="number"
                         className="form-control"
                         value={this.state.scrollMinX}
                         onKeyPress={this.onKeyPressNumbersOnly}
                         onChange={e => this.setState({scrollMinX: toPositiveInteger(e.target.value)})}/>
                  <div className="input-group-addon">px</div>
                </div>
                <div className="input-group">
                  <div className="input-group-addon">Y</div>
                  <input type="number"
                         className="form-control"
                         value={this.state.scrollMinY}
                         onKeyPress={this.onKeyPressNumbersOnly}
                         onChange={e => this.setState({scrollMinY: toPositiveInteger(e.target.value)})}/>
                  <div className="input-group-addon">px</div>
                </div>
              </fieldset>

            </div>

            <div className="col-md-4">
              <h3>Keyboard</h3>

              <fieldset className="form-group">
                <p><code>{'{boolean}'}</code> <code className="prop-name">captureKeyboard</code></p>
                <p>Use keyboard for scrolling when scroll box viewport or its nested content is focused. Keyboard is not captured for <code>&lt;input type="text"/&gt;</code> and <code>&lt;textarea/&gt;</code> elements placed inside scroll box.</p>
                <p><kbd>PgUp</kbd> <kbd>PgDown</kbd> <kbd>Home</kbd> <kbd>End</kbd> and arrow keys are captured.</p>
                <p>You can page-scroll alternate axis with <nobr><kbd>Shift</kbd> + <kbd>PgUp</kbd></nobr> and <nobr><kbd>Shift</kbd> + <kbd>PgDown</kbd></nobr> shortcuts.</p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           checked={this.state.captureKeyboard}
                           onChange={e => this.setState({captureKeyboard: e.target.checked})}/>
                    Use keyboard scrolling
                  </label>
                </div>
              </fieldset>

              <fieldset className="form-group">
                <p><code>{'{int}'}</code> <code className="prop-name">keyboardStepX</code> <code className="prop-name">keyboardStepY</code></p>
                <p>Distance to scroll by when arrow keys are pressed.</p>
                <div className="input-group">
                  <div className="input-group-addon">X</div>
                  <input type="number"
                         className="form-control"
                         value={this.state.keyboardStepX}
                         onKeyPress={this.onKeyPressNumbersOnly}
                         onChange={e => this.setState({keyboardStepX: toPositiveInteger(e.target.value)})}/>
                  <div className="input-group-addon">px</div>
                </div>
                <div className="input-group">
                  <div className="input-group-addon">Y</div>
                  <input type="number"
                         className="form-control"
                         value={this.state.keyboardStepY}
                         onKeyPress={this.onKeyPressNumbersOnly}
                         onChange={e => this.setState({keyboardStepY: toPositiveInteger(e.target.value)})}/>
                  <div className="input-group-addon">px</div>
                </div>
              </fieldset>

              <fieldset className="form-group">
                <p><code>{'{int}'}</code> <code className="prop-name">keyboardScrollDuration</code></p>
                <p>Keyboard smooth scrolling animation duration. Set to 0 to disable smooth keyboard scrolling.</p>
                <div className="input-group">
                  <input type="number"
                         className="form-control"
                         value={this.state.keyboardScrollDuration}
                         onKeyPress={this.onKeyPressNumbersOnly}
                         onChange={e => this.setState({keyboardScrollDuration: toPositiveInteger(e.target.value)})}/>
                  <div className="input-group-addon">msec</div>
                </div>
              </fieldset>

              <h3>Fast Tracking</h3>
              <p>
                <a href="#native-scroll"
                   className={classNames({hidden: !props.nativeScroll})}>
                  <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                </a>
              </p>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><a name="fast-track"/><code>{'{FastTrack}'}</code> <code className="prop-name">fastTrack</code></p>
                <p>Defines expected behavior when user clicks on scroll track.</p>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="fast-track"
                           disabled={props.nativeScroll}
                           checked={this.state.fastTrack === FastTrack.PAGING}
                           onChange={e => this.setState({fastTrack: FastTrack.PAGING})}/>
                    <code>FastTrack.PAGING</code>
                    <p><small>Content is scrolled by one page.</small></p>
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="fast-track"
                           disabled={props.nativeScroll}
                           checked={this.state.fastTrack === FastTrack.GOTO}
                           onChange={e => this.setState({fastTrack: FastTrack.GOTO})}/>
                    <code>FastTrack.GOTO</code>
                    <p><small>Content is scrolled directly to the corresponding position.</small></p>
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio"
                           name="fast-track"
                           disabled={props.nativeScroll}
                           checked={this.state.fastTrack === FastTrack.OFF}
                           onChange={e => this.setState({fastTrack: FastTrack.OFF})}/>
                    <code>FastTrack.OFF</code>
                    <p><small>Prevent fast tracking.</small></p>
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code>{'{int}'}</code> <code className="prop-name">fastTrackDuration</code></p>
                <p>Animation duration of fast track smooth scroll.</p>
                <div className="input-group">
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.fastTrackDuration}
                         onKeyPress={this.onKeyPressNumbersOnly}
                         onChange={e => this.setState({fastTrackDuration: toPositiveInteger(e.target.value)})}/>
                  <div className="input-group-addon">msec</div>
                </div>
              </fieldset>

            </div>

            <div className="col-md-4">
              <h3>Mouse</h3>
              <p>
                <a href="#native-scroll"
                   className={classNames({hidden: !props.nativeScroll})}>
                  <i className="fa fa-fw fa-warning fa--left"/>Requires custom scrollbars to be enabled
                </a>
              </p>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code>{'{boolean}'}</code> <code className="prop-name">captureHandleDrag</code></p>
                <p>Allow user to drag scroll handles.</p>
                <p>If handle drag is disabled along with enabled <a href="#fast-track">fast track</a> then clicking on a handle would cause fast tracking.</p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           checked={this.state.captureHandleDrag}
                           onChange={e => this.setState({captureHandleDrag: e.target.checked})}/>
                    Draggable handles
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code>{'{boolean}'}</code> <code className="prop-name">captureWheel</code></p>
                <p>Use mouse wheel for scrolling. You can scroll alternate axis with <kbd>Shift</kbd> key is pressed.</p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           checked={this.state.captureWheel}
                           onChange={e => this.setState({captureWheel: e.target.checked})}/>
                    Use mouse wheel
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code>{'{int}'}</code> <code className="prop-name">wheelStepX</code> <code className="prop-name">wheelStepY</code></p>
                <p>Wheel scrolling distance.</p>
                <div className="input-group">
                  <div className="input-group-addon">X</div>
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.wheelStepX}
                         onKeyPress={this.onKeyPressNumbersOnly}
                         onChange={e => this.setState({wheelStepX: toPositiveInteger(e.target.value)})}/>
                  <div className="input-group-addon">px</div>
                </div>
                <div className="input-group">
                  <div className="input-group-addon">Y</div>
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.wheelStepY}
                         onKeyPress={this.onKeyPressNumbersOnly}
                         onChange={e => this.setState({wheelStepY: toPositiveInteger(e.target.value)})}/>
                  <div className="input-group-addon">px</div>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code>{'{boolean}'}</code> <code className="prop-name">propagateWheelScroll</code></p>
                <p>Propagate wheel scroll event to parent if scrolling reached maximum or minimum value.</p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           disabled={props.nativeScroll}
                           checked={this.state.propagateWheelScroll}
                           onChange={e => this.setState({propagateWheelScroll: e.target.checked})}/>
                    Propagate wheel scroll
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code>{'{boolean}'}</code> <code className="prop-name">swapWheelAxes</code></p>
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                           disabled={props.nativeScroll}
                           checked={this.state.swapWheelAxes}
                           onChange={e => this.setState({swapWheelAxes: e.target.checked})}/>
                    Swap wheel scrolling axes
                  </label>
                </div>
              </fieldset>

              <fieldset className={classNames('form-group', {'form-group--disabled': props.nativeScroll})}>
                <p><code>{'{int}'}</code> <code className="prop-name">wheelScrollDuration</code></p>
                <p>Wheel smooth scrolling animation duration. Set to 0 to disable smooth whee scrolling.</p>
                <div className="input-group">
                  <input type="number"
                         disabled={props.nativeScroll}
                         className="form-control"
                         value={this.state.wheelScrollDuration}
                         onKeyPress={this.onKeyPressNumbersOnly}
                         onChange={e => this.setState({wheelScrollDuration: toPositiveInteger(e.target.value)})}/>
                  <div className="input-group-addon">msec</div>
                </div>
              </fieldset>

              <h3>Other</h3>

              <p><code>{'{string}'}</code> <code className="prop-name">className</code></p>
              <p>Class name to use.</p>

              <p><code>{'{object}'}</code> <code className="prop-name">style</code></p>
              <p>Style to apply to root element of scroll box.</p>

              <p><code>{'{Function}'}</code> <code className="prop-name">defaultEasing</code></p>
              <p>Easing to use when none is provided.</p>

              <p><code>{'{Function}'}</code> <code className="prop-name">onViewportScroll</code></p>
              <p>Scroll event callback.</p>

            </div>

          </form>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h2>API</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h3>Properties</h3>

            <p><code>{'{HTMLElement}'}</code> <code className="prop-name">handleX</code> <code className="prop-name">handleY</code></p>
            <p>Handle elements. Both are always available.</p>

            <p><code>{'{HTMLElement}'}</code> <code className="prop-name">trackX</code> <code className="prop-name">trackY</code></p>
            <p>Track elements. Both are always available.</p>

            <p><code>{'{HTMLElement}'}</code> <code className="prop-name">viewport</code></p>
            <p>Viewport element.</p>

            <p><code>{'{int}'}</code> <code className="prop-name">targetX</code> <code className="prop-name">targetY</code></p>
            <p>Scroll position in pixels that was last requested.</p>

            <p><code>{'{int}'}</code> <code className="prop-name">previousX</code> <code className="prop-name">previousY</code></p>
            <p>Previously requested scroll position.</p>

            <p><code>{'{int}'}</code> <code className="prop-name">scrollX</code> <code className="prop-name">scrollX</code></p>
            <p>Actual scroll position that user observes. This changes repeatedly during scroll animation, when no animation is in proggress equals to <code>targetX</code> and <code>targetY</code> respectively.</p>

            <p><code>{'{int}'}</code> <code className="prop-name">scrollMaxX</code> <code className="prop-name">scrollMaxY</code></p>
            <p>Maximum values for horizontal and vertical content scroll positions. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollMaxX"><code>Window.scrollMaxX</code></a> for more info.</p>

            <p><code>{'{int}'}</code> <code className="prop-name">trackMaxX</code> <code className="prop-name">trackMaxY</code></p>
            <p>Maximum values for horizontal and vertical track scroll positions.</p>

            <p><code>{'{boolean}'}</code> <code className="prop-name">exposesX</code> <code className="prop-name">exposesX</code></p>
            <p>Does scroll box require actual presence of horizontal or vertical scroll bars. If set to <code>true</code>, then axis is permitted via <code>props.axes</code> and corresponding <code>scrollMax</code> is greater or equal to <code>scrollMin</code>.</p>

          </div>
          <div className="col-md-8">
            <h3>Methods</h3>

            <p><code>{'{void}'}</code> <code className="prop-name">scrollBy</code> <code>{'(dx, dy, duration, easing, silent)'}</code></p>

            <p>Scroll by the given amount of pixels.</p>

            <p><code>[dx = 0] [dy = 0]</code> &ndash; Amount of pixels to scroll by. Positive coordinates will scroll to the right and down the content. Negative values will scroll to the left and up the content. If non-numeric value are provided then corresponding position of scroll bar coordinate is not changed.</p>

            <p><code>[duration = 0]</code> &ndash; Duration of scrolling animation.</p>

            <p><code>[easing = defaultEasing]</code> &ndash; Scroll easing function.</p>

            <p><code>[silent = false]</code> &ndash; Set to <code>true</code> to prevent invocation of <code>onViewportScroll</code> until requested scrolling is finished. Can be used for synchronization of multiple scroll areas.</p>

            <p><code>{'{void}'}</code> <code className="prop-name">scrollTo</code> <code>{'(x, y, duration, easing, silent)'}</code></p>

            <p>Scroll to arbitrary content position.</p>

            <p><code>[x] [y]</code> &ndash; Position to scroll to. If non-numeric value are provided then corresponding position of scroll bar coordinate is not changed.</p>

            <p><code>[duration = 0]</code> &ndash; Duration of scrolling animation.</p>

            <p><code>[easing = defaultEasing]</code> &ndash; Scroll easing function.</p>

            <p><code>[silent = false]</code> &ndash; Set to <code>true</code> to prevent invocation of <code>onViewportScroll</code> until requested scrolling is finished. Can be used for synchronization of multiple scroll areas.</p>

          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('demo'));
