import React from 'react'
import FileUpload from './react-fileupload.jsx'

class FileUploader extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){
    const options={
      baseUrl:'/manage/product/upload.do',
      fileFieldName: 'upload_file',
      dataType: 'json',
      chooseAndUpload: true,
      uploadSuccess: (res) => {
        this.props.onSuccUpload(res.data)
      },
      uploadError: (err) => {
        this.props.onErrorUpload(err)
      } 
    }
    /*Use FileUpload with options*/
    /*Set two dom with ref*/
    return (
      <FileUpload options={options}>
        <button ref="chooseAndUpload">请选择图片</button>
      </FileUpload>
    )	        
  }
}

export default FileUploader