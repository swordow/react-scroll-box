import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';

import './index.less';
import {ScrollBox} from '../main/ScrollBox';
import {GenericScrollBox, FastTrack, ScrollAxes} from '../main/GenericScrollBox';

class Demo extends Component {

  state = {
    axes: ScrollAxes.XY,
    disabled: false,
    captureKeyboard: true,
    hoverProximity: 50,
    fastTrackDuration: 500,
    fastTrack: FastTrack.REWIND,
    native: false,
    outset: false
  };

  onNativeChange = native => {
    this.setState({native});
  };

  onOutsetChange = e => {
    this.setState({outset: e.target.checked});
  };

  onCaptureKeyboardChange = e => {
    this.setState({captureKeyboard: e.target.checked});
  };

  onScrollingAxesChange = axes => {
    this.setState({axes});
  };

  onFastTrackChange = fastTrack => {
    this.setState({fastTrack});
  };

  onHoverProximityChange = e => {
    this.setState({hoverProximity: e.target.value});
  };


  onFastTrackDurationChange = e => {
    this.setState({fastTrackDuration: e.target.value});
  };

  render() {
    let {native, ...props} = this.state;
    if (native !== null) {
      props.native = native;
    }

    return (
      <div className="container">
        <p><h1>React Scroll Box Component</h1></p>
        <div className="row">
          <div className="col-md-3">
            <form>
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this.state.outset} onChange={this.onOutsetChange}/> Outset scroll bars
                </label>
              </div>

              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this.state.captureKeyboard} onChange={this.onCaptureKeyboardChange}/> Capture keyboard
                </label>
              </div>

              <p><b>Type of scrollbars to use</b></p>
              <div className="radio">
                <label>
                  <input type="radio" name="native" checked={this.state.native === true} onChange={e => this.onNativeChange(true)}/> Native
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="native" checked={this.state.native === false} onChange={e => this.onNativeChange(false)}/> Custom
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="native" checked={this.state.native === null} onChange={e => this.onNativeChange(null)}/> Platform-dependent
                </label>
              </div>

              <fieldset className="form-group">
                <label htmlFor="hover-proximity">
                  <b>Hover proximity</b>, px
                </label>
                <input type="number" disabled={this.state.native} className="form-control" id="hover-proximity" value={this.state.hoverProximity} onChange={this.onHoverProximityChange}/>
              </fieldset>

              <fieldset className="form-group">
                <label htmlFor="fast-track-duration">
                  <b>Fast track duration</b>, msec
                </label>
                <input type="number" disabled={this.state.native} className="form-control" id="fast-track-duration" value={this.state.fastTrackDuration} onChange={this.onFastTrackDurationChange}/>
              </fieldset>

              <p><b>Scrolling axes</b></p>
              <div className="radio">
                <label>
                  <input type="radio" name="axes" checked={this.state.axes === ScrollAxes.X} onChange={e => this.onScrollingAxesChange(ScrollAxes.X)}/> <code>ScrollAxes.X</code>
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="axes" checked={this.state.axes === ScrollAxes.Y} onChange={e => this.onScrollingAxesChange(ScrollAxes.Y)}/> <code>ScrollAxes.Y</code>
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="axes" checked={this.state.axes === ScrollAxes.XY} onChange={e => this.onScrollingAxesChange(ScrollAxes.XY)}/> <code>ScrollAxes.XY</code>
                </label>
              </div>

              <p><b>Fast track behavior</b></p>
              <div className="radio">
                <label>
                  <input type="radio" name="fast-track" checked={this.state.fastTrack === FastTrack.REWIND} onChange={e => this.onFastTrackChange(FastTrack.REWIND)}/> <code>FastTrack.REWIND</code>
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="fast-track" checked={this.state.fastTrack === FastTrack.PAGING} onChange={e => this.onFastTrackChange(FastTrack.PAGING)}/> <code>FastTrack.PAGING</code>
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="fast-track" checked={this.state.fastTrack === FastTrack.NONE} onChange={e => this.onFastTrackChange(FastTrack.NONE)}/> <code>FastTrack.NONE</code>
                </label>
              </div>

            </form>
          </div>
          <div className="col-md-9">
            <ScrollBox {...props} className="scroll-box_example scroll-box_wrapped">
              <div className="scroll-box__clouds"/>
            </ScrollBox>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('demo'));
