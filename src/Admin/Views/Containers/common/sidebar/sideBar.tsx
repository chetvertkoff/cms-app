import React, { Component } from 'react';
import UserInfo from './userInfo/userInfo';
import Menu from './menu/menu';

export const SideBar=(props)=>{    
    return (
        <aside className="app-sidebar">
            <UserInfo />
            <Menu isAuth={props.isAuth}  />
        </aside>
    );
}



export default SideBar;
