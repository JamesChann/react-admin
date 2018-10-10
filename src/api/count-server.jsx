import MUtil from 'util/mm.jsx'

const _mm = new MUtil()

class Count {
  countData() {
    return _mm.request({
      url: '/manage/statistic/base_count.do'
    })
  }
}

export default Count