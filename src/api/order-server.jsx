import MUtil from 'util/mm.jsx'

const _mm = new MUtil()

class Order {
  // 得到订单信息，根据分页
  getOrderList(params) {
    let url = ''
    let data = {}
    if (params.listType === 'list') {
      url = '/manage/order/list.do'
      data.pageNum = params.pageNum
    } else if (params.listType === 'search') {
      url = '/manage/order/search.do'
      data.pageNum = params.pageNum
      data.orderNo = params.orderNo;
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    })
  }
  // 获取订单详情
  getOrderDetail(orderNumber) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/detail.do',
      data: {
        orderNo: orderNumber
      }
    });
  }
  sendGoods(orderNumber) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/send_goods.do',
      data: {
        orderNo: orderNumber
      }
    });
  }

}

export default Order;