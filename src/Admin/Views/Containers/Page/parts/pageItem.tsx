import React, { useContext, useState, useMemo } from 'react';
import { IProps } from './../../../Types/index.d';
import { NavLink } from 'react-router-dom';
import { AlertContext } from './../../../Context/alert-context';

const PageItem = (props:IProps) => {
    const alert = useContext(AlertContext)
    
    const getPageId = (id:number)=>{
        alert.alert.toggleAlert(true)
        alert.id.setId(id)
    } 

    if(alert.delete.isDelete && alert.id.id === props.item.id){
        props.deletePage(props.item.id)
        alert.delete.deletePage(false)
        alert.alert.toggleAlert(false)
        alert.id.setId(null)
    }

    const memo = useMemo(() => {
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
                            <a  onClick={e=>{e.preventDefault; getPageId(props.item.id)}} className="btn btn-primary"><i className="fa fa-lg fa-trash"></i></a>
                        </div>
                    </div>
                </div>
            )
        }
        return null
    }, []) 

    return memo
}

export default PageItem;
