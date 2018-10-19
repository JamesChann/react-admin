import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom'

import Layout from 'component/layout/index.jsx'
// 页面
import Login from 'page/login/index.jsx'
import Home from 'page/home/index.jsx'
import UserList from 'page/userlist/index.jsx'
import ProductRouter from 'page/product/router.jsx'
import OrderList from 'page/order/index.jsx'
import OrderDetail from 'page/order/detail.jsx'
import Err from 'page/error/index.jsx'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={props => (
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/user/index" component={UserList} />
                <Route path="/product" component={ProductRouter} />
                <Route path="/product-category" component={ProductRouter} />
                <Route path="/order/index" component={OrderList} />
                <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
                <Redirect exact from="/user" to="/user/index"/>
                <Redirect exact from="/order" to="/order/index"/>
                <Route component={Err} />
              </Switch>
            </Layout>
          )}
          />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
