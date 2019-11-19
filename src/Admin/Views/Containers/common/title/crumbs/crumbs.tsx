import React from 'react';
import CrumbItem from './crumbItem/crumbItem';
import { IProps, IState } from './../../../../Types/index.d'

class Crumbs extends React.Component<IProps, IState>{
    constructor(props){
        super(props)
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.ids != this.props.match.params.ids 
            ||this.props.pages
            ||prevProps.pages[0]._id != this.props.pages[0]._id
        ){ 
            const crumbs = localStorage.getItem('crumbs')
            if(!crumbs){
                const pages =this.props.pages
                localStorage.setItem('crumbs',JSON.stringify(pages))
            }
            console.log(JSON.parse(crumbs));
            
            return true
        }
        return false
    }

    render() {
        return (
            <ul className="app-breadcrumb breadcrumb">
                <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
                {
                    this.props.pages ?  
                        <li className="breadcrumb-item">{this.props.title}</li> 
                    :
                    <li className="breadcrumb-item">{this.props.title}1</li>
                }
                {/* <CrumbItem  /> */}
            </ul>
        )
    }
}


export default Crumbs
