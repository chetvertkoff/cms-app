import { FETCH_PAGES, FETCH_PAGE} from "../Types/types"
import xhr from './../../lib/xhr';
import Page from '../../Types/index'

export const fetchPages =()=>dispatch=>{
    xhr('GET','https://test-4a782.firebaseio.com/pages.json')
     .then(data=>dispatch(dfetchPages(data)))
}


export const fetchPagesById =(idn:number)=>dispatch=>{
    xhr('GET',`http://localhost:5000/page/${idn}`)
        .then(data=>{
        dispatch(dfetchPageById(data))
        })
}

export const fetchPageById =(id)=>dispatch=>{
    xhr('GET',`https://test-4a782.firebaseio.com/pages/${id}.json`)
     .then(data=>{dispatch(dfetchPageById(data))})
}

const dfetchPages=(pages)=>({
    type:FETCH_PAGES, payload:pages
})

const dfetchPageById=(pages)=>({
    type:FETCH_PAGE, payload:pages
})



