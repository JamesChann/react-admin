import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import CateSelector from './component/category-selector.jsx'
import FileUploader from 'util/file-uploader/index.jsx'
import RichEditor from 'util/rich-editor/index.jsx'
import Product from 'api/product-server.jsx'
import MUtil from 'util/mm.jsx'

import './save.scss'

const _mm = new MUtil()
const _product = new Product()

class ProductDetail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      categoryId: 0,
      parentCategoryId: 0,
      subImage: [],
      price: '',
      stock: '',
      detail: '',
      status: 1
    }
  }

  // 编辑页面部分
  // 组件加载时根据id进行产品回填
  componentDidMount() {
    this.loadEditProPage()
  }


  loadEditProPage() {
    if (!this.state.id) {
      return;
    }
    _product.getProductIdInfo(this.state.id).then((res) => {
      let images = res.subImages.split(',')
      res.subImage = images.map((image) => {
        return {
          uri: image,
          url: res.imageHost + image
        }
      })
      res.defaultDetail = res.detail
      this.setState(res)
    })
  }

  // 将图片数组转换成字符串
  getSubStringImg() {
    let subImgs = this.state.subImage
    return subImgs.map(img => img.uri).join(',')
  }

  render() {
    return (
      <div id="page-wrapper">
        <div id="page-inner">
          <PageTitle title="商品详情" />
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-md-2 control-label">商品名称</label>
              <div className="col-md-4">
                <p className="form-control-static">{this.state.name}</p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品描述</label>
              <div className="col-md-4">
                <p className="form-control-static">{this.state.subtitle}</p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">所属分类</label>
              <CateSelector ReadOnly
                            categoryId = {this.state.categoryId}
                            parentCategoryId = {this.state.parentCategoryId}
              />
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品价格</label>
              <div className="input-group col-md-2" id="save-price">
                <input type="number"
                       name="price"
                       className="form-control" 
                       placeholder="价格"
                       value={this.state.price}
                       readOnly
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品库存</label>
              <div className="input-group col-md-2" id="save-price">
                <input type="number"
                       name="stock"
                       className="form-control" 
                       placeholder="库存"
                       value={this.state.stock}
                       readOnly
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品图片</label>
              <div className="col-md-4">
                {
                  this.state.subImage.map((image, index) => {
                    return (
                      <div className="save-img-wrapper" key={index}>
                        <img className="save-img-cont" src={image.url} alt=""/>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品详情</label>
              <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProductDetail