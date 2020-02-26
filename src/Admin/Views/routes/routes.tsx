import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
//components
import Main from './../Containers/main/main';
import Page from './../Containers/Page/page';
import Blog from './../Containers/Blog/blog';
import CreatePage from './../Containers/Page/createPage/createPage';
import UpdatePage from './../Containers/Page/updatePage/updatePage';


const routes=(
    <Switch>
        <Route path="/admin/" exact component={Main} />
        <Route path="/admin/blog" component={Blog} />
        <Route path="/admin/create" component={CreatePage} /> 
        <Route path="/admin/update/:id/" component={UpdatePage} /> 
        {/* <Route path="/pages/" component={Page} /> */}
        <Route path="/admin/page/:ids" component={Page} />
    </Switch>
)

export default routes