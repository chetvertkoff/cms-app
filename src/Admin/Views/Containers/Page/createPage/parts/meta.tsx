import React, {useState, useEffect} from 'react';
import TextInput from './../../../../Components/UI/textInput/textInput';
import { IProps } from './../../../../Types/index.d';

const Meta = (props:IProps) => {

    const [title, setTitle] = useState(props.data? props.data.metaTitle : '')
    const [keywords, setKeywords] = useState(props.data? props.data.metaKeywords : '')
    const [description, setDescription] = useState(props.data? props.data.metaDescription : '')

    useEffect(() => {
        if(props.data){
            props.data.metaTitle && setTitle(props.data.metaTitle)
            props.data.metaKeywords && setKeywords(props.data.metaKeywords)
            props.data.metaDescription && setDescription(props.data.metaDescription)
        }
    })

    const changeInput=(label,value)=>{    
        switch (label) {
            case 'Title':
                setTitle(value)
                setTimeout(() => {
                    props.getData(label,value)
                }, 0);
            break;
            case 'Keywords':
                setKeywords(value)

                setTimeout(() => {
                    props.getData(label, value)
                }, 0);
            break;
            case 'Description':
                setDescription(value)
                setTimeout(() => {
                    props.getData(label, value)
                }, 0);
            break;              
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            {
                title ?
                <div className="col-md-4">
                    <TextInput key={1} changeInput={changeInput} value={title}  label={"Title"}/>
                </div>
                :
                <div className="col-md-4">
                    <TextInput key={1} changeInput={changeInput} label={"Title"}/>
                </div>
                }
                {
                   keywords ? 
                    <div className="col-md-4">
                        <TextInput key={2} changeInput={changeInput} value={keywords}  label={"Keywords"}/>
                    </div>
                    :
                    <div className="col-md-4">
                        <TextInput key={2} changeInput={changeInput} label={"Keywords"}/>
                    </div>
                }
                {
                    description ? 
                    <div className="col-md-4">
                        <TextInput key={3} changeInput={changeInput} value={description} label={"Description"}/>
                    </div>
                    :
                    <div className="col-md-4">
                        <TextInput key={3} changeInput={changeInput} label={"Description"}/>
                    </div>

                }
        </React.Fragment>
    );
}

export default Meta;
