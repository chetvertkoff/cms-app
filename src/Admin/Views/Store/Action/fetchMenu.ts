import { FETCH_MENU } from './../Types/types';
import xhr from './../../lib/xhr';

export const fetchMenu = ()=>dispatch=>(
    xhr('GET', 'https://test-4a782.firebaseio.com/adminMenu.json')
     .then(data=>dispatch(dfetchMenu(data)))
)

const dfetchMenu=(data)=>({
    type:FETCH_MENU,
    payload: data
})