import React, { useState, useEffect, useCallback } from 'react';
import useAuth from './../../../../hooks/auth.hook';
import { User } from '../../../../Types';

const UserInfo = () => {
    const [user, setUser] = useState(null)
    const {getUserInfo} = useAuth()

    useEffect(()=>{
        const user:User = getUserInfo()
        setUser(user)
    },[])
    console.log(user);
    
    return (
        <div className="app-sidebar__user">
            <img 
                className="app-sidebar__user-avatar" 
                src={user  ? user.profile.avatar : '/icons/no-avatar.png'}
                alt=""
            />
            <div>
                <p className="app-sidebar__user-name">{user && user.profile.name}</p>
                <p className="app-sidebar__user-designation">{user && user.profile.role}</p>
            </div>
        </div>
    );
}

export default UserInfo;
