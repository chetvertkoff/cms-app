import React from 'react';
import { IProps } from './../../../Types/index.d';

const TextInput = (props:IProps) => {
    
    return (
        <div className="form-group">
            <label className="control-label">{props.label}</label>
            <input type="text" defaultValue={props.value} className="form-control"/>
        </div>
    );
}

export default TextInput;
