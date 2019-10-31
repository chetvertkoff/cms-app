import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleMenuItem } from '../../../../Store/Action/commonAction';
import { IProps,Menus } from 'Admin/Views/Types';
import { fetchPages } from './../../../../Store/Action/page';

import MenuItem from './menuItems/menuItem/menuItem';
import { fetchMenu } from './../../../../Store/Action/fetchMenu';


class Menu extends Component<IProps, Menus>{
    pages:IProps
    constructor(props:IProps){
        super(props)
        this.menuToggler= this.menuToggler.bind(this)
        this.pages=this.props.pages.pages
    }

    componentDidMount(){
        setImmediate(()=>{
            this.props.fetchMenu()
        })
        this.props.fetchPages()
    }
    componentDidUpdate(){
        this.pages= this.props.pages.pages
    }

    menuToggler(){
        this.props.toggleMenuItem(this.props.toggleMenu)
    }

    render() {     
        const classes=["treeview"]
        if(this.props.toggleMenu){
            classes.push('is-expanded')
        }
        return (
            <ul className="app-menu">
                {
                    this.props.menu.menu ? 
                    this.props.menu.menu.map(item=>{
                        if(item.hasPages){
                            return(
                                <li className={classes.join(' ')} key={item.id}>
                                    <NavLink to={item.alias} exact activeClassName="active" className="app-menu__item">
                                        <i className={`app-menu__icon fa ${item.class}`}></i>
                                        <span className="app-menu__label">{item.title}</span>
                                        <i className="treeview-indicator fa fa-angle-right"
                                            onClick={this.menuToggler.bind(this)}
                                        ></i>
                                    </NavLink>
                                    <ul className="treeview-menu" style={{paddingLeft:"0px"}}>
                                        {   this.props.toggleMenu && this.pages[0].alias ? 
                                            this.pages.map((page)=>(
                                                <MenuItem page={page} key={page.id} />
                                            )) : null
                                        }
                                    </ul>
                                </li>
                            )
                        }
                        return(
                            <li key={item.id}>
                                <NavLink to={item.alias} exact activeClassName="active" className="app-menu__item">
                                    <i className={`app-menu__icon fa ${item.class}`}></i>
                                    <span className="app-menu__label">{item.title}</span>
                                </NavLink>
                            </li>
                        )
                    }) : null
                }
                
            </ul>
        );
    }
}

const mapStateToProps=(state)=>({
    pages: state.fetchPages,
    toggleMenu: state.commonReducer.toggleMenu,
    menu: state.fetchMenu
})

const mapDispatchToProps = (dispatch)=>({
    toggleMenuItem: bool=>dispatch(toggleMenuItem(bool)),
    fetchPages: ()=>dispatch(fetchPages()),
    fetchMenu: ()=>dispatch(fetchMenu())
})

export default connect(mapStateToProps,mapDispatchToProps)(Menu);