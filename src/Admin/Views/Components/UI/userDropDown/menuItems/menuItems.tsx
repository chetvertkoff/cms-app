import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from './../../../../hooks/auth.hook';
import { connect } from 'react-redux';
import { updateMenu } from './../../../../Store/Action/fetchMenu';

const MenuItems = (props) => {
    const {logOut} = useAuth()

    const exit = (e):void=>{
        e.preventDefault()
        logOut()
        props.updateMenu(true)
    }

    return (
        <React.Fragment>
            <li onClick={props.toggleMenu}>
                <NavLink activeClassName="active_" to={"/admin/user"} className="dropdown-item">
                    <i  className="fa fa-user fa-lg"></i>
                        Профиль
                </NavLink>
            </li>
            <li onClick={props.toggleMenu}>
                <a href="" onClick={exit} className="dropdown-item">
                    <i className="fa fa-sign-out fa-lg"></i>
                    Выход
                </a> 
            </li>
        </React.Fragment>
    );
}

const mapDispatchToProps = (dispatch)=>({
    updateMenu: toggler=>dispatch(updateMenu(toggler))
})

export default connect(null,mapDispatchToProps)(MenuItems)
