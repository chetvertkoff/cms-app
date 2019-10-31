import React from 'react';

const UserInfo = () => {
    return (
        <div className="app-sidebar__user">
            <img 
                className="app-sidebar__user-avatar" 
                src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg"  
                alt=""
            />
            <div>
                <p className="app-sidebar__user-name">Четвертков Кирилл</p>
                <p className="app-sidebar__user-designation">Разработчик</p>
            </div>
        </div>
    );
}

export default UserInfo;
