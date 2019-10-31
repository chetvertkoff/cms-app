import React from 'react';
import CrumbItem from './crumbItem/crumbItem';
import { IProps } from 'Admin/Views/Types';


const Crumbs = (props:IProps) => {

    
    return (
        <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
            <li className="breadcrumb-item">{props.title}</li>
            {/* <CrumbItem  /> */}
        </ul>
    );
}

export default Crumbs;
