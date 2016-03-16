import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';
import {ScrollBox} from '../main/ScrollBox';
import {GenericScrollBox} from '../main/GenericScrollBox';

const SCROLL_BOX_STYLE = {
  width: '300px',
  height: '200px',
  background: '#ddd'
};

const PLACEHOLDER = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.';

function Site() {
  return (
    <div>
      <p>Basic text content</p>
      <ScrollBox style={SCROLL_BOX_STYLE}>{PLACEHOLDER}</ScrollBox>



      {/*<p>Relative content sizing</p>
       <ScrollBox style={SCROLL_BOX_STYLE}>
       <div style={{height: '100%', background: 'yellow'}}>Height 100%</div>
       <div style={{height: '50%', width: '150%', background: 'red'}}>Height 50%, width 150%</div>
       </ScrollBox><p>Outset scrollbars</p>
       <ScrollBox style={SCROLL_BOX_STYLE}
       outset>
       <div style={{width: '500px'}}>{PLACEHOLDER}</div>
       </ScrollBox>

       <p>Native scrollbars</p>
       <ScrollBox style={SCROLL_BOX_STYLE}
       native>
       <div style={{width: '500px'}}>{PLACEHOLDER}</div>
       </ScrollBox>

       <p>Native outset scrollbars</p>
       <ScrollBox style={SCROLL_BOX_STYLE}
       native
       outset>
       <div style={{width: '500px'}}>{PLACEHOLDER}</div>
       </ScrollBox>

       <p>Custom viewport, <kbd>textarea</kbd></p>
       <GenericScrollBox style={SCROLL_BOX_STYLE}
       captureKeyboard={false}>
       <textarea className="scroll-box__viewport" style={{overflow: 'hidden', resize: 'none'}} defaultValue={PLACEHOLDER}/>
       </GenericScrollBox>*/}
    </div>
  );
}

ReactDOM.render(<Site/>, document.getElementById('site'));
