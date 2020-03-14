import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {useHistory} from 'react-router-dom'
import xhr from './../lib/xhr'

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

  const successLogin = useCallback((newToken)=>{
    localStorage.setItem('jwt',newToken)
    setToken(token)
    history.push('/admin')
  },[])

  const logOut = useCallback(()=>{
    localStorage.removeItem('jwt')
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

  return {token,isAuth, successLogin,logOut}
}

export default useAuth
