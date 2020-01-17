import React from 'react';
import { IProps } from './../../../../Types/index.d'

const Crumbs=(props:IProps)=>{
    var path:string

    if(props.pages && props.pages.length >=1 && props.pages[0].path &&  props.pages[0].path !='null'){
        path = props.pages[0].path.replace(/\//g, " / ")
    }

    if(props.path){
        path = props.path.replace(/\//g, " / ")
    }

     
    return (
        <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
            {
                props.path ? 
                    props.path !='null' ?
                        <li className="breadcrumb-item">{`/ ${path} / ${props.title}`}</li> 
                    :
                        <li className="breadcrumb-item">{`/ Страницы / ${props.title}`}</li> 
                :
                    props.pages && props.pages.length >1 && props.pages[0].path !='null' ?  
                    <li className="breadcrumb-item">{`/ ${props.title} / ${path}`}</li> 
                    :
                        props.pages ?
                        <li className="breadcrumb-item">{`/ ${props.title} / ${props.pages[0].path} / ${props.pages[0].title}`}</li>
                        :
                        <li className="breadcrumb-item">{`/ ${props.title}`}</li>
            }
        </ul>
    )
}

export default Crumbs
