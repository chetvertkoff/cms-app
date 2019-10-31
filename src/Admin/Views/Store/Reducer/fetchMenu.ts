import { FETCH_MENU } from './../Types/types';

const initialState={
    a:'1'
}

export const fetchMenu=(state=initialState, action)=>{
    switch (action.type) {
        case FETCH_MENU:
            return{
                ...state,
                menu: action.payload
            }
        default:
            return state
    }
}