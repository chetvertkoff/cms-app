import React from 'react';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
import { IProps } from './../../../../Types/index.d';

const Body = (props:IProps) => {

    const sendContent = (value)=>{
        console.log(value);
        
    }

    return (
        <div className="col-md-12">
            <label className="control-label">Описание</label>
             <JoditEditor
            	// editorRef={this.setRef}
                // value={this.state.content}
                // config={this.config}
                onBlur={sendContent}
            />
            <br/>
        </div>
    );
}

export default Body;
