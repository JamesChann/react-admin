import React from 'react'
import MUtil from 'util/mm.jsx'
import Product from 'api/product-server.jsx'

const _mm = new MUtil()
const _product = new Product()

class CateSelector extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      firstCategoryId: 0,
      firstCategoryList: [],
      secondCategoryId: 0,
      secondCategoryList: []
    }
  }

  componentDidMount() {
    this.loadFirstCateList()
  }

  // 加载一级分类列表
  loadFirstCateList() {
    _product.getCategoryList().then((res) => {
      this.setState({
        firstCategoryList: res
      })
    })
  }

  // 加载二级分类列表
  loadSecondCateList() {
    _product.getCategoryList(this.state.firstCategoryId).then((res) => {
      this.setState({
        secondCategoryList: res
      })
    })
  }

  // 选择一级分类获取一级Id
  onSelectFirstCateId(e) {
    this.setState({
      firstCategoryId: e.target.value
    }, ()=> {
      this.loadSecondCateList()
      this.emitParentCateId()
    })
  }

  // 选择二级分类获取二级Id
  onSelectSecondCateId(e) {
    this.setState({
      secondCategoryId: e.target.value
    }, () => {
      this.emitParentCateId()
    })
  }

  // 传递给父组件分类ID
  emitParentCateId() {
    if (this.state.secondCategoryId) {
      this.props.onSelectCategory(this.state.secondCategoryId, this.state.firstCategoryId)
    } else {
      this.props.onSelectCategory(this.state.firstCategoryId, 0)
    }
  }

  render() {
    return (
      <div className="select-wrapper">
        <div className="col-md-4">
          <select name="" className="form-control" onChange={(e) => {this.onSelectFirstCateId(e)}}>
            <option value="">请选择一级分类</option>
            {
              this.state.firstCategoryList.map((category, index) => {
                return (
                  <option value={category.id} key={index}>{category.name}</option>
                )
              })
            }
          </select>
        </div>
        {
          this.state.secondCategoryList.length ? 
              (<div className="col-md-4">
                <select name="" className="form-control" onChange={(e) => {this.onSelectSecondCateId(e)}}>
                  <option value="">请选择二级分类</option>
                  {
                    this.state.secondCategoryList.map((category, index) => {
                      return (
                        <option value={category.id} key={index}>{category.name}</option>
                      )
                    })
                  }
                </select>
              </div>) : null
        }
      </div>
    )
  }
}
export default CateSelector