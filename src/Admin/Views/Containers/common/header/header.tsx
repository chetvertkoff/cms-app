//Vendors
import React  from 'react';
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux';
//Components and types
import HeaderInput from '../../../Components/UI/input/headerInput'
import UserDropDownMenu from './../../../Components/UI/userDropDown/userDropDownMenu';
import { IProps } from 'Admin/Views/Types';
import { toggleDropDown } from './../../../Store/Action/commonAction';

const Header = (props:IProps)=>{
    const toggleUsermenu = (e)=>{
        e.preventDefault()
        props.toggleDropDown(props.dropDownShow)
    }

    return (
        <header className="app-header">
            <NavLink className="app-header__logo" to={"/admin"}>Vali</NavLink>
            <a className="app-sidebar__toggle" href="#" onClick={props.toggleSide}></a>
            <ul className="app-nav">
                <HeaderInput />
                <UserDropDownMenu 
                    // dropStyle={this.state.dropStyle} 
                    toggleMenu={toggleUsermenu} 
                    show={props.dropDownShow} 
                />
            </ul>
        </header>
    )   
}
export const mapStateToProps = (state:IProps)=>({
    dropDownShow: state.commonReducer.dropDownShow
})

export const mapDispatchToProps = (dispatch:any)=>({
    toggleDropDown:(bool:boolean)=>dispatch(toggleDropDown(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
