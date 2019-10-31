import React from 'react';
import { IProps } from './../../../Types/index.d';
import { NavLink } from 'react-router-dom';

const PageItem = (props:IProps) => {
    if(props.item && props.item != undefined){
        return (
            <div style={{marginBottom:"10px"}} className="col-md-12 row tile-title-w-btn text-black bg-light page-item">
                {
                    props.item.isFolder ? (
                        <NavLink exact to={'/page/'+props.item.id}>
                            <i className="icon fa fa-folder-o"></i><span>{props.item.id}</span>
                        </NavLink>
                    ) : (
                        <NavLink exact to={'/update/'+props.item.id}>
                            <i className="icon fa fa-file-text-o"></i><span>{props.item.id}</span>
                        </NavLink>
                    ) 
                }
                <div className="col-md-4 title-wrap">
                    {props.item.isFolder ? (
                        <NavLink exact to={'/page/'+props.item.id}>
                            {props.item.title}
                        </NavLink>
                    ) : (
                        <NavLink to={'/update/'+props.item.id}>
                            {props.item.title}
                        </NavLink>
                    ) }
                </div>
                <div className="col-md-4 title-alias">
                    {
                        props.item.alias ? 
                        <NavLink to={props.item.alias}>
                            {props.item.alias}
                        </NavLink> : null
                    }
                </div>
                <div className="col-md-3">
                    <div className="btn-group pull-right">
                        <NavLink className="btn btn-primary" to={'/update/'+props.item.id}>
                            <i className="fa fa-lg fa-edit"></i>
                        </NavLink>
                        <a href="#" className="btn btn-primary"><i className="fa fa-lg fa-trash"></i></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageItem;
