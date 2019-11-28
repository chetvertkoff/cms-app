import React from 'react';
import TextInput from './../../../../Components/UI/textInput/textInput';
import Textarea from './../../../../Components/UI/textarea/textarea';
import { IProps } from './../../../../Types/index.d';

const Meta = (props:IProps) => {
    
    const changeInput=(label,value)=>{
        props.getData(label,value)
       
    }

    return (
        <React.Fragment>
            <div className="col-md-4">
                <TextInput changeInput={changeInput} label={"Title"}/>
            </div>
            <div className="col-md-4">
                <TextInput changeInput={changeInput} label={"Keywords"}/>
            </div>
            <div className="col-md-4">
                <TextInput changeInput={changeInput} label={"Description"}/>
            </div>
        </React.Fragment>
    );
}

export default Meta;
