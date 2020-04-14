//Vendors
import React  from 'react';
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux';
//Components and types
import UserDropDownMenu from './../../../Components/UI/userDropDown/userDropDownMenu';
import { toggleDropDown } from './../../../Store/Action/commonAction';

const Header = (props)=>{
    const toggleUsermenu = (e)=>{
        e.preventDefault()
        props.toggleDropDown(props.dropDownShow)
    }

    return (
        <header className="app-header">
            <NavLink className="app-header__logo" to={"/admin"}>Vali</NavLink>
            <a className="app-sidebar__toggle" href="#" onClick={props.toggleSide}></a>
            <ul className="app-nav">
                <UserDropDownMenu 
                    toggleMenu={toggleUsermenu} 
                    show={props.dropDownShow} 
                />
            </ul>
        </header>
    )   
}
export const mapStateToProps = (state)=>({
    dropDownShow: state.commonReducer.dropDownShow
})

export const mapDispatchToProps = (dispatch:any)=>({
    toggleDropDown:(bool:boolean)=>dispatch(toggleDropDown(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
