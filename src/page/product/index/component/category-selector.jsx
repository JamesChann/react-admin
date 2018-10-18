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

  // 如果是编辑页面，初始化该编辑产品分类
  componentWillReceiveProps(nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId
    let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
    if (!categoryIdChange && !parentCategoryIdChange) {
      return
    }
    // 如果只有一级分类
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0
      })
    }
    // 如果有两个分类
    else {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId
      }, ()=> {
        this.loadSecondCateList()
      })
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
    if (!this.props.onSelectCategory) {
      return
    }
    this.setState({
      firstCategoryId: e.target.value
    }, ()=> {
      this.loadSecondCateList()
      this.emitParentCateId()
    })
  }

  // 选择二级分类获取二级Id
  onSelectSecondCateId(e) {
    if (!this.props.onSelectCategory) {
      return
    }
    this.setState({
      secondCategoryId: e.target.value
    }, () => {
      this.emitParentCateId()
    })
  }

  // 传递给父组件分类ID
  emitParentCateId() {
    if (!this.props.onSelectCategory) {
      return
    }
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
          <select readOnly={this.props.ReadOnly} name="" className="form-control" value={this.state.firstCategoryId} onChange={(e) => {this.onSelectFirstCateId(e)}}>
            <option value=''>请选择一级分类</option>
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
                <select name="" readOnly={this.props.ReadOnly} className="form-control" value={this.state.secondCategoryId} onChange={(e) => {this.onSelectSecondCateId(e)}}>
                  <option value=''>请选择二级分类</option>
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