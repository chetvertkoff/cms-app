import React from 'react';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
import { IProps } from './../../../../Types/index.d';

const config = {
    readonly: false
};

const Body = (props:IProps) => {

    const sendContent = (value)=>{
        props.getFromTextEditor(value)
    }


    return (
        <div className="col-md-12">
            <label className="control-label">Описание</label>
            <JoditEditor
                onChange={sendContent}
                config={config}
                value={props.defaultValue || ''}
            />
            <br/>
        </div>
    );
}

export default Body;
