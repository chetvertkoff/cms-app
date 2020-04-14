import React, { useState, useEffect } from 'react';
import TextInput from './../../Components/UI/textInput/textInput';
import ErrMesage from './errMesage';
import xhr from './../../lib/xhr';
import PageLoadPreloader from './../../Components/UI/preloader/pageLoadPreloader';
import useAuth from './../../hooks/auth.hook';

const Auth = (props) => {
  const {successLogin} = useAuth()
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const [errText, setErr] = useState(null)
  const [authPreloader, setUthPreloader] = useState(false)

  const getLogin = (label:string, value:string):void=>{
    setLogin(value)
  }
  
  const getPass = (label:string, value: string):void=>{
    setPass(value)
  }  
  const getAuth = (e:any):void=>{
    e.preventDefault()
    if(login.length == 0 || pass.length == 0){
      setErr('Проверьте введенные данные')
      return
    }
    setUthPreloader(true)
    xhr('POST', '/api/user/',{
      login: login,
      password: pass
    })
      .then(res=>{
        if(res.status == 400){
          setUthPreloader(false) 
          setErr('Пользователь с такими данными не найден')
        }
        if(res.status == 200){   
          const result = JSON.parse(res.response)    
          setUthPreloader(false)                
          successLogin(result)
        }
      }) 
  }

  return (
    <React.Fragment>
      <section className="material-half-bg">
        <div className="cover"></div>
      </section>
      <section className="login-content">
        <div className="login-box">
          <form className="login-form">
            <h3 className="login-head">
              <i className="fa fa-lg fa-fw fa-user"></i>
                Авторизация
            </h3>
            <div className="form-group">
              <TextInput value={login} changeInput={getLogin} label="Логин" />
            </div>
            <div className="form-group secure-field">
              <TextInput label="Пароль" value={pass} changeInput={getPass} />
            </div>
            <div className="form-group btn-container">
              <button className="btn btn-primary btn-block" onClick={getAuth}>
                <i className="fa fa-sign-in fa-lg fa-fw"></i>
                Вход
              </button>
            </div>
            {
              errText && <ErrMesage message={errText} />
            }
          </form>
        </div>
      </section>
      {authPreloader && <PageLoadPreloader/>}
    </React.Fragment>
  )
}



export default Auth
