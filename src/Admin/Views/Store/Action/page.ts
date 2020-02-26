import {FETCH_PAGE} from "../Types/types"
import xhr from './../../lib/xhr';
import Page from '../../Types/index'
import { FETCH_PAGE_START } from './../Types/types';


export const fetchParentPageById =(id:number, limit?:number)=>dispatch=>{
    var query: string | number
    
    if(limit) query = `?limit=${limit}`
    else query = '?limit=15'
    
    dispatch(dfetchPageStart())
    new Promise((resolve, reject)=>{
        setTimeout(() =>resolve(), 500)
    })
     .then(()=>{
        xhr('GET',`/api/parentPage/${id}${query}`, null)
        .then(data=>{
            console.log(data.length);
            
            dispatch(dfetchPageById(data))
        })
     })
}

export const fetchPageById =(id)=>dispatch=>{

    dispatch(dfetchPageStart())
    new Promise((resolve, reject)=>{
        setTimeout(()=>resolve(), 500)
    })
     .then(()=>{
        xhr('GET',`/api/page/${id}`,null)
         .then(data=>{
            dispatch(dfetchPageById(data))})
     })
}


const dfetchPageById=(pages)=>({
    type:FETCH_PAGE, payload:pages
})

const dfetchPageStart =()=>({
    type: FETCH_PAGE_START
})


