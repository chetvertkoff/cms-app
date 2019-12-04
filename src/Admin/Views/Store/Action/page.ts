import { FETCH_PAGES, FETCH_PAGE} from "../Types/types"
import xhr from './../../lib/xhr';
import Page from '../../Types/index'


export const fetchParentPageById =(idn:number)=>dispatch=>{
    xhr('GET',`http://localhost:5000/parentPage/${idn}`, null)
        .then(data=>{
        dispatch(dfetchPageById(data))
        })
}

export const fetchPageById =(id)=>dispatch=>{
    xhr('GET',`https://test-4a782.firebaseio.com/pages/${id}.json`,null)
     .then(data=>{dispatch(dfetchPageById(data))})
}


const dfetchPageById=(pages)=>({
    type:FETCH_PAGE, payload:pages
})



