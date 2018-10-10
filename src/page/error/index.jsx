import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import { Link } from 'react-router-dom'

class Err extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <div id="page-inner">
          <PageTitle title="出错啦!"/>
          <div className="row">
            <div className="col-md-12">
              找不到该路径
              <Link to="/">点我返回首页</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Err