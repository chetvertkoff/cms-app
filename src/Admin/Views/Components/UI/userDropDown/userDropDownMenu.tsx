import React from 'react';
import { IProps } from 'Admin/Views/Types';
import MenuItems from './menuItems/menuItems';


const UserDropDownMenu = (props:IProps) => {
    const classesLi = ['dropdown']
    const classesUl = ['dropdown-menu', 'settings-menu', 'dropdown-menu-right']
    if(props.show){
        classesLi.push('show')
        classesUl.push('show')
    }

    return (
        <li className={classesLi.join(' ')}>
            <a href="" className="app-nav__item" onClick={props.toggleMenu}>
                <i className="fa fa-user fa-lg"></i>
            </a>
            <ul className={classesUl.join(' ')}>
                <MenuItems />
            </ul>
        </li>
    );
}

export default UserDropDownMenu
