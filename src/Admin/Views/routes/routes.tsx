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
        <Route path="/" exact component={Main} />
        <Route path="/blog" component={Blog} />
        <Route path="/create" component={CreatePage} /> 
        <Route path="/update/:id/" component={UpdatePage} /> 
        {/* <Route path="/pages/" component={Page} /> */}
        <Route path="/page/:ids" component={Page} />
    </Switch>
)

export default routes