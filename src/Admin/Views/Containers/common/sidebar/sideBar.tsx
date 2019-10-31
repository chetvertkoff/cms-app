import React, { Component } from 'react';
import UserInfo from './userInfo/userInfo';
import Menu from './menu/menu';

export class SideBar extends Component {
    render() {
        return (
            <aside className="app-sidebar">
                <UserInfo />
                <Menu />
            </aside>
        );
    }
}

export default SideBar;
