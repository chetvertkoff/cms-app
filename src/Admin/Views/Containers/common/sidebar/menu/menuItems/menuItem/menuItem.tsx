import React from 'react';
import { NavLink } from 'react-router-dom';
import { IProps, Tree } from './../../../../../../Types/index.d';

class MenuItem extends React.Component<Tree,IProps>{

    constructor(props:IProps) {
        super(props);
        this.state = {collapsed: false};
    }
    
    onClick(){
        this.setState({
              collapsed: !this.state.collapsed
          });
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
                            onClick={this.onClick.bind(this)}
                        ></i>
                    </span>
                    <ul className="treeview-menu ">
                        { 
                            this.item(this.props.page.items).map(child=>{
                                return  <MenuItem page={child} key={child.id} />
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
