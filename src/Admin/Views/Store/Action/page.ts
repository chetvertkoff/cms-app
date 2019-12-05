import {FETCH_PAGE} from "../Types/types"
import xhr from './../../lib/xhr';
import Page from '../../Types/index'


export const fetchParentPageById =(id:number)=>dispatch=>{
    xhr('GET',`http://localhost:5000/parentPage/${id}`, null)
     .then(data=>{dispatch(dfetchPageById(data))})
}

export const fetchPageById =(id)=>dispatch=>{
    xhr('GET',`http://localhost:5000/page/${id}`,null)
     .then(data=>{dispatch(dfetchPageById(data))})
}


const dfetchPageById=(pages)=>({
    type:FETCH_PAGE, payload:pages
})



