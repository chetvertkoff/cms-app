import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { IProps,IState } from './../../../../../../Types/index.d';

const MenuItem=(props)=>{

    const [collapsed, setCollaps] = useState(false)

    const onClick=(id)=>{
        setCollaps(!collapsed)
        
        props.getPageMenu(id)
    }

    const item=(item)=>{
        const arr =[]
        for(let i in item){
            arr.push(item[i])
        }
        return arr 
    }

    var subtree = null
    var arrowClassName = 'treeview'
    
    if (collapsed && ! props.collapsed) {       
        arrowClassName += ' is-expanded'
    }else{
        arrowClassName = 'treeview'
    }
    if(props.page.isFolder){
        subtree =(
            <li 
                className={arrowClassName} 
            >
                <span className="tree-arrow">
                    <NavLink className="treeview-item" to={'/page/'+props.page.id}>
                        <i className="icon fa fa-folder-o"></i>{props.page.title}
                    </NavLink>
                    {
                        props.page.hasChild && <i 
                        className={"treeview-indicator fa fa-angle-right"}
                        onClick={onClick.bind(this,props.page.id)}
                    ></i>
                    }
                </span>
                <ul className="treeview-menu ">
                    { 
                        item(props.page.items).map(child=>{
                            return  <MenuItem page={child} key={child.id}  getPageMenu={props.getPageMenu}/>
                        })
                    }          
                </ul>
            </li>
        )         
    }
    
    if(subtree){
        return subtree
    }
    else{
        return (
            <li key={props.page.id}>
                <NavLink className="treeview-item" to={'/update/'+props.page.id}>
                    <i className="icon fa fa-file-text-o"></i>{props.page.title}
                </NavLink>
            </li>
        )
    }
    

}

export default MenuItem;
