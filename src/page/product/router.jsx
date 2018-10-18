import React from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProductDetail from 'page/product/index/detail.jsx'

class ProductRouter extends React.Component{
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList}/>
        <Route exact path="/product/save" component={ProductSave}/>
        <Route exact path="/product/save/:pid" component={ProductSave}/>
        <Route exact path="/product/detail/:pid" component={ProductDetail}/>
        <Redirect exact from="/product" to="/product/index"/>
      </Switch>
    )
  }
}
export default ProductRouter