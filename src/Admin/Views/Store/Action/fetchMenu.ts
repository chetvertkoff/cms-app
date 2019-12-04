import { FETCH_MENU,FETCH_MENU_ITEMS } from './../Types/types';
import xhr from './../../lib/xhr';

export const fetchMenu = ()=>dispatch=>(
    xhr('GET', `http://localhost:5000/menu`, null)
     .then(data=>dispatch(dfetchMenu(data)))
)

export const fetchMenuItemsById =(idn:number)=>dispatch=>{
    xhr('GET',`http://localhost:5000/parentPage/${idn}`, null)
     .then(data=>{
     dispatch(dfetchMenuItemsById(data))
    })
}

const dfetchMenu=(data)=>({
    type:FETCH_MENU,
    payload: data
})

const dfetchMenuItemsById=(data)=>({
    type:FETCH_MENU_ITEMS,
    payload: data
})