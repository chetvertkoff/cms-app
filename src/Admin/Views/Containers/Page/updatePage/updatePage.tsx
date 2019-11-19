import React from 'react';
import { connect } from 'react-redux';

import { IProps } from './../../../Types/index.d';
import Caption from './../createPage/parts/caption';
import Meta from './../createPage/parts/meta';
import Body from './../createPage/parts/body';
import {fetchPageById} from '../../../Store/Action/page'


class UpdatePage extends React.Component<IProps>{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.fetchPageById(this.props.match.params.id)
    }

    render() {   
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="tile row">
                        <div className="col-md-12 row">
                            <Caption data={this.props.page}/>
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
