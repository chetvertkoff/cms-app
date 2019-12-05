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
    }
    componentDidMount(){
        this.props.fetchPageById(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.id != prevProps.match.params.id){
            if(this.props.match.params.id){
                this.props.fetchPageById(this.props.match.params.id)
                this.forceUpdate()
            }
            return true
        }
        return true
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
                                    <Caption data={page}/>
                                    <Body />
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
