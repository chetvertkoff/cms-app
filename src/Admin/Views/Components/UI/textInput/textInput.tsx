import React from 'react';
import { IProps } from './../../../Types/index.d';


const TextInput = (props:IProps) => {

    var classes = ['form-control']
    
    if(props.required && props.isInvalid){
        classes.push('is-invalid')
    }else{
        classes = ['form-control']
    }

    const sendInputValue = (e)=>{
        props.changeInput(props.label, e.target.value)
    }
    
    return (
        <React.Fragment>
            <div className="form-group">
                <label className="control-label">{props.label} {props.required && '*'}</label>
                {
                    props.label === 'Алиас' ?
                        props.url !== null ?
                            <input 
                                type="text" 
                                value={props.value} 
                                className={classes.join(' ')}
                                // onBlur={sendInputValue.bind(this)}
                                onChange={(e)=>{}}
                            />
                        :
                            <input 
                                type="text" 
                                value={props.value} 
                                className={classes.join(' ')}
                                // onBlur={sendInputValue.bind(this)}
                                onChange={(e)=>{}}
                            />
                    :
                        props.label === 'Заголовок' ?
                            <input 
                                type="text" 
                                onBlur={props.blur} 
                                value={props.value} 
                                className={classes.join(' ')}
                                onChange={sendInputValue.bind(this)}
                            />
                        :   
                            <input 
                                type="text" 
                                value={props.value} 
                                className={classes.join(' ')}
                                onBlur={sendInputValue.bind(this)}
                                onChange={(e)=>{}}
                            />
                }
                {
                    props.required && props.isInvalid ? 
                        <div style={{color: '#dc3545'}}>
                            Поле пустое или заполнено некорректно
                        </div>
                    :
                        null
                }
            </div>
            
        </React.Fragment>
    );
}

export default TextInput;
