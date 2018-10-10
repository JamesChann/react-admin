import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import { Link } from 'react-router-dom'
import Count from 'api/count-server.jsx'
import MUtil from 'util/mm.jsx'

const _mm = new MUtil()
const _count = new Count()

import './index.scss'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userCount: '',
      productCount: '',
      orderCount: ''
    }
  }

  componentDidMount() {
    this._loadBaseCount()
  }

  _loadBaseCount() {
    _count.countData().then((res) => {
      this.setState({
        userCount: res.userCount,
        productCount: res.productCount,
        orderCount: res.orderCount
      })
    }, err => {
      _mm.errorTips(errMsg)
    })
  }

  render() {
    return (
      <div id="page-wrapper">
        <div id="page-inner">
          <div className="row">
            <div className="col-md-12">
              <PageTitle title="首页" />
            </div>
          </div>
          <div className="row total-data">
            <div className="col-md-4">
              <Link to="/user" className="color-box brown">
                <p className="count">{this.state.userCount}</p>
                <p className="desc">
                  <i className="fa fa-user-o"></i>
                  <span>用户总数</span>
                </p>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/product" className="color-box green">
                <p className="count">{this.state.productCount}</p>
                <p className="desc">
                  <i className="fa fa-list"></i>
                  <span>商品总数</span>
                </p>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/order" className="color-box blue">
                <p className="count">{this.state.orderCount}</p>
                <p className="desc">
                  <i className="fa fa-check-square-o"></i>
                  <span>用户总数</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home