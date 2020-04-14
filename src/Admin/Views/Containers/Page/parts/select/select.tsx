import React from 'react';
import SelectItem from './selectItem/selectItem';

const Select = () => {
    return (
        <div className="col-sm-12 col-md-6">
            <div className="dataTables_length">
                <label>
                    Показать&nbsp;
                    <select className="form-control form-control-sm">
                        <SelectItem />
                    </select>
                    &nbsp;страниц
                </label>
            </div>
        </div>
    );
}

export default Select;
