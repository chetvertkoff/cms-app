import React from 'react';
import { IProps } from './../../../../Types/index.d'

const Crumbs=(props:IProps)=>{
    var path:string
    if(props.pages && props.pages[0].path !='null'){
        path = props.pages[0].path.replace(/\//g, " / ")
    }
     
    return (
        <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
            {
                props.pages && props.pages[0].path !='null' ?  
                <li className="breadcrumb-item">{`/ ${props.title} / ${path}`}</li> 
                :
                <li className="breadcrumb-item">{`/ ${props.title}`}</li>
            }
        </ul>
    )
}

export default Crumbs
