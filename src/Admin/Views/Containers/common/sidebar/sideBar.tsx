import React, { Component, useState } from 'react';
import UserInfo from './userInfo/userInfo';
import Menu from './menu/menu';

export const SideBar=(props)=>{  
    
    return (
        <aside className="app-sidebar">
            <UserInfo />
            <Menu />
        </aside>
    );
}



export default SideBar;
