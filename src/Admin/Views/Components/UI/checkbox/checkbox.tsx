import React from 'react';
import { IProps } from './../../../Types/index.d';

const Checkbox = (props:IProps) => {
    return (
        <div className="toggle">
            <label>
                {props.label}
                <input type="checkbox"/>
                <span className="button-indecator"></span>
            </label>
        </div>
    );
}

export default Checkbox;
