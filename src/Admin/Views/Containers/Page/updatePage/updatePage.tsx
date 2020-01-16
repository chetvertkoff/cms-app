import React from 'react';
import { connect } from 'react-redux';

import { IProps, IState } from './../../../Types/index.d';
import Caption from './../createPage/parts/caption';
import Meta from './../createPage/parts/meta';
import Body from './../createPage/parts/body';
import {fetchPageById} from '../../../Store/Action/page'
import Title from './../../common/title/title';
import xhr from './../../../lib/xhr';
import { fetchMenuItemsById } from '../../../Store/Action/fetchMenu';
import { updateMenu } from './../../../Store/Action/fetchMenu';


class UpdatePage extends React.Component<IProps, IState>{
    constructor(props){
        super(props)

        this.state={
            fields: null,
            isInvalid: false
        }
    }
    componentDidMount(){
        this.props.fetchPageById(this.props.match.params.id)
    }


    componentDidUpdate(prevProps){
        !this.state.fields && this.setState({
            fields: this.props.page[0]
        })
        
        if(this.props.match.params.id != prevProps.match.params.id){
            console.log(this.props.match.params.id);
            
            if(this.props.match.params.id){
                this.props.fetchPageById(this.props.match.params.id)
                this.forceUpdate()
                return true
            }
        }
        return false
    }

    static getDerivedStateFromProps(props, state){
        if(props.page && 
        props.page[0] &&
        state.fields &&
        props.page[0]._id !== state.fields._id){
            return {fields: props.page[0]}
        }
        return null
    }

    getData=(label,value)=>{
        switch (label) {
            case 'Заголовок':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        title: value
                    }
                })
                break;
            case 'Алиас':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        alias: value
                    }
                })
                break;
            case 'Активность':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        isActive: value
                    }
                })
                break;
            case 'Контейнер':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        isFolder: value
                    }
                })
                break;
            case 'Title':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        metaTitle: value
                    }
                })
                break;
            case 'Keywords':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        metaKeywords: value
                    }
                })
                break;
            case 'Description':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        metaDescription: value
                    }
                })
                break;
        }
    }

    getFromTextEditor = (text:string)=>{
        this.setState({
            fields:{
                ...this.state.fields,
                body: text
            }
        })
    }

    updateData = ()=>{
        if(this.state.fields.title == null || this.state.fields.title == ''){
            this.setState({
                isInvalid: true
            })
            return false
        }     
        try {
            xhr('PUT','/api/parentPage',this.state.fields) 
             .then(data=>{
                 if(data.status == 200){                 
                    setTimeout(() => {
                        this.props.fetchMenuItemsById(0)  
                        this.props.updateMenu(true)
                    },0);
                 }
             })
        } catch (error) {
            return error
        }
    }

    render() {   
        var page
        if(this.state.fields){
            page = this.state.fields
        }
        
        return (
                page ? 
                <React.Fragment>
                    <Title title={this.props.page[0].title} classN={"fa-file-text"} path={this.props.page[0].path}/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tile row">
                                <div className="col-md-12 row">
                                    <Caption getData={this.getData} isInvalid={this.state.isInvalid} data={page}/>
                                    <Body getFromTextEditor={this.getFromTextEditor} defaultValue={page.body} />
                                    <Meta data={page} getData={this.getData} />
                                    <div className="col-md-12">
                                        <button onClick={this.updateData} className="btn btn-primary pull-right">
                                            Обновить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                :
                null  
        );
    }
}

const mapStateToProps=state=>({
    page:state.fetchPages.page
})

const mapDispatchToProps=dispatch=>({
    fetchPageById: id=>dispatch(fetchPageById(id)),
    fetchMenuItemsById: id=>dispatch(fetchMenuItemsById(id)),
    updateMenu: toggler=>dispatch(updateMenu(toggler))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePage)
