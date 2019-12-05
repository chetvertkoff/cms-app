import React from 'react';
import Checkbox from '../../../../Components/UI/checkbox/checkbox';
import TextInput from '../../../../Components/UI/textInput/textInput';
import { IProps, IState } from './../../../../Types/index.d';
import cyrillicToTranslit from 'cyrillic-to-translit-js'

class Caption extends React.Component<IProps, IState>{
    constructor(props){
        super(props)

        this.state = {
            url:null,
            active: this.getStateActive(), 
            isContainer: false
        }

        this.toggleCheck = this.toggleCheck.bind(this)
    }

    getStateActive = ()=>(
        this.props.data ?
        this.props.data.isActive
        :
        false
    )

    getStateContainer = ()=>(
        this.props.data ?
        this.props.data.isContainer
        :
        false
    )

    blur = (text)=>{
        if(text.target.value != ''){
            const alias = new cyrillicToTranslit().transform(text.target.value)
            this.setState({
                url:'/'+alias.replace(/ /g, "-").toLowerCase()
            })
            setTimeout(() => {
                this.props.getData('Алиас','/'+alias.replace(/ /g, "-").toLowerCase())
            }, 0);

        }else{
            if(this.state != null){
                this.setState({
                    url:null
                })
            }
        }
    }

    toggleCheck=(e)=>{
        switch (e) {
            case 'Контейнер':
                this.setState({
                    isContainer: !this.state.isContainer
                })
                // setTimeout(() => {
                //     this.props.getData(e,this.state.isContainer)
                // }, 0);
                break;
            case 'Активность':
                this.setState({
                    active: !this.state.active
                })
                // setTimeout(() => {
                //     this.props.getData(e,this.state.active)
                // }, 0);
                break;
            default:
                break;
        }
    }

    changeInput=(label,value)=>{
        this.props.getData(label,value)
    }
    
    render(){
        console.log(this.props.data);
        return (
            <React.Fragment >
                <div className="col-md-2">
                    {
                        this.state.active ? 
                        <Checkbox key={0} checked={true} toggleCheck={this.toggleCheck} label={"Активность"} />  
                        :
                        <Checkbox key={0} toggleCheck={this.toggleCheck} label={"Активность"} />  
                    }  
                </div>
                <div className="col-md-2">
                    <Checkbox key={1} toggleCheck={this.toggleCheck} label={"Контейнер"} />    
                </div>
                <div className="col-md-4">
                {
                    this.props.data ? 
                        <TextInput 
                            key={2}
                            required={true} 
                            changeInput={this.changeInput} 
                            label={"Заголовок"} 
                            value={this.props.data.title}
                            isInvalid={this.props.isInvalid} 
                        />
                    : 
                        <TextInput 
                            key={2}
                            required={true} 
                            changeInput={this.changeInput} 
                            blur={this.blur}  
                            label={"Заголовок"} 
                            isInvalid={this.props.isInvalid} 
                        />
                }
                </div>
                <div className="col-md-4">
                {
                    this.props.data ? 
                        <TextInput 
                            key={3} 
                            label={"Алиас"} 
                            changeInput={this.changeInput} 
                            value={this.props.data.alias} 
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
