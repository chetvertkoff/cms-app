import React, { useState } from 'react';

import { IProps } from './../../../../Types/index.d';
// import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
// import "froala-editor/js/third_party/embedly.min.js";
// import "froala-editor/js/plugins/fullscreen.min.js"

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/css/third_party/embedly.min.css";
import FroalaEditor from 'react-froala-wysiwyg';


const Body = (props:IProps) => {
    const [model, setModel] = useState<string>(props.defaultValue)

    const handleModel=(text:string):void=>{
      setModel(text)
      props.getFromTextEditor(text)
    } 

    return (
        <div className="col-md-12" id="editor">
            <label className="control-label">Описание</label>
            <FroalaEditor
                model = {model}
                tag='textarea'
                onModelChange = {(text)=>{handleModel(text)}}
                config={{
                    imageUploadURL: '/api/upload_image'
                  }}
            />
            <br/>
        </div>
    );
}

export default Body;
