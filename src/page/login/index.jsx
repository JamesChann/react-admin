import React from 'react'
import MUtil from 'util/mm.jsx'
import User from 'api/user-server.jsx'

const _mm = new MUtil()
const _user = new User()

import './index.scss'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: _mm.getUrlParam('redirect') || ''
    }
  }

  componentWillMount(){
    document.title = '登录';
  }

  // 当用户名发生改变
  onInputChange(e) {
    let inputValue = e.target.value
    let inputType = e.target.name
    this.setState({
      [inputType]: inputValue,
    })
  }

  // 当用户在键盘抬起时按回车调用提交onLogin
  onInputKeyUp(e){
    if(e.keyCode === 13){
        this.onLogin();
    }
  }

  // 当用户进行点击登陆按钮提交表单
  onLogin() {
    let loginInfo = {
      username : this.state.username,
      password : this.state.password
    },
    checkResult = _user.checkLoginInfo(loginInfo);
    // 验证通过
    if(checkResult.status){
      _user.login(loginInfo).then((res) => {
          this.props.history.push(this.state.redirect);
      }, (errMsg) => {
          _mm.errorTips(errMsg);
      });
    }
    // 验证不通过
    else{
      _mm.errorTips(checkResult.msg);
    }
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登陆 - JamesChan 管理系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input type="email"
                       name="username"
                       className="form-control" 
                       placeholder="请输入用户名"
                       onChange={(e) => {this.onInputChange(e)}}
                       onKeyUp={e => this.onInputKeyUp(e)}
                />
              </div>
              <div className="form-group">
                <input type="password"
                       name="password"
                       className="form-control" 
                       placeholder="请输入密码"
                       onChange={(e) => {this.onInputChange(e)}}
                       onKeyUp={e => this.onInputKeyUp(e)}
                />
              </div>
              <button className="btn btn-lg btn-primary btn-block"
                      onClick={() => {this.onLogin()}}
              >
                登陆
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
