import React from 'react';
import Checkbox from '../../../../Components/UI/checkbox/checkbox';
import TextInput from '../../../../Components/UI/textInput/textInput';
import { IProps } from './../../../../Types/index.d';


const Caption = (props:IProps) => {
    
    if(props.data){
        return (
            <React.Fragment >
                <div className="col-md-2">
                    <Checkbox label={"Активность"} />    
                </div>
                <div className="col-md-5">
                    <TextInput label={"Заголовок"} value={props.data.title} />
                </div>
                <div className="col-md-5">
                    <TextInput label={"Алиас"} value={props.data.alias} />
                </div>
            </React.Fragment>
        )
    }else{
        return (
            <React.Fragment >
                <div className="col-md-2">
                    <Checkbox label={"Активность"} />    
                </div>
                <div className="col-md-2">
                    <Checkbox label={"Контейнер"} />    
                </div>
                <div className="col-md-4">
                    <TextInput label={"Заголовок"}  />
                </div>
                <div className="col-md-4">
                    <TextInput label={"Алиас"} />
                </div>
            </React.Fragment>
        )
    }
    
}

export default Caption;
