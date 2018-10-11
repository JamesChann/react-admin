import MUtil from 'util/mm.jsx'

const _mm = new MUtil()

class Product {
  // 得到商品信息，根据分页
  getProductList(params) {
    let url = ''
    let data = {}
    if (params.listType === 'list') {
      url = '/manage/product/list.do'
      data.pageNum = params.pageNum
    } else if (params.listType === 'search') {
      url = '/manage/product/search.do'
      data.pageNum = params.pageNum
      data[params.searchType] = params.keywords
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    })
  }

  // 设置产品上下架状态
  setProductStatus(productID, newStatus) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: {
        productId: productID,
        status: newStatus
      }
    })
  }
}

export default Product;