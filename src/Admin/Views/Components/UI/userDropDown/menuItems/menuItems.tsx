import React from 'react';

const MenuItems = () => {
    return (
        <React.Fragment>
            <li>
                <a href="" className="dropdown-item">
                    <i className="fa fa-user fa-lg"></i>
                    Профиль
                </a> 
            </li>
            <li>
                <a href="" className="dropdown-item">
                    <i className="fa fa-sign-out fa-lg"></i>
                    Выход
                </a> 
            </li>
        </React.Fragment>
    );
}

export default MenuItems;
