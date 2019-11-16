import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Select from './parts/select/select';
import Search from './parts/search';
import PageItem from './parts/pageItem';
import Title from './../common/title/title';
import { connect } from 'react-redux';
import { IProps } from './../../Types/index.d';
import { fetchPagesById } from './../../Store/Action/page';

class Page extends Component<IProps>{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchPagesById(this.props.match.params.ids)
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.ids != this.props.match.params.ids){
            this.props.fetchPagesById(this.props.match.params.ids)
            return true
        }
        return false
    }

    render(){    
        return (
            <React.Fragment>
                <Title title={'Страницы'} classN={"fa-file-text"} {...this.props}/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="tile row">
                            <div className="col-md-12 line-head">
                                <NavLink to={"/create"} className="btn btn-primary icon-btn" >
                                    <i className="fa fa-plus"></i>Добавить страницу	
                                </NavLink>
                            </div>  
                            <div style={{paddingTop:'10px'}} className="tile-body col-md-12">
                                <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                    <div className="row">
                                        <Select />
                                        <Search />
                                    </div>
                                    <div className="row">
                                    {   
                                        this.props.pages.page &&
                                        this.props.pages.page.map(item=>{
                                            return <PageItem item={item} key={item.id} /> 
                                        })
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps=(state:IProps)=>{
    
    return{
    pages: state.fetchPages.pages
}}

const mapDispatchToProps=(dispatch)=>({
    fetchPagesById: id=>dispatch(fetchPagesById(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(Page)
