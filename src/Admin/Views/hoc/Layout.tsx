import React from 'react'
import Preloader from './../Components/UI/preloader/preloader';
import Header from './../Containers/common/header/header';
import { IProps } from '../Types';
import SideBar from './../Containers/common/sidebar/sideBar';
import { connect } from 'react-redux';
import { toggleSideBarAction, load } from './../Store/Action/commonAction';

class Layout extends React.Component<IProps>{
    constructor(props:IProps){
        super(props)
        this.toogleSidebar=this.toogleSidebar.bind(this)
    }

    componentDidMount(){
        // setTimeout(()=>{
        //     this.props.load()
        // },2000)
    }

    toogleSidebar(e:any){
        e.preventDefault()   
        this.props.toggleSideBarAction(this.props.sideBarShow)    
    }
    
    render(){
        return(
            <div id="Layout" className={`app sidebar-mini rtl pace-done ${this.props.sideBarShow ? 'sidenav-toggled' : null}`}>
                {/* <Preloader loading={this.props.loading}/> */}
                <Header toggleSide={this.toogleSidebar} />
                <SideBar />
                <main className="app-content">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state:IProps)=>({
    sideBarShow: state.commonReducer.sideBarShow,
    loading: state.commonReducer.isLoaded
})

const mapDispatchToProps = (dispatch:any)=>({
    toggleSideBarAction:(bool:boolean)=>dispatch(toggleSideBarAction(bool)),
    load:(bool:boolean)=>dispatch(load(bool))
})


export default connect(mapStateToProps,mapDispatchToProps)(Layout)


 