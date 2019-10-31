import { FETCH_PAGES, FETCH_PAGE} from "../Types/types"
import xhr from './../../lib/xhr';
import Page from '../../Types/index'

export const fetchPages =()=>dispatch=>{
    xhr('GET','https://test-4a782.firebaseio.com/pages.json')
     .then(data=>dispatch(dfetchPages(data)))
}


export const fetchPagesById =(idn:number)=>dispatch=>{
    xhr('GET','https://test-4a782.firebaseio.com/pages.json')
     .then(data=>{
        arr=[]

        return filterOb(data,idn)
     })
     .then(data=>dispatch(dfetchPageById(data)))
}

export const fetchPageById =(id)=>dispatch=>{
    xhr('GET',`https://test-4a782.firebaseio.com/pages/${id}.json`)
     .then(data=>{console.log(data);dispatch(dfetchPageById(data))})
}

const dfetchPages=(pages)=>({
    type:FETCH_PAGES, payload:pages
})

const dfetchPageById=(pages)=>({
    type:FETCH_PAGE, payload:pages
})


var arr = []
const filterOb =(obj,id:number | string)=>{       
    obj.map(item=>{
        if(item.isFolder){
            if(item.parent == id){
                arr.push(item)
            }
            const items = Object.keys(item.items).map(i=>item.items[i])
            filterOb(items, id)
        }else{
            if(item.parent == id){
                arr.push(item)
            }
        }
    })    
    return arr
}

