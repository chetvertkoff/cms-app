import React, { Component } from 'react'
import Crumbs from './crumbs/crumbs';
import { IProps } from './../../../Types/index.d';

class Title extends Component<IProps> {
    constructor(props){
        super(props)
    }
    
    render() {
        
        return (
            <div className="app-title">
                <div>
                    <h1>
                        <i style={{marginRight:"20px"}} className={`fa ${this.props.classN}`}></i> 
                        <span>{this.props.title}</span>
                    </h1>
                </div>
                <Crumbs {...this.props} />
            </div>
        )
    }
}
export default Title
