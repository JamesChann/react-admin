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
      subImage: [],
      status: 1
    }
  }

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
      name: this.state.subname,
      subtitle: this.state.subdesc,
      subImages: this.getSubStringImg(),
      detail: this.state.detail,
      price: parseFloat(this.state.subprice),
      stock: parseInt(this.state.substore),
      status: this.state.status
    }
    let result = _product.checkProduct(product)
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
          <PageTitle title="添加商品" />
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-md-2 control-label">商品名称</label>
              <div className="col-md-4">
                <input type="text"
                       name="subname"
                       className="form-control" 
                       placeholder="请输入商品名称"
                       onChange={(e)=> {this.onCommonInput(e)}}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品描述</label>
              <div className="col-md-4">
                <input type="text"
                       name="subdesc"
                       className="form-control" 
                       placeholder="请输入商品描述"
                       onChange={(e)=> {this.onCommonInput(e)}}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">所属分类</label>
              <CateSelector onSelectCategory={(categoryId, parentCategoryId)=> {this.SelectCategory(categoryId, parentCategoryId)}} />
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品价格</label>
              <div className="input-group col-md-2" id="save-price">
                <input type="number"
                       name="subprice"
                       className="form-control" 
                       placeholder="价格"
                       onChange={(e)=> {this.onCommonInput(e)}}
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">商品库存</label>
              <div className="input-group col-md-2" id="save-price">
                <input type="number"
                       name="substore"
                       className="form-control" 
                       placeholder="库存"
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
                <RichEditor onValueChange={(value) => this.onDetailValueChange(value)} />
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