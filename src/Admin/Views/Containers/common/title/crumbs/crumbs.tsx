import React from 'react';
import { IProps } from './../../../../Types/index.d'

const Crumbs=(props:IProps)=>{
    var path:string
    var currentPage

    if (props.pages) {
        currentPage = props.pages.filter(i=>i.id==props.match.params.ids)
    }
    if(props.pages && props.pages.length >=1 && props.pages[0]){

        if (currentPage && currentPage[0] && currentPage[0].path == 'null') {
            if (currentPage[0].isFolder) {
                path = `/ ${props.title} / ${currentPage[0].title} `   
            }else{
                path = `/ ${props.title} ` 
            }
        }else{
            if (currentPage && currentPage[0] && currentPage[0].isFolder) {
                path = `/ ${props.title} / ${currentPage[0].path} / ${currentPage[0].title}`
            }else{
                path = `/ ${props.title} / ${props.pages[0].path} / ${props.pages[0].title}`
            }
        }
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
                    props.pages && props.pages.length >=1  &&  
                    <li className="breadcrumb-item">{path}</li> 
            }
        </ul>
    )
}

export default Crumbs
