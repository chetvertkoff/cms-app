import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {useHistory} from 'react-router-dom'
import xhr from './../lib/xhr'
import { User } from '../Types'

const useAuth = () => {
  const history = useHistory()
  const [token, setToken] = useState(localStorage.getItem('jwt')) 
  const [isAuth, setAuth] = useState(null)

  const toLogin = useCallback(()=>{
    setAuth(false)
    setToken(null)
    if(history.location.pathname != '/admin/login'){
      return history.push(`/admin/login`)
    }

  },[])

  const successLogin = useCallback((result)=>{
    localStorage.setItem('jwt',result.token)
    localStorage.setItem('user', JSON.stringify(result.user))
    setToken(token)
    history.push('/admin')
  },[])

  const getUserInfo = ():User=>{
    const user:User = JSON.parse(localStorage.getItem('user')) 
    return user
  }

  const logOut = useCallback(()=>{
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    setAuth(null)
    setToken(null)
    return history.push(`/admin/login`)
  },[])

  useEffect(()=>{
    const getToken = localStorage.getItem('jwt')    
    if(!getToken){
        toLogin() 
    }
    else{
      if(history.location.pathname != '/admin/login'){
        xhr('GET', '/api/user/', null, {
          Authorization: getToken
        })
          .then(data=>{
            if(!data && data.auth != 'ok') toLogin()
            else setAuth(true)
          }) 
          .catch(err=>toLogin())
      }
    }

  })

  return {token,isAuth, successLogin,logOut, getUserInfo}
}

export default useAuth
