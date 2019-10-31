import React, {FunctionComponent } from 'react';



const HeaderInput = () => {
    return (
        <li className="app-search">
            <input className="app-search__input" type="search" placeholder="Search" />
            <button className="app-search__button">
                <i className="fa fa-search"></i>
            </button>
        </li>
    );
}

export default HeaderInput;
