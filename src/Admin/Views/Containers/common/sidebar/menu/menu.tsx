import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { IProps, IState } from './../../../../Types/index.d';
import Preloader from '../../../../Components/UI/preloader/preloader'

import MenuItem from './menuItems/menuItem/menuItem';
import { fetchMenu, fetchMenuItemsById, updateMenu } from './../../../../Store/Action/fetchMenu';

class Menu extends Component<IProps, IState>{
    constructor(props:IProps){
        super(props)

        this.state={
            memory: [],
            arr:null, 
            unClicked: false,
            showMenu:false
        }
        this.menuToggler= this.menuToggler.bind(this)
    }

    componentDidMount(){ 
        this.props.fetchMenuItemsById(0)  
        this.props.fetchMenu()
 
    }

    componentDidUpdate(prevProps){  
        if(JSON.stringify(prevProps.menu.pages) !== JSON.stringify(this.props.menu.pages) 
        && this.props.menu.pages[0] 
        ){ 

            const parent = this.props.menu.pages[0].id
            const pages = this.props.menu.pages.filter(e=>{
                return e.parent === parent
            })
            console.log(pages);
            
            if (this.props.update) {
                this.setState({
                    arr: pages,
                    memory:[],
                    unClicked: true
                }) 
                this.props.updateMenu(false)
            }

            if(this.state.arr==null){
                setTimeout(()=>{
                    this.setState({
                        arr: pages
                    })
                    
                },0)     
            }
            setTimeout(() => {
                
                this.setState({
                    arr: this.filterOb(this.state.arr, pages[0].parent, pages),
                    unClicked: false
                })

            }, 0);
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

    menuToggler():void{
        this.setState({showMenu: !this.state.showMenu})
    }

    getPageMenu=(id:number):void=>{
        
        if( !this.state.memory.find((item)=>item==id)){
            
            this.setState({
                memory: [...this.state.memory, id]
            })
            setTimeout(() => {
                this.props.fetchMenuItemsById(id)
            }, 0)
        }
    }

    render() {   
        const classes=["treeview"]
        if(this.state.showMenu){
            classes.push('is-expanded')
        }

        return (
            <ul className="app-menu">
                {
                    !this.props.loading && this.props.menu.menu ? 
                    this.props.menu.menu.map(item=>{
                        if(item.hasPages){
                            return(
                                <li className={classes.join(' ')} key={item.id}>
                                    <NavLink to={item.alias}  activeClassName="active" className="app-menu__item">
                                        <i className={`app-menu__icon fa ${item.class}`}></i>
                                        <span className="app-menu__label">{item.title}</span>
                                        <i className="treeview-indicator fa fa-angle-right"
                                            onClick={this.menuToggler.bind(this)}
                                        ></i>
                                    </NavLink>
                                    <ul className="treeview-menu" style={{paddingLeft:"0px"}}>
                                        {   this.state.showMenu && this.state.arr[0].alias && !this.state.unClicked ? 
                                            this.state.arr.map((page)=>(
                                                <MenuItem page={page} collapsed={this.state.unClicked} key={page.id} getPageMenu={this.getPageMenu}/>
                                            )) : null
                                        }
                                    </ul>
                                </li>
                            )
                        }
                        return(
                            <li key={item.id}>
                                <NavLink to={item.alias} exact  activeClassName="active" className="app-menu__item">
                                    <i className={`app-menu__icon fa ${item.class}`}></i>
                                    <span className="app-menu__label">{item.title}</span>
                                </NavLink>
                            </li>
                        )
                    }) : <Preloader />
                }
            </ul>
        );
    }
}

const mapStateToProps=(state)=>({
    loading: state.fetchMenu.loading,
    pages: state.fetchMenuItemsById,
    menu: state.fetchMenu,
    update: state.fetchMenu.toggler
})

const mapDispatchToProps = (dispatch)=>({
    fetchMenuItemsById: id=>dispatch(fetchMenuItemsById(id)),
    fetchMenu: ()=>dispatch(fetchMenu()),
    updateMenu: toggler=>dispatch(updateMenu(toggler))
})

export default connect(mapStateToProps,mapDispatchToProps)(Menu)