//vendors
import React from 'react';
import { withRouter } from 'react-router-dom'
import Layout from './hoc/Layout';
// types variable
import { IProps } from './Types';
//routes
import routes from './routes/routes';

class App extends React.Component<IProps>{

    render(){
        return(
            <Layout>
                {routes}
            </Layout>
        )
    }
}
export default withRouter(App)

