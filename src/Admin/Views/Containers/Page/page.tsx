import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Search from './parts/search';
import PageItem from './parts/pageItem';
import Title from './../common/title/title';
import { connect } from 'react-redux';
import { IProps, IState } from './../../Types/index.d';
import { fetchParentPageById } from './../../Store/Action/page';
import xhr from './../../lib/xhr';
import { fetchMenuItemsById } from '../../Store/Action/fetchMenu';
import { updateMenu } from './../../Store/Action/fetchMenu';
import PageLoadPreloader from './../../Components/UI/preloader/pageLoadPreloader';

class Page extends Component<IProps, IState>{
    constructor(props){
        super(props)

        this.state={
            search: null,
            arr: null,
            pageLimit: 15
        }

        this.handleChange = this.handleChange.bind(this) 
        this.onClick = this.onClick.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
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
    
            this.setState({
                arr: this.props.pages
            })

            return true
        }
        return false
    }

    handleChange =(e:React.ChangeEvent<HTMLInputElement>):void=>{
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

    searchPages = (val:string):void=>{
        
        if(!this.state.arr || this.state.arr[0]._id != this.props.pages[0]._id){
            this.setState({
                arr : this.props.pages,
                limit: this.props.pagesLength
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

    onClick =():void=>{
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

    handleScroll():void{
        const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight+50) >= scrollHeight;

        if(scrolledToBottom && !this.props.loading){
            const currentLimit:number = this.state.pageLimit
            const pageCount:number = this.props.pagesLength
            
            if(currentLimit < pageCount || currentLimit == pageCount){
                this.setState({
                    pageLimit: currentLimit+15
                })
                this.props.fetchParentPageById(this.props.match.params.ids, currentLimit+15)
            }
        }   
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
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
            <React.Fragment >
                <Title title={'Страницы'} classN={"fa-file-text"} {...this.props}/>
                <div className="row f" onScroll={this.handleScroll}>
                    <div className="col-md-12">
                        <div className="tile row">
                            <div className="col-md-12 line-head">
                                <NavLink to={"/admin/create"} onClick={this.onClick} className="btn btn-primary icon-btn" >
                                    <i className="fa fa-plus"></i>Добавить страницу	
                                </NavLink>
                            </div>  
                            <div style={{paddingTop:'10px'}} className="tile-body col-md-12">
                                <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                    <div className="row">
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
                {
                this.props.loading ?
                    <PageLoadPreloader />
                : null
                }
            </React.Fragment>
        )
    }

}

const mapStateToProps=(state:IProps)=>({
    // Get pages from server
    loading: state.fetchPages.loading,
    pages: state.fetchPages.page.data,
    pagesLength: state.fetchPages.page.length
})

const mapDispatchToProps=(dispatch)=>({
    fetchParentPageById: (id, limit)=>dispatch(fetchParentPageById(id, limit)),
    fetchMenuItemsById: id=>dispatch(fetchMenuItemsById(id)),
    updateMenu: toggler=>dispatch(updateMenu(toggler))
})

export default connect(mapStateToProps,mapDispatchToProps)(Page)
