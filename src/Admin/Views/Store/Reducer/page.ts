import { FETCH_PAGES, FETCH_PAGE } from "../Types/types"
import { IProps,Pages } from 'Admin/Views/Types';


const initialState:Pages={
    pages:[
        {
            userId: 1,
            id: 1,
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
        
    ]
}

const fetchPages=(state=initialState,action)=>{
    switch (action.type) {
        case FETCH_PAGES:
            return{
                ...state,
                pages: action.payload
            }
        case FETCH_PAGE:
            return{
                ...state,
                page: action.payload
            }
        default:
            return state
    }
}

export default fetchPages