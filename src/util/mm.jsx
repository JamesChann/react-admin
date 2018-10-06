class MUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: res => {
          // 数据请求成功
          if (res.status === 0) {
            typeof resolve === 'function' && resolve(res.data, res.msg)
          }
          // 没有登陆，则跳转到登陆页
          else if (res.status === 10) {
            this.doLogin()
          }
          else {
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error: err => {
          typeof reject === 'function' && reject(err.statusText)
        }
      });
    })
  }

  // 跳转登陆
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
  }

  // 获取URL参数
  getUrlParam(name) {
    // param=123&param1=456
    let queryString = window.location.search.split('?')[1] || '',
    reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
    result      = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }

  // 错误提示
  errorTips(errMsg) {
    alert(errMsg || '出了错误！')
  }
}

export default MUtil