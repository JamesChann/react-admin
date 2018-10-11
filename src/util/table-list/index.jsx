import React from 'react'
import { Link } from 'react-router-dom'

// 通用列表表格组件
class TableList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isFirstLoad: true
    }
  }

  componentWillReceiveProps() {
    this.setState({
      isFirstLoad: false
    })
  }

  render(){
    let tableNoProInfo = <tr><td colSpan={this.props.tableHeader.length} className="text-center">
                            {
                              this.state.isFirstLoad ? '正在加载...' : '没有找打相关的数据'
                            }
                          </td></tr>

    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {
                  this.props.tableHeader.map((thList, index) => {
                    if (typeof thList === 'object') {
                      return (<td key={index} width={thList.width}>{thList.name}</td>)
                    } else if (typeof thList === 'string') {
                      return (<td key={index}>{thList}</td>)
                    }
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                this.props.tableBodyList.length > 0 ? this.props.children : tableNoProInfo
              }
            </tbody>
          </table>
        </div>
      </div>
      )
  }
}

export default TableList