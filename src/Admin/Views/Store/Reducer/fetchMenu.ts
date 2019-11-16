import { FETCH_MENU,FETCH_MENU_ITEMS } from './../Types/types';

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

const fetchMenu=(state=initialState, action)=>{  
      
    switch (action.type) {
        case FETCH_MENU:
            return{
                ...state,
                menu: action.payload
            }
        case FETCH_MENU_ITEMS:
            return{
                ...state,
                pages: action.payload
            }
        default:
            return state
    }
}

export default fetchMenu