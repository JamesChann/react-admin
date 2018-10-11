import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import { Link } from 'react-router-dom'
import Pagination from 'util/pagination/index.jsx'
import TableList from 'util/table-list/index.jsx'
import SearchList from './component/search-list.jsx'
import MUtil from 'util/mm.jsx'
import Product from 'api/product-server.jsx'

import './index.scss'

const _mm = new MUtil()
const _product = new Product()

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list'
    }
  }

  componentDidMount() {
    this.loadProductList()
  }

  loadProductList() {
    let paramsInfo = {}
    paramsInfo.pageNum = this.state.pageNum
    paramsInfo.listType = this.state.listType
    if (this.state.listType === 'search') {
      paramsInfo.searchType = this.state.searchType
      paramsInfo.keywords = this.state.searchValue
    }
    _product.getProductList(paramsInfo).then((res) => {
      this.setState(res)
    }, (errMsg) => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg)
    })
  }

  onSearchProList(productType, productValue) {
    let listType = productValue === '' ? 'list' : 'search'
    this.setState({
      listType,
      pageNum: 1,
      searchType:　productType,
      searchValue: productValue
    }, () => {
      this.loadProductList()
    })
  }

  // 改变产品状态，上下架产品
  changeProStatus(e, productID, currentStatus) {
    let newStatus = currentStatus === 1 ? 2 : 1
    let msgTips = currentStatus === 1 ? '确认下架该产品吗？' : '确认上架该产品吗？'
    if (window.confirm(msgTips)) {
      _product.setProductStatus(productID, newStatus).then((res) => {
        _mm.successTips(res.data)
        this.loadProductList()
      }, (errMsg) => {
        _mm.errorTips(errMsg.data)
      })
    }
  }

  // 点击跳转分页方法
  onJumpPage(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadProductList()
    })
  }

  render() {
    let tableHeaderList = [
      {name: '商品ID', width: '10%'},
      {name: '商品信息', width: '50%'},
      {name: '价格', width: '10%'},
      {name: '状态', width: '15%'},
      {name: '操作', width: '15%'},
    ]
    return (
      <div id="page-wrapper">
        <div id="page-inner">
          <PageTitle title="商品列表"/>
          <SearchList onSearchList={(productType, productValue)=> {this.onSearchProList(productType, productValue)}} />
          <TableList tableHeader={tableHeaderList} tableBodyList={this.state.list}>
            {
              this.state.list.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>
                      <p>{product.name}</p>
                      <p>{product.subtitle}</p>
                    </td>
                    <td>￥{product.price}</td>
                    <td>
                      <p>{product.status === 1 ? '在售' : '下架'}</p>
                      <button className="btn btn-xs btn-warning" onClick={(e, productID, currentStatus)=> {this.changeProStatus(e, product.id, product.status)}}>
                        {
                          product.status === 1 ? '下架' : '上架'
                        }
                      </button>
                    </td>
                    <td>
                      <Link className="operation" to={`product/save/${product.id}`}>编辑</Link>
                      <Link className="operation" to={`product/detail/${product.id}`}>详情</Link>
                    </td>
                  </tr>
                )
              })
            }
          </TableList>
          <Pagination current={this.state.pageNum} 
                      total={this.state.total} 
                      onChange={(pageNum) => this.onJumpPage(pageNum)}
          />
        </div>
      </div>
    )
  }
}

export default ProductList