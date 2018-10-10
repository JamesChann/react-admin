import React from 'react'

class PageTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    document.title = this.props.title
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 style={{'marginBottom': '30px'}}>{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default PageTitle