import {FETCH_PAGE} from "../Types/types"
import xhr from './../../lib/xhr';
import Page from '../../Types/index'
import { FETCH_PAGE_START } from './../Types/types';


export const fetchParentPageById =(id:number)=>dispatch=>{
    
    dispatch(dfetchPageStart())
    new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve()
        }, 500);
    }).then(()=>{
        xhr('GET',`/api/parentPage/${id}`, null)
        .then(data=>{dispatch(dfetchPageById(data))})
    })
}

export const fetchPageById =(id)=>dispatch=>{
    console.log(id);
    
    dispatch(dfetchPageStart())
    new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve()
        }, 500);
    }).then(()=>{
    xhr('GET',`/api/page/${id}`,null)
     .then(data=>{
        dispatch(dfetchPageById(data))
    })
    })
}


const dfetchPageById=(pages)=>({
    type:FETCH_PAGE, payload:pages
})

const dfetchPageStart =()=>({
    type: FETCH_PAGE_START
})


