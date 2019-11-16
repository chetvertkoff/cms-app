import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleMenuItem } from '../../../../Store/Action/commonAction';
import { IProps,Menus } from './../../../../Types/index.d';

import MenuItem from './menuItems/menuItem/menuItem';
import { fetchMenu,fetchMenuItemsById } from './../../../../Store/Action/fetchMenu';
import e from 'express';


class Menu extends Component<IProps, Menus>{
    pages:IProps
    constructor(props:IProps){
        super(props)
        this.menuToggler= this.menuToggler.bind(this)
        this.pages=this.props.menu.pages
        this.arr=null
    }

    componentDidMount(){ 
        setImmediate(()=>{
            this.props.fetchMenu()
        })
        this.props.fetchMenuItemsById(0)  
    }

    componentDidUpdate(prevProps){
        if(prevProps.menu.pages[0]._id != this.props.menu.pages[0]._id){
            this.pages= this.props.menu.pages
            if(this.arr==null){
                this.arr = this.pages
            }
            this.arr = this.filterOb(this.arr, this.pages[0].parent, this.pages) 
            this.forceUpdate()
            return true
        }
        return false
    }

    filterOb =(arr,id:number | string, putted)=>{    
        arr.map(item=>{
            if(item.id != item.parent){
                if(item.isFolder && item.items!==undefined){
                    this.filterOb(item.items, id, putted)
                }else{
                    if(item.id == putted[0].parent){
                        item.items = putted
                    }
                }
            }
        })    
        
        return arr
    }

    findEl=(arr, id)=>{
        var find = ''
        if(find == ''){
            arr.map(item=>{
                if(item.isFolder && item.items!==undefined){
                    if(item.parent == id){                  
                        find = item.parent
                    }else{
                        this.findEl(item.items, id)
                    }
                }else{
                    if(item.parent == id){
                        find = item.parent
                    }
                }
            })
        }
        // return find
    }

    menuToggler(){
        this.props.toggleMenuItem(this.props.toggleMenu)
    }

    getPageMenu=(id)=>{
        console.log(this.arr);
        
        
        this.props.fetchMenuItemsById(id)
        
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
                                        {   this.props.toggleMenu && this.arr[0].alias ? 
                                            this.arr.map((page)=>(
                                                <MenuItem page={page} key={page.id} getPageMenu={this.getPageMenu}/>
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
    pages: state.fetchMenuItemsById,
    toggleMenu: state.commonReducer.toggleMenu,
    menu: state.fetchMenu
})

const mapDispatchToProps = (dispatch)=>({
    toggleMenuItem: bool=>dispatch(toggleMenuItem(bool)),
    fetchMenuItemsById: id=>dispatch(fetchMenuItemsById(id)),
    fetchMenu: ()=>dispatch(fetchMenu())
})

export default connect(mapStateToProps,mapDispatchToProps)(Menu);