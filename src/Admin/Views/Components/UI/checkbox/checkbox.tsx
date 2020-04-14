import React from 'react';
import { IProps } from './../../../Types/index.d';

const Checkbox = (props:IProps) => {
    return (
        <div className="toggle">
            <label className="control-label">
                {props.label}
                {
                    props.toggleCheck ? 
                        props.checked ? 
                        <input checked={true} onChange={(e)=>{}} onClick={()=>{props.toggleCheck(props.label)}} type="checkbox"/>
                        :
                        <input checked={false} onChange={(e)=>{}} onClick={()=>{props.toggleCheck(props.label)}} type="checkbox"/>
                    :
                        props.checked ? 
                        <input checked={true} onChange={(e)=>{}} onClick={()=>{props.toggleCheck(props.label)}} type="checkbox"/>
                        :
                        <input checked={false} onChange={(e)=>{}} type="checkbox"/>
                }
                <span className="button-indecator"></span>
            </label>
        </div>
    );
}

export default Checkbox;
