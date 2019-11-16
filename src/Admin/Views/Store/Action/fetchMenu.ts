import { FETCH_MENU,FETCH_MENU_ITEMS } from './../Types/types';
import xhr from './../../lib/xhr';

export const fetchMenu = ()=>dispatch=>(
    xhr('GET', 'https://test-4a782.firebaseio.com/adminMenu.json')
     .then(data=>dispatch(dfetchMenu(data)))
)

export const fetchMenuItemsById =(idn:number)=>dispatch=>{
    xhr('GET',`http://localhost:5000/page/${idn}`)
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