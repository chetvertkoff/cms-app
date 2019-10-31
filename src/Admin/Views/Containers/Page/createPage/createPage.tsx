import React from 'react';
import { IProps } from './../../../Types/index.d';
import Caption from './parts/caption';
import Meta from './parts/meta';
import Body from './parts/body';
import Title from './../../common/title/title';

const CreatePage = (props:IProps) => {
    return (
        <React.Fragment>
            <Title title={'Создать новую'} classN={"fa-file-text"} {...props}/>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile row">
                        <div className="col-md-12 row">
                            <Caption />
                            <Body />
                            <Meta />
                            <div className="col-md-12">
                                <button className="btn btn-primary pull-right">
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

export default CreatePage;
