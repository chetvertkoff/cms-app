import React from 'react';
import { NavLink } from 'react-router-dom';
import { IProps,IState } from './../../../../../../Types/index.d';

class MenuItem extends React.Component<IProps, IState>{

    constructor(props:IProps) {
        super(props);
        this.state = {collapsed: false};
    }
    
    onClick(id){
        this.setState({
            collapsed: !this.state.collapsed
        })
        
        this.props.getPageMenu(id)
    }

    item=(item)=>{
        const arr =[]
        for(let i in item){
            arr.push(item[i])
        }
        return arr 
    }

    render() {
        var subtree = null
        var arrowClassName = 'treeview'
        if (this.state.collapsed) {
            arrowClassName += ' is-expanded';
        }
        if(this.props.page.isFolder ){
            subtree =(
                <li 
                    key={this.props.page.id} 
                    className={arrowClassName} 
                >
                    <span className="tree-arrow">
                        <NavLink className="treeview-item" to={'/page/'+this.props.page.id}>
                            <i className="icon fa fa-folder-o"></i>{this.props.page.title}
                        </NavLink>
                        <i 
                            className={"treeview-indicator fa fa-angle-right"}
                            onClick={this.onClick.bind(this,this.props.page.id)}
                        ></i>
                    </span>
                    <ul className="treeview-menu ">
                        { 
                            this.item(this.props.page.items).map(child=>{
                                return  <MenuItem page={child} key={child.id}  getPageMenu={this.props.getPageMenu}/>
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
                <li key={this.props.page.id}>
                    <NavLink className="treeview-item" to={'/update/'+this.props.page.id}>
                        <i className="icon fa fa-file-text-o"></i>{this.props.page.title}
                    </NavLink>
                </li>
            )
        }
    }
}

export default MenuItem;
