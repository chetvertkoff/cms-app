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
import { AlertContext } from './../../../Context/alert-context';
import { load } from './../../../Store/Action/commonAction';
import Preloader from './../../../Components/UI/preloader/preloader';


class UpdatePage extends React.Component<IProps, IState>{
    static contextType = AlertContext
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
        let pageId:number = this.props.match.params.id
        let alert = this.context
        if(alert.delete.isDelete && alert.id.id === pageId){
            this.deletePage(pageId)
            setTimeout(() => {
                alert.delete.deletePage(false)
                alert.alert.toggleAlert(false)
                alert.id.setId(null)
            }, 0)
        }

        !this.state.fields && this.props.page.data && this.setState({
            fields: this.props.page.data[0]
        })
        
        if(this.props.match.params.id != prevProps.match.params.id
            ){
            
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
                    this.props.fetchMenuItemsById(0)  
                    this.props.updateMenu(true)
                    setTimeout(() => {
                        this.props.fetchPageById(this.props.match.params.id)
                    }, 0);
                 }
             })
        } catch (error) {
            return error
        }
    }

    showAlert=():void=>{
        let pageId:number = this.props.match.params.id
        let alert = this.context
        alert.alert.toggleAlert(true)
        alert.id.setId(pageId)
    }

    deletePage = async (id:number):Promise<any>=>{
        const status = await xhr('DELETE',`/api/page/${id}`, null)
         .then(data=>data.status)

        if(status == 200){
            this.props.history.push(`/admin/page/0`);
            setTimeout(() => {
                this.props.fetchMenuItemsById(0)  
                this.props.updateMenu(true)
            }, 0)
        }
    } 
    
    render() {           
        var page
        if(this.state.fields){
            page = this.state.fields
        }
        return (
                !this.props.loading && page ? 
                <React.Fragment>
                    <Title title={this.props.page[0].title} classN={"fa-file-text"} path={this.props.page[0].path}/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tile row">
                                <div className="col-md-12 row">
                                    <Caption getData={this.getData} isInvalid={this.state.isInvalid} data={page}/>
                                    <Body getFromTextEditor={this.getFromTextEditor} id={page.id} defaultValue={page.body} />
                                    <Meta data={page} getData={this.getData} />
                                    <div className="update-page_buttons">
                                        <button onClick={this.showAlert} className="btn btn-danger">
                                            Удалить
                                        </button>
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
                <Preloader />
        );
    }
}

const mapStateToProps=state=>({
    page: state.fetchPages.page,
    loading: state.fetchPages.loading
})

const mapDispatchToProps=dispatch=>({
    fetchPageById: id=>dispatch(fetchPageById(id)),
    fetchMenuItemsById: id=>dispatch(fetchMenuItemsById(id)),
    updateMenu: toggler=>dispatch(updateMenu(toggler))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePage)
