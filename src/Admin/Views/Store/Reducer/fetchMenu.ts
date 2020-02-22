import { FETCH_MENU,FETCH_MENU_ITEMS, UPDATE_MENU, FETCH_MENU_START } from './../Types/types';

const initialState={
    loading: false,
    pages:[
        {
            _id: "",
            id: '',
            title: "",
            alias: "",
            isFolder: false,
            parent: '',
            parentName: '',
            path: '',
            isActive: true,
            body: "",
            metaDescription: "",
            metaKeywords: "",
            metaTitle: "",
            hasChild: false
        }
        
    ]
}

const fetchMenu=(state=initialState, action)=>{  
      
    switch (action.type) {
        case FETCH_MENU_START:
            return{
                ...state,
                loading: true
            }
        case FETCH_MENU:
            return{
                ...state,
                loading: false,
                menu: action.payload
            }
        case FETCH_MENU_ITEMS:
            return{
                ...state,
                pages: action.payload
            }
        case UPDATE_MENU:
            return{
                ...state,
                toggler: action.payload
            }
        default:
            return state
    }
}

export default fetchMenu