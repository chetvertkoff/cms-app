import {FETCH_PAGE, FETCH_PAGE_START } from "../Types/types"
import { Pages } from 'Admin/Views/Types';

const initialState:Pages={
    loading: false,
    pages:[
        {
            id: 0,
            title: "",
            body: ""
        }
        
    ]
}

const fetchPages=(state=initialState,action)=>{
    switch (action.type) {
        case FETCH_PAGE_START:
            return{
                ...state,
                loading: true,
            }
        case FETCH_PAGE:
            return{
                ...state,
                loading: false,
                page: action.payload
            }
        default:
            return state
    }
}

export default fetchPages