import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
//components
import Main from './../Containers/main/main';
import Page from './../Containers/Page/page';
import CreatePage from './../Containers/Page/createPage/createPage';
import UpdatePage from './../Containers/Page/updatePage/updatePage';
import User from './../Containers/User/user';
import Auth from './../Containers/Auth/auth';


const Routes=(props)=>{
    
    return(
        <>
            {
                props.isAuth ?
                <Switch>
                    <Route path="/admin/" exact component={Main} />
                    <Route path="/admin/create" component={CreatePage} /> 
                    <Route path="/admin/update/:id/" component={UpdatePage} /> 
                    <Route path="/admin/page/:ids" component={Page} />
                    <Route path="/admin/user" component={User} />
                </Switch>
                :
                <Switch> 
                    <Route path="/admin/login" component={Auth} />
                </Switch>
            }
        </>
    )
}



export default Routes