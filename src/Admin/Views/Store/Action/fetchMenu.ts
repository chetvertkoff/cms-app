import { FETCH_MENU,FETCH_MENU_ITEMS, UPDATE_MENU, FETCH_MENU_START } from './../Types/types';
import xhr from './../../lib/xhr';

export const fetchMenu = ()=>dispatch=>{
    dispatch(dfetchMenuStart())
    new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve()
        }, 500);
    }).then(()=>{
        xhr('GET', `/api/menu`, null)
        .then(data=>dispatch(dfetchMenu(data)))
    })
}


export const fetchMenuItemsById =(idn:number)=>(dispatch):void=>{

    xhr('GET',`/api/parentPage/${idn}`, null)
        .then(data=>{
        dispatch(dfetchMenuItemsById(data))
        })
}

export const updateMenu = (toggler: boolean)=>(dispatch):void=>{
    dispatch(dUpdateMenu(toggler))
}

const dfetchMenu=(data)=>({
    type:FETCH_MENU,
    payload: data
})

const dfetchMenuItemsById=(data)=>({
    type:FETCH_MENU_ITEMS,
    payload: data
})

const dUpdateMenu = (data)=>({
    type:UPDATE_MENU,
    payload: data
})

const dfetchMenuStart =()=>({
    type: FETCH_MENU_START
})