import React from 'react';

const Search = (props) => {
    return (
        <div className="col-sm-12 col-md-6">
            <div className="dataTables_filter">
                <label>
                    Поиск:
                    <input type="search" onChange={props.handleChange} className="form-control form-control-sm" />
                </label>
            </div>
        </div>
    );
}

export default Search;
