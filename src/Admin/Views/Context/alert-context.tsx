import React,{useState} from 'react';

export const AlertContext = React.createContext(null)

export default ({ children }) => {
    const [isShow, toggleAlert] = React.useState(false)
    const [isDelete, setDelete] = React.useState(false)
    const [id, setId] = React.useState(null)

    const store={
        alert: {isShow :isShow, toggleAlert: toggleAlert},
        delete: {isDelete: isDelete, deletePage:setDelete},
        id: {id: id, setId:setId }
    }
      
    return <AlertContext.Provider value={store}>{children}</AlertContext.Provider>
}