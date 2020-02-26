import {FETCH_PAGE, FETCH_PAGE_START } from "../Types/types"
import { Pages } from 'Admin/Views/Types';

const initialState:Pages={
    loading: false,
    page:{
        data: [{
            id: 0,
            title: "",
            body: ""
        }],
        length: 0
        
    }
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