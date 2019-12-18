import React from 'react';
import { connect } from 'react-redux';

import { IProps } from './../../../Types/index.d';
import Caption from './../createPage/parts/caption';
import Meta from './../createPage/parts/meta';
import Body from './../createPage/parts/body';
import {fetchPageById} from '../../../Store/Action/page'
import Title from './../../common/title/title';


class UpdatePage extends React.Component<IProps>{
    constructor(props){
        super(props)

        this.state={
            active: true,
            isContainer: false,
            title: null,
            alias: null,
            body: null,
            metaTitle: null,
            metaKeywords: null,
            metaDescription: null,
            isInvalid: false
        }
    }
    componentDidMount(){
        this.props.fetchPageById(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.id != prevProps.match.params.id){
            if(this.props.match.params.id){
                this.props.fetchPageById(this.props.match.params.id)
                this.forceUpdate()
                return true
            }
        }
        return false
    }

    getData=(label,value)=>{
        switch (label) {
            case 'Заголовок':
                this.setState({
                    title: value
                })
                break;
            case 'Алиас':
                this.setState({
                    alias: value
                })
                break;
            case 'Активность':
                this.setState({
                    active: value
                })
                break;
            case 'Контейнер':
                this.setState({
                    isContainer: value
                })
                break;
            case 'Title':
                this.setState({
                    metaTitle: value
                })
                break;
            case 'Keywords':
                this.setState({
                    metaKeywords: value
                })
                break;
            case 'Description':
                this.setState({
                    metaDescription: value
                })
                break;
        }
    }

    getFromTextEditor = (text:string)=>{
        console.log(text);
        
        // this.setState({
        //     body: text
        // })
    }

    render() {   


        var page
        if(this.props.page){
            page = this.props.page[0]
        }
        
        return (
                page ? 
                <React.Fragment>
                    <Title title={page.title} classN={"fa-file-text"} path={page.path}/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tile row">
                                <div className="col-md-12 row">
                                    <Caption getData={this.getData} data={page}/>
                                    <Body getFromTextEditor={this.getFromTextEditor} defaultValue={page.body} />
                                    <Meta />
                                    <div className="col-md-12">
                                        <button className="btn btn-primary pull-right">
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
    fetchPageById: id=>dispatch(fetchPageById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePage)
