import React from 'react';
import { IProps, IState } from './../../../Types/index.d';
import Caption from './parts/caption';
import Meta from './parts/meta';
import Body from './parts/body';
import Title from './../../common/title/title';
import xhr from './../../../lib/xhr';

class CreatePage  extends React.Component<IProps, IState>{
    constructor(props){
        super(props)

        this.state={
            options: this.getOptions(),
            active: false,
            isContainer: false,
            title: null,
            alias: null,
            body: null,
            metaTitle: null,
            metaKeywords: null,
            metaDescription: null,
            isInvalid: false
        }

        this.getOptions = this.getOptions.bind(this)
    }

    shouldComponentUpdate(nexProps, nextState){
        if(nextState.active !== this.state.active
        || nextState.alias !== this.state.alias  
        || nextState.isContainer !== this.state.isContainer  
        || nextState.isInvalid !== this.state.isInvalid  
        ){
            return true
        }
        return false
    }

    getOptions=()=>(
        JSON.parse(localStorage.getItem('options'))
    )
    
    getData=(label,value)=>{
        switch (label) {
            case 'Заголовок':
                this.setState({
                    title: value
                })
                break;
            case 'Алиас':
                this.setState({
                    alias: value
                })
                break;
            case 'Активность':
                this.setState({
                    active: value
                })
                break;
            case 'Контейнер':
                this.setState({
                    isContainer: value
                })
                break;
            case 'Title':
                this.setState({
                    metaTitle: value
                })
                break;
            case 'Keywords':
                this.setState({
                    metaKeywords: value
                })
                break;
            case 'Description':
                this.setState({
                    metaDescription: value
                })
                break;
        }
    }

    sendData = ()=>{
        if(this.state.title == null || this.state.title == ''){
            this.setState({
                isInvalid: true
            })
            return false
        }
        console.log(this.state);
        
        try {
            xhr('POST','http://localhost:5000/parentPage',this.state)  
             .then(data=>{
                this.props.history.push(`/update/${JSON.parse(data).id}/?create=success`);
             }) 
        } catch (error) {
            return error
        }
        
    }

    getFromTextEditor = (text:string)=>{
        this.setState({
            body: text
        })
    }

    render(){
        
        return (
            <React.Fragment>
                <Title title={'Создать новую'} classN={"fa-file-text"} path={this.state.options.path}/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="tile row">
                            <div className="col-md-12 row">
                                <Caption getData={this.getData} isInvalid={this.state.isInvalid} />
                                <Body getFromTextEditor={this.getFromTextEditor} />
                                <Meta getData={this.getData} />
                                <div className="col-md-12">
                                    <button onClick={this.sendData} className="btn btn-primary pull-right">
                                        Опубликовать
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default CreatePage
