import MUtil from 'util/mm.jsx'

const _mm = new MUtil()

class Product {
  // 得到商品信息，根据产品id
  getProductIdInfo(productId) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/detail.do',
      data: {
        productId: productId
      }
    })
  }


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

  // 提交前验证检查产品信息字段
  checkProduct(product) {
    // 判断商品名称是否为空
    if(typeof product.name !== 'string' || product.name.length ===0){
      return {
          status: false,
          msg: '商品名称不能为空！'
      }
    }
    // 判断描述不能为空
    if(typeof product.subtitle !== 'string' || product.subtitle.length ===0){
        return {
            status: false,
            msg: '商品描述不能为空'
        }
    }
    // 验证品类ID
    if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
      return {
          status: false,
          msg: '请选择商品品类！'
      }
    }
    // 判断商品价格为数字，且大于0
    if(typeof product.price !== 'number' || !(product.price >= 0)){
      return {
          status: false,
          msg: '请输入正确的商品价格！'
      }
    }
    // 判断库存为数字，且大于或等于0
    if(typeof product.stock !== 'number' || !(product.stock >= 0)){
      return {
          status: false,
          msg: '请输入正确的库存数量！'
      }
    }
    return {
        status : true,
        msg : '验证通过'
    }
  }

  // 提交商品信息新增商品
  saveProduct(product) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: product
    })
  }

  /*
    商品二级分类联动（添加商品页面）
  */
  // 根据父选择ID加载列表
  getCategoryList(parentId) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: parentId || 0
      }
    })
  }

}

export default Product;