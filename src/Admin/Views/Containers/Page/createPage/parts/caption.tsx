import React from 'react';
import Checkbox from '../../../../Components/UI/checkbox/checkbox';
import TextInput from '../../../../Components/UI/textInput/textInput';
import { IProps, IState } from './../../../../Types/index.d';
import cyrillicToTranslit from 'cyrillic-to-translit-js'

class Caption extends React.Component<IProps, IState>{
    constructor(props){
        super(props)

        this.state = {
            fields: this.getFields()
        }

        this.toggleCheck = this.toggleCheck.bind(this)
    }


    
    componentDidUpdate(prevProps, prevState){
        if(this.props.data && this.props.data._id != prevProps.data._id 
        ){
            if(this.props.data){
                this.setState({
                    fields: this.props.data
                })
                return true
            }
        }
        return false
    }

    getFields=()=>{
        if(this.props.data){
            return this.props.data
        }
        return {
            title: '',
            alias: '',
            isFolder: false,
            isActive: false
        }
    }

    blur = (text)=>{
        
        if(text.target.value  && text.target.value !== ''){
            const alias = new cyrillicToTranslit().transform(text.target.value)

            this.setState({
                fields:{
                    ...this.state.fields,
                    alias: '/'+alias.replace(/ /g, "-").toLowerCase()
                }
            })
            setTimeout(() => {
                this.props.getData('Алиас','/'+alias.replace(/ /g, "-").toLowerCase())
            }, 0);

        }else{
            if(this.state != null){
                            this.setState({
                fields:{
                    ...this.state.fields,
                    alias: null
                }
            })
            }
        }
    }

    toggleCheck=(e)=>{
        switch (e) {
            case 'Контейнер':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        isFolder: !this.state.fields.isFolder
                    }
                })
                setTimeout(() => {
                    this.props.getData(e,this.state.fields.isFolder)
                }, 0);
                break;
            case 'Активность':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        isActive: !this.state.fields.isActive
                    }
                })
                setTimeout(() => {
                    this.props.getData(e,this.state.fields.isActive)
                }, 0);
                break;
            default:
                break;
        }
    }

    changeInput=(label,value)=>{
        switch (label) {
            case 'Заголовок':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        title: value
                    }
                })
                setTimeout(() => {
                    this.props.getData(label,this.state.fields.title)
                }, 0);
            break;
            case 'Алиас':
                this.setState({
                    fields:{
                        ...this.state.fields,
                        alias: value
                    }
                })
                setTimeout(() => {
                    this.props.getData(label,this.state.fields.alias)
                }, 0);
                break;
            default:
                break;
        }
        // this.props.getData(label,value)
    }
    
    render(){
console.log(this.state);

        return (
            <React.Fragment >
                <div className="col-md-2">
                    {
                        this.state.fields.isActive ? 
                        <Checkbox key={0} checked={true} toggleCheck={this.toggleCheck} label={"Активность"} />  
                        :
                        <Checkbox key={0} toggleCheck={this.toggleCheck} label={"Активность"} />  
                    }  
                </div>
                <div className="col-md-2">
                    {
                        this.state.fields.isFolder ? 
                        <Checkbox key={1} checked={true} toggleCheck={this.toggleCheck} label={"Контейнер"} />    
                        :
                        <Checkbox key={1} toggleCheck={this.toggleCheck} label={"Контейнер"} />   
                    }
                </div>
                <div className="col-md-4">
                {
                    this.state.fields.title? 
                        <TextInput 
                            key={2}
                            required={true} 
                            changeInput={this.changeInput} 
                            label={"Заголовок"} 
                            value={this.state.fields.title}
                            isInvalid={this.props.isInvalid} 
                            blur={this.blur}  
                        />
                    : 
                        <TextInput 
                            key={2}
                            required={true} 
                            changeInput={this.changeInput} 
                            blur={this.blur}  
                            label={"Заголовок"} 
                            isInvalid={this.props.isInvalid} 
                            value={this.state.fields.title}
                        />
                }
                </div>
                <div className="col-md-4">
                {
                    this.state.fields.alias? 
                        <TextInput 
                            key={3} 
                            label={"Алиас"} 
                            changeInput={this.changeInput} 
                            value={this.state.fields.alias} 
                        />
                    : 
                        <TextInput 
                            key={3}
                            label={"Алиас"} 
                            changeInput={this.changeInput} 
                            url={this.state.url}
                        />
                    
                }
                </div>
            </React.Fragment>
        )
    }
    
}

export default Caption;
