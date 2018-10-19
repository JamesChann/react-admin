import React from 'react';

// 商品列表页搜索组件
class ListSearch extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      orderNumber: ''
    }
  }

  // 监听选择框和输入框的改变
  onValueChange(e) {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [name]: value
    })
  }

  // 键盘回车提交搜索
  onValueChangeKey(e) {
    if (e.keyCode === 13) {
      this.onSearch()
    }
  }

  // 按下搜索按钮提交搜索结果
  onSearch() {
    this.props.onSearchList(this.state.orderNumber)
  }

  render(){
    return (
      <div className="search-wrap">
        <div className="row">
          <div className="col-md-12">
            <div className="form-inline">
              <div className="form-group">
                <select className="form-control" 
                        name="searchType"
                >
                  <option value="">按订单号查询</option>
                </select>
              </div>
              <div className="form-group">
                <input type="text"
                       className="form-control" 
                       placeholder="请输入搜索订单号"
                       name="orderNumber"
                       onChange={(e) => {this.onValueChange(e)}}
                       onKeyUp={(e) => {this.onValueChangeKey(e)}}
                />
              </div>
              <button className="btn btn-primary" onClick={()=> {this.onSearch()}}>搜索</button>
            </div>
          </div>
        </div>
      </div>
      )
  }
}

export default ListSearch;