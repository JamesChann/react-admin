import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import ListSearch   from './index-list-search.jsx';
import { Link } from 'react-router-dom'
import Pagination from 'util/pagination/index.jsx'
import TableList from 'util/table-list/index.jsx'
import MUtil from 'util/mm.jsx'
import Order from 'api/order-server.jsx'

const _mm = new MUtil()
const _order = new Order()

class OrderList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list'
    }
  }

  componentDidMount() {
    this.loadOrderList()
  }

  loadOrderList() {
    let paramsInfo = {}
    paramsInfo.pageNum = this.state.pageNum
    paramsInfo.listType = this.state.listType
    if (this.state.listType === 'search') {
      paramsInfo.orderNo = this.state.orderNumber
    }
    _order.getOrderList(paramsInfo).then((res) => {
      this.setState(res)
    }, (errMsg) => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg)
    })
  }

  onSearchOrderList(orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search'
    this.setState({
      listType,
      pageNum: 1,
      orderNumber: orderNumber
    }, () => {
      this.loadOrderList()
    })
  }

  // 点击跳转分页方法
  onJumpPage(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadOrderList()
    })
  }

  render() {
    let tableHeaderList = ['订单号', '收件人', '订单状态', '订单总价', '创建时间', '操作']
    return (
      <div id="page-wrapper">
        <div id="page-inner">
          <PageTitle title="订单列表" />
          <ListSearch onSearchList={(orderNumber)=> {this.onSearchOrderList(orderNumber)}} />
          <TableList tableHeader={tableHeaderList} tableBodyList={this.state.list}>
            {
              this.state.list.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order.orderNo}</td>
                    <td>{order.receiverName}</td>
                    <td>{order.statusDesc}</td>
                    <td>￥{order.payment}</td>
                    <td>{order.createTime}</td>
                    <td>
                      <Link to={ `/order/detail/${order.orderNo}` }>详情</Link>
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

export default OrderList