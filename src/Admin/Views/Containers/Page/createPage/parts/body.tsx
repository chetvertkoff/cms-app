import React from 'react';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
import { IProps } from './../../../../Types/index.d';

const Body = (props:IProps) => {

    const sendContent = (value)=>{
        props.getFromTextEditor(value)
    }

    return (
        <div className="col-md-12">
            <label className="control-label">Описание</label>
            {
                props.defaultValue ? 
                <JoditEditor
                    value={props.defaultValue}
                    onChange={sendContent}
                />
                :
                <JoditEditor
                    onChange={sendContent}
                />
            }
            <br/>
        </div>
    );
}

export default Body;
