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

class ProductSave extends React.Component{
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

  // 以下添加页面部分
  SelectCategory(categoryId, parentCategoryId) {
    this.setState({
      categoryId,
      parentCategoryId
    })
  }

  // 上传成功回调方法
  succUpload(res) {
    let subImg = this.state.subImage
    subImg.push(res)
    this.setState({
      subImage: subImg
    })
  }

  // 上传失败回调方法
  errorUpload(err) {
    _mm.errorTips(errMsg);
  }

  // 点击删除上传待选图片
  onImageDelete(e, selectImgIndex) {
    let subImgs = this.state.subImage
    subImgs.splice(selectImgIndex, 1)
    this.setState({
      subImage: subImgs
    })
  }

  // 富文本编辑器的变化
  onDetailValueChange(value) {
    this.setState({
      detail: value
    })
  }

  // 处理普通字段
  onCommonInput(e) {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
  }

  // 将图片数组转换成字符串
  getSubStringImg() {
    let subImgs = this.state.subImage
    return subImgs.map(img => img.uri).join(',')
  }

  // 点击上传提交商品信息
  onSubmitInfo() {
    let product = {
      categoryId: parseInt(this.state.categoryId),
      name: this.state.name,
      subtitle: this.state.subtitle,
      subImages: this.getSubStringImg(),
      detail: this.state.detail,
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      status: this.state.status
    }
    let result = _product.checkProduct(product)
    if(this.state.id){
      product.id = this.state.id
    }
    if (result.status) {
      _product.saveProduct(product).then((res) => {
        _mm.successTips(res.data)
        this.props.history.push('/product/index')
      }, (err) => {
        _mm.errorTips(err.data)
      })
    } else {
      _mm.errorTips(result.msg)
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <div id="page-inner">
          <PageTitle title={this.state.id ? '编辑商品' : '添加商品'} />
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-md-2 control-label">商品名称</label>
              <div className="col-md-4">
                <input type="text"
                       name="name"
                       className="form-control" 
                       placeholder="请输入商品名称"
                       value={this.state.name}
                       onChange={(e)=> {this.onCommonInput(e)}}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品描述</label>
              <div className="col-md-4">
                <input type="text"
                       name="subtitle"
                       className="form-control" 
                       placeholder="请输入商品描述"
                       value={this.state.subtitle}
                       onChange={(e)=> {this.onCommonInput(e)}}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">所属分类</label>
              <CateSelector onSelectCategory={(categoryId, parentCategoryId)=> {this.SelectCategory(categoryId, parentCategoryId)}} 
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
                       onChange={(e)=> {this.onCommonInput(e)}}
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
                       onChange={(e)=> {this.onCommonInput(e)}}
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
                        <i className="fa fa-close save-img-delete" onClick={(e, selectImgIndex)=> {this.onImageDelete(e, index)}}></i>
                        <img className="save-img-cont" src={image.url} alt=""/>
                      </div>
                    )
                  })
                }
                <FileUploader onSuccUpload={(res)=> {this.succUpload(res)}} 
                              onErrorUpload={(err)=> {this.errorUpload(err)}}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品详情</label>
              <div className="col-md-10">
                <RichEditor onValueChange={(value) => this.onDetailValueChange(value)} 
                            detail={this.state.detail}
                            defaultDetail={this.state.defaultDetail}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="submit" className="btn btn-primary" onClick={()=> {this.onSubmitInfo()}}>添加</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProductSave