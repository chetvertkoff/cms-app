import React, { useState, useEffect, useCallback } from 'react';
import Title from './../common/title/title';
import UserItem from './users/userItem';
import NewUser from './newUser/newUser';
import useAuth from '../../hooks/auth.hook';
import { User } from '../../Types';
import xhr from './../../lib/xhr';
import Preloader from './../../Components/UI/preloader/preloader';

const Users = (props) => {
  const [users, setUsers] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [load, setLoad] = useState(false)
  const {getUserInfo} = useAuth() 

  const fetchUsers = useCallback(()=>{
    setLoad(true)
    xhr('GET','/api/user/getUsers')
    .then(data=>{
      setUsers([...data])
        setLoad(false)
    })
  },[])

  useEffect(()=>{
    fetchUsers()
  }, [])

  useEffect(()=>{
    const user:User = getUserInfo()
    setCurrentUser(user)
  },[])

  return (
    <>
      {
        load ? <Preloader/>
        :
        <div>
          <Title title={'Профиль'} classN={"fa-file-text"} {...props}/>
          <div className="users row f">
            {
              currentUser && currentUser.id == 0 ?
                users && users.map((u,i)=>{
                  return <UserItem fetchUsers={fetchUsers} currentUserId={currentUser.id} key={i} info={u} />
                })
              :
              currentUser && <UserItem currentUserId={currentUser.id} info={currentUser} />
            }
            {currentUser && currentUser.id == 0 && <NewUser fetchUsers={fetchUsers} />}
          </div>
        </div>
      }
    </>
  )
}

export default Users
