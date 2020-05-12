import React from 'react'
import {Link} from 'react-router'

class NotFoundPage extends React.Component {
  render() {
    return (
      <div class="clear">
        <div id="fof" class="clear">
          <div class="hgroup">
            <h1>お探しのページは見つかりませんでした。</h1>
          </div>
          <hr/>
          <p>ご迷惑をおかけしております。</p>
          <p>お探しのページは見つかりませんでした。</p>
        </div>
      </div>
    )
  }
}

export default NotFoundPage
