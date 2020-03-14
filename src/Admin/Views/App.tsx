//vendors
import React from 'react';
import { withRouter } from 'react-router-dom'
import Layout from './hoc/Layout';
// types variable
import { IProps } from './Types';
//routes
import Routes from './routes/routes';
import useAuth from './hooks/auth.hook';

const App = (props:IProps)=>{
    const {isAuth} = useAuth()

    return(
        <React.Fragment>
            {isAuth ?
                <Layout>
                    <Routes isAuth={isAuth} />
                </Layout>
            : <Routes isAuth={isAuth} />}
        </React.Fragment>
    )
}

export default withRouter(App)

