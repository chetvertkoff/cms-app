import React, { useState } from 'react';
import xhr from './../../../lib/xhr';

const UserItem = (props) => {
  const [user] = useState(props.info)
  const currentUserId:number = props.currentUserId
  
  const deleteUser = ():void=>{
    try {
      xhr('DELETE',`http://localhost:5000/api/user/deleteUser/${user.id}`)
       .then(res=>{
         if(res.status == 200){
          props.fetchUsers()  
         }
       })
    } catch (error) {
      
    }
  }
  
  return (
    <div className="col-md-4" >
      <div className="tile user">
          {user.profile.avatar ? 
            <img src={user.profile.avatar} alt=""/>
            : 
            <img src="/icons/no-avatar.png" alt=""/>
          } 
          <h4>{user.profile.name}</h4>
          {user.profile.role && <p>{user.profile.role}</p>}
          {
            currentUserId != user.id && <i onClick={deleteUser} className="fa fa-lg fa-trash deleteUser"></i>
          }
      </div>
    </div>
  );
}

export default UserItem;
