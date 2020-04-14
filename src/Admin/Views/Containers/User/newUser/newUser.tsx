import React, { useState, useCallback, useEffect } from 'react';
import TextInput from './../../../Components/UI/textInput/textInput';
import FileInput from '../../../Components/UI/fileInput/fileInput';
import xhr from './../../../lib/xhr';

type User={
  _id?: string,
  id?: number,
  login:string,
  password: string,
  name?:string,
  role?: string,
  avatar?: string
}

const NewUser = (props) => {
  const [avatar, setAvatar] = useState(null)
  const [name, setName] = useState(null)
  const [role, setRole] = useState(null)
  const [login, setLogin] = useState(null)
  const [pass, setPass] = useState(null)
  
  const [isNotValid, setValid] = useState({
    name: false,
    login: false,
    pass: false
  })

  const [hasUserError, setHasUserError] = useState(false)

  const getAvatar = (img:string):void=>{
    setAvatar(img)
  }

  const getName = (label:string, value: string):void=>{
    if(isNotValid.name){
      isNotValid.name = !isNotValid.name
      setValid({...isNotValid})
    }
    setName(value)
  }

  const getRole = (label:string, value: string):void=>{
    setRole(value)
  }

  const getLogin = (label:string, value: string):void=>{
    if(isNotValid.login){
      isNotValid.login = !isNotValid.login
      setValid({...isNotValid})
    }
    if(hasUserError){
      setHasUserError(!hasUserError)
    }
    setLogin(value)
  }

  const getPass = (label:string, value: string):void=>{
    if(isNotValid.pass ){
      isNotValid.pass = !isNotValid.pass
      setValid({...isNotValid})
    }
    setPass(value)
  }

  const addUser = ()=>{
    if(!name)isNotValid.name = true
    if(!login) isNotValid.login = true
    if(!pass) isNotValid.pass = true
    setValid({...isNotValid})
    const isError:boolean = Object.values(isNotValid).find(el=>el === true)

    if(!isError){      
      const prepareData:User = {
        name: name,
        role:  role,
        login: login,
        password: pass,
        avatar: avatar
      }
      xhr('POST', '/api/user/newUser',{...prepareData})
       .then(res=>{
        if(res.status == 409){
          setHasUserError(true)
        }
         if(res.status == 200){
          setAvatar(null)
          setName(null)
          setPass(null)
          setRole(null)
          setLogin(null)
          props.fetchUsers()  
         }
       })
    }
  }

  return (
    <div className="tile col-md-12">
        <h2 style={{textAlign:"center"}}>Добавить нового пользователя</h2>
        <div className="row">
          <div className="col-md-2">
            <TextInput value={name} required isInvalid={isNotValid.name} changeInput={getName} label="Имя" />
          </div>
          <div className="col-md-2">
            <TextInput value={role} changeInput={getRole} label="Роль" />
          </div>
          <div className="col-md-2">
            <TextInput value={login} required isInvalid={isNotValid.login} changeInput={getLogin} label="Логин" />
          </div>
          <div className="col-md-3">
            <TextInput value={pass} required isInvalid={isNotValid.pass} changeInput={getPass} label="Пароль" />
          </div>
          <div className="col-md-3 bold avatar">
            <p>Аватар</p>
            {
              avatar ? 
              <img src={avatar} alt=""/>
              :
              <FileInput getAvatar={getAvatar} />
            }
          </div>
          <div className="col-md-3">
            <p><br/></p>
            <button onClick={addUser} className="btn btn-primary">
              Добавить пользователя
            </button>
            {
              hasUserError && <div style={{position:'initial'}} className="inputError">Пользователь с данным логином уже существует</div>
            }
          </div>
        </div>
    </div>
  );
}

export default NewUser
