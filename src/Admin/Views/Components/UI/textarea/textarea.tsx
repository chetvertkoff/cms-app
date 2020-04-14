import React from 'react';
import { IProps } from './../../../Types/index.d';

const Textarea = (props:IProps) => {
    return (
        <div className="form-group">
            <label className="control-label">
                {props.label}
            </label>
            <textarea className="form-control" ></textarea>
        </div>
    );
}

export default Textarea;
