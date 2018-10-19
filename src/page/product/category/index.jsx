import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import { Link } from 'react-router-dom'
import TableList from 'util/table-list/index.jsx'
import MUtil from 'util/mm.jsx'
import Product from 'api/product-server.jsx'

const _mm = new MUtil()
const _product = new Product()

class CategoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      parentCategoryId: this.props.match.params.categoryId,
      list: [],
      firstLoad: true
    }
  }

  componentDidMount() {
    this.loadCategoryList()
  }

  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then((res) => {
      this.setState({
        list: res
      }, () => {
        this.setState({
          firstLoad: false
        })
      })
    }, (errMsg) => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname
    let newPath = this.props.location.pathname
    let newId = this.props.match.params.categoryId || 0
    if(oldPath !== newPath) {
      this.setState({
        parentCategoryId: newId
      }, () => {
        this.loadCategoryList()
      })
    }
  }

  // 更新修改
  onUpdateName(categoryId, categoryName) {
    let newName = window.prompt('请输入新的品类名称', categoryName)
    if (newName) {
      _product.updateCategoryName({
        categoryId: categoryId,
        categoryName : newName
      }).then(res => {
          _mm.successTips(res);
          this.loadCategoryList();
      }, errMsg => {
          _mm.errorTips(errMsg);
      });
    }
  }

  render() {
    let tableHeaderList = ['品类ID', '品类名称', '操作']
    return (
      <div id="page-wrapper">
        <div id="page-inner">
          <PageTitle title="品类列表">
            <Link to="/product-category/add" className="savebtn-wrapper">
              <button className="btn btn-primary">
                <i className="fa fa-plus"></i>
                <span>添加品类</span>
              </button>
            </Link>
          </PageTitle>
          <TableList tableHeader={tableHeaderList} tableBodyList={this.state.list}>
            {
              this.state.list.map((category, index) => {
                return (
                  <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                      <a className="opera"
                         onClick={(e)=> this.onUpdateName(category.id, category.name)}
                      >修改名称</a>
                      {
                        category.parentId === 0 ?
                        <Link to={`/product-category/index/${category.id}`}>查看子品类</Link> :
                        null
                      }
                    </td>
                  </tr>
                )
              })
            }
          </TableList>
        </div>
      </div>
    )
  }
}

export default CategoryList