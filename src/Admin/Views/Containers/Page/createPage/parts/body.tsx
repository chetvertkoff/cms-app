import React from 'react';

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

    const sendContent = (text:string)=>{
      console.log(text);
      
      props.getFromTextEditor(text)
    }

    return (
        <div className="col-md-12">
            <label className="control-label">Описание</label>
            <FroalaEditor
                tag='textarea'
                config={{
                    events: {
                        'blur': function () {
                          console.log('1');
                          
                          sendContent(document.querySelector('.fr-view').innerHTML)
                        }
                      },
                    imageUploadURL: '/api/upload_image',
                      toolbarButtons:{
                        moreRich: {
                            buttons: [
                              "insertLink",
                              "insertImage",
                              "insertVideo",
                              "insertTable",
                              "emoticons",
                              "fontAwesome",
                              "specialCharacters",
                              "embedly",
                              "insertFile",
                              "insertHR"
                            ]
                          }
                      }
                  }}
            />
            <br/>
        </div>
    );
}

export default Body;
