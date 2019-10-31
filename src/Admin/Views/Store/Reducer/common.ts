import { IS_DROP_DOWN_SHOW, IS_TOGGLE_SIDEBAR,IS_LOADED, MENU_TOGGLE } from '../Types/types';
import { IProps, Common } from '../../Types/index'

const initialState:Common={
    dropDownShow: false,
    sideBarShow: false,
    isLoaded:true,
    toggleMenu: false
}

const commonReducer=(state=initialState,action:IProps)=>{
    switch(action.type){
        case IS_DROP_DOWN_SHOW:
            return{
                ...state,
                dropDownShow: !action.payload
            }
        case IS_TOGGLE_SIDEBAR:
            return{
                ...state,
                sideBarShow: !action.payload
            }
        case MENU_TOGGLE:
            return{
                ...state,
                toggleMenu: !action.payload
            }
        case IS_LOADED:
            return{
                ...state,
                isLoaded: false
            }
        default:
            return state
    }
}

export default commonReducer