import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Select from './parts/select/select';
import Search from './parts/search';
import PageItem from './parts/pageItem';
import Title from './../common/title/title';
import { connect } from 'react-redux';
import { IProps, IState } from './../../Types/index.d';
import { fetchParentPageById } from './../../Store/Action/page';
import xhr from './../../lib/xhr';
import { fetchMenuItemsById } from '../../Store/Action/fetchMenu';
import { updateMenu } from './../../Store/Action/fetchMenu';
import { AlertContext } from './../../Context/alert-context';
import Preloader from '../../Components/UI/preloader/preloader';

class Page extends Component<IProps, IState>{
    constructor(props){
        super(props)

        this.state={
            search: null,
            arr: null
        }

        this.handleChange = this.handleChange.bind(this) 
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount(){
        // Get root pages from API for first loading
        this.props.fetchParentPageById(this.props.match.params.ids)    
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.ids != this.props.match.params.ids ){ 
            // Get new pages from server
            if(!this.props.pages.length){
                this.props.fetchParentPageById(0)
            }else{
                this.props.fetchParentPageById(this.props.match.params.ids)
            }
        
            setTimeout(() => {
                this.setState({
                    arr: this.props.pages
                })
            }, 0);
            return true
        }
        return false
    }

    handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        const val = e.target.value        
        setTimeout(() => {
            if(val != '' || val != val){
                this.searchPages(val)
            }
            if(val == ''){
                this.setState({
                    search: null
                })
            }
        }, 0);   
    }

    searchPages = (val:string)=>{
        
        if(!this.state.arr || this.state.arr[0]._id != this.props.pages[0]._id){
            this.setState({
                arr : this.props.pages
            })
        }
        
        new Promise((resolve)=>{
            const filter =  this.state.arr.filter(item=>{
                return item.title.search(new RegExp(val,'i')) >= 0
             })  
             setTimeout(() => {
                resolve(filter)
             }, 0);
        })
         .then((data)=>{
            this.setState({
                search: data
            })
         })
        
    }

    onClick =()=>{
        var options 
        if(this.props.pages && this.props.pages.length >= 1){

            if (!this.props.pages) {
                options = {
                    id: this.props.match.params.ids, 
                    path: 'null',
                    parentName: 'null'
                }
            }else{
                if (this.props.pages[0] && this.props.pages[0].path != 'null') {
                    options = {
                        id: this.props.match.params.ids, 
                        path: `${this.props.pages[0].path} / ${this.props.pages[0].title}`,
                        parentName: this.props.pages[0].title
                    }   
                }else{
                    if (this.props.pages[0] && this.props.match.params.ids == 0) {
                        options = {
                            id: this.props.match.params.ids, 
                            path: 'null',
                            parentName: 'null'
                        }
                    }else{
                        options = {
                            id: this.props.match.params.ids, 
                            path: `${this.props.pages[0].title}`,
                            parentName: this.props.pages[0].title
                        }  
                    }
                }
            }
        }else{
            options = {
                id: this.props.match.params.ids, 
                path: 'null',
                parentName: 'null'
            }
        }
        localStorage.setItem('options', JSON.stringify(options));

    }

    deletePage = async (id:number):Promise<any>=>{
        const status = await xhr('DELETE',`/api/page/${id}`, null)
         .then(data=>data.status)

        if(status == 200){
            
            this.props.fetchParentPageById(this.props.match.params.ids)
        
            setTimeout(() => {
                this.setState({
                    arr: this.props.pages
                })
                setTimeout(() => {
                    this.props.fetchMenuItemsById(0)  
                    this.props.updateMenu(true)
                }, 0);
            }, 0);
        }
    } 

    render(){ 
        var pages
        if (this.props.pages) {
            const parent = this.props.pages[0].id
            pages = this.props.pages.filter(e=>{
                return e.parent === parent
            })
        }

        return (
            this.props.loading ?
            <Preloader />
            :
            <React.Fragment>
                <Title title={'Страницы'} classN={"fa-file-text"} {...this.props}/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="tile row">
                            <div className="col-md-12 line-head">
                                <NavLink to={"/create"} onClick={this.onClick} className="btn btn-primary icon-btn" >
                                    <i className="fa fa-plus"></i>Добавить страницу	
                                </NavLink>
                            </div>  
                            <div style={{paddingTop:'10px'}} className="tile-body col-md-12">
                                <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                    <div className="row">
                                        <Select />
                                        <Search  handleChange={this.handleChange} />
                                    </div>
                                    <div className="row">
                                    {   
                                        this.state.search !=null ? 
                                            this.state.search.length > 0 ?
                                            this.state.search.map(item=>{
                                                return <PageItem item={item} key={item.id} /> 
                                            })
                                            :
                                            <div className="col-lg-12 center">
                                                <h2 className="text-center text-primary">Ничего не найдено :(</h2>
                                            </div>
                                        :
                                        
                                            pages && 
                                            pages.length >= 1 ?
                                            pages.map(item=>{
                                                return <PageItem deletePage={this.deletePage} item={item} key={item.id} /> 
                                            }): null
                                        
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

const mapStateToProps=(state:IProps)=>({
    // Get pages from server
    loading: state.fetchPages.loading,
    pages: state.fetchPages.page
})

const mapDispatchToProps=(dispatch)=>({
    fetchParentPageById: id=>dispatch(fetchParentPageById(id)),
    fetchMenuItemsById: id=>dispatch(fetchMenuItemsById(id)),
    updateMenu: toggler=>dispatch(updateMenu(toggler))
})

export default connect(mapStateToProps,mapDispatchToProps)(Page)
