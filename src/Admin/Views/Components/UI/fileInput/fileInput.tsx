import React from 'react';
import xhr from './../../../lib/xhr';

const FileInput = (props) => {

  const file = (e)=>{
    const file = e.target.files[0]
    const data = new FormData() 
    data.append('avatar', file)

    xhr('POST','/api/upload/avatar', data, false)
      .then(av=>{
        props.getAvatar(JSON.parse(av.response).avatar)
      })
  }

  return (
    <label htmlFor="file-input" className="btn btn-primary btn-sm file-input">
      <i className="fa fa-upload" aria-hidden="true"></i>
      Загрузить
      <input name="avatar" onChange={file} type="file"/>
    </label>
  );
}

export default FileInput;
