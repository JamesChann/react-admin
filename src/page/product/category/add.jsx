import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import { Link } from 'react-router-dom'
import TableList from 'util/table-list/index.jsx'
import MUtil from 'util/mm.jsx'
import Product from 'api/product-server.jsx'

const _mm = new MUtil()
const _product = new Product()

class CategoryAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      parentId: 0,
      categoryList: [],
      categoryName: '',
      firstLoad: true
    }
  }

  componentDidMount() {
    this.loadCategoryList()
  }

  loadCategoryList() {
    _product.getCategoryList().then((res) => {
      this.setState({
        categoryList: res
      }, () => {
        this.setState({
          firstLoad: false
        })
      })
    }, (errMsg) => {
      _mm.errorTips(errMsg)
    })
  }

  onCommonInput(e) {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
  }

  onSubmitInfo() {
    let cateName = this.state.categoryName
    if (cateName) {
      _product.saveCategory({
        parentId: this.state.parentId,
        categoryName: cateName
      }).then((res) => {
        _mm.successTips(res.msg)
        this.props.history.push('/product-category/index')
      }, err => {
        _mm.errorTips(err.msg)
      })
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <div id="page-inner">
          <PageTitle title="添加品类"/>
          <div className="row">
            <div className="col-md-12">
              <div className="form-horizontal">
                <div className="form-group">
                  <label className="col-md-2 control-label">所属品类</label>
                  <div className="col-md-4">
                    <select name="parentId" className="form-control" onChange={(e)=> {this.onCommonInput(e)}}>
                      <option value="0">根品类</option>
                      {
                        this.state.categoryList.map((category, index) => {
                          return (
                            <option value={category.id} key={index}>{category.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-2 control-label">添加品类</label>
                  <div className="col-md-4">
                    <input type="text"
                          name="categoryName"
                          className="form-control" 
                          placeholder="请输入品类名称"
                          onChange={(e)=> {this.onCommonInput(e)}}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-offset-2 col-md-10">
                    <button type="submit" className="btn btn-primary" onClick={()=> {this.onSubmitInfo()}}>保存</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryAdd