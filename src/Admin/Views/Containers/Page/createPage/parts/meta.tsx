import React from 'react';
import TextInput from './../../../../Components/UI/textInput/textInput';
import Textarea from './../../../../Components/UI/textarea/textarea';

const Meta = () => {
    return (
        <React.Fragment>
            <div className="col-md-4">
                <TextInput label={"Title"}/>
            </div>
            <div className="col-md-4">
                <TextInput  label={"Keywords"}/>
            </div>
            <div className="col-md-4">
                <Textarea label={"Description"}/>
            </div>
        </React.Fragment>
    );
}

export default Meta;
