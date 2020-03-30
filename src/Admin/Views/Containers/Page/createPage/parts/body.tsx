import React, { useState, useEffect } from 'react';

import { IProps } from './../../../../Types/index.d';
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditor from 'react-froala-wysiwyg';


const Body = (props:IProps) => {
    const [model, setModel] = useState<string>(props.defaultValue)
    const [pageId, setPageId] = useState<number>(props.id)
    
    useEffect(()=>{
        if(props.id != pageId){
            setPageId(props.id)
            setModel(props.defaultValue)
        }
    })

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
                    imageUploadURL: '/api/upload/image'
                  }}
            />
            <br/>
        </div>
    );
}

export default Body;
