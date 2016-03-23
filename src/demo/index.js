import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';

import './index.less';
import {ScrollBox} from '../main/ScrollBox';
import {GenericScrollBox, FastTrack, ScrollAxes} from '../main/GenericScrollBox';

const PLACEHOLDER = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.';

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

  onNativeChange = e => {
    this.setState({native: e.target.checked});
  };

  onOutsetChange = e => {
    this.setState({outset: e.target.checked});
  };

  onCaptureKeyboardChange = e => {
    this.setState({captureKeyboard: e.target.checked});
  };

  onScrollingAxesChange = e => {
    this.setState({axes: e.target.value});
  };

  onFastTrackChange = e => {
    this.setState({fastTrack: e.target.value});
  };

  onHoverProximityChange = e => {
    this.setState({hoverProximity: e.target.value});
  };


  onFastTrackDurationChange = e => {
    this.setState({fastTrackDuration: e.target.value});
  };

  render() {
    return (
      <div className="container">
        <form>

          <div className="checkbox">
            <label>
              <input type="checkbox" checked={this.state.native} onChange={this.onNativeChange}/> Use native scroll bars
            </label>
          </div>

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

          <fieldset className="form-group">
            <label htmlFor="hover-proximity">Hover proximity</label>
            <input type="number" disabled={this.state.native} className="form-control" id="hover-proximity" value={this.state.hoverProximity} onChange={this.onHoverProximityChange}/>
            <small className="text-muted">We'll never share your email with anyone else.</small>
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="fast-track-duration">FastTrackDuration</label>
            <input type="number" disabled={this.state.native} className="form-control" id="fast-track-duration" value={this.state.fastTrackDuration} onChange={this.onFastTrackDurationChange}/>
            <small className="text-muted">We'll never share your email with anyone else.</small>
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="axes">Scrolling axes</label>
            <select className="form-control" id="axes" value={this.state.axes} onChange={this.onScrollingAxesChange}>
              <option value={ScrollAxes.X}>ScrollAxes.X</option>
              <option value={ScrollAxes.Y}>ScrollAxes.Y</option>
              <option value={ScrollAxes.XY}>ScrollAxes.XY</option>
            </select>
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="fast-track">Fast track behavior</label>
            <select disabled={this.state.native} className="form-control" id="fast-track" value={this.state.fastTrack} onChange={this.onFastTrackChange}>
              <option value={FastTrack.REWIND}>FastTrack.REWIND</option>
              <option value={FastTrack.PAGING}>FastTrack.PAGING</option>
              <option value={FastTrack.NONE}>FastTrack.NONE</option>
            </select>
          </fieldset>

        </form>

        <ScrollBox {...this.state} className="scroll-box_example scroll-box_wrapped">{PLACEHOLDER}</ScrollBox>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('demo'));
