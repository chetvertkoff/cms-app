import React, { Component } from 'react'
import Title from './../common/title/title';
import { IProps } from './../../Types/index.d';

export default class Main extends Component<IProps> {
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <React.Fragment>
                <Title title={'Панель'} classN={"fa-dashboard"} />
                <div className="row">
                    <div className="col-md-12">
                        <p>Main</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
