import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import { Link } from 'react-router-dom'
import Pagination from 'util/pagination/index.jsx'
import TableList from 'util/table-list/index.jsx'
import MUtil from 'util/mm.jsx'
import User from 'api/user-server.jsx'

const _mm = new MUtil()
const _user = new User()

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      firstLoad: true
    }
  }

  componentDidMount() {
    this.loadUserList()
  }

  loadUserList() {
    _user.getUserList(this.state.pageNum).then((res) => {
      this.setState(res, () => {
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

  // 点击跳转分页方法
  onJumpPage(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList()
    })
  }

  render() {
    let tableHeaderList = ['ID', '用户名', '邮箱', '电话', '注册时间']
    return (
      <div id="page-wrapper">
        <div id="page-inner">
          <PageTitle title="用户列表"/>
          <TableList tableHeader={tableHeaderList} tableBodyList={this.state.list}>
            {
              this.state.list.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                  </tr>
                )
              })
            }
          </TableList>
          {/* <div className="row">
            <div className="col-md-12">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>用户名</td>
                    <td>邮箱</td>
                    <td>电话</td>
                    <td>注册时间</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.list.length > 0 ?
                      this.state.list.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{new Date(user.createTime).toLocaleString()}</td>
                          </tr>
                        )
                      }) : <tr><td colSpan="5" className="text-center">
                        {
                          this.state.firstLoad ? '正在加载...' : '没有找打相关的数据'
                        }
                      </td></tr>
                  }
                </tbody>
              </table>
            </div>
          </div> */}
          <Pagination current={this.state.pageNum} 
                      total={this.state.total} 
                      onChange={(pageNum) => this.onJumpPage(pageNum)}
          />
        </div>
      </div>
    )
  }
}

export default UserList