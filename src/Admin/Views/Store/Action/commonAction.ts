import { IS_DROP_DOWN_SHOW, IS_TOGGLE_SIDEBAR,IS_LOADED, MENU_TOGGLE, NEW_PAGE_OPTIONS } from '../Types/types'
import { IProps } from '../../Types/index'

export const toggleDropDown = (bool:boolean):IProps=>({
    type:IS_DROP_DOWN_SHOW,
    payload:bool
})

export const toggleSideBarAction = (bool:boolean):IProps=>({
    type:IS_TOGGLE_SIDEBAR,
    payload:bool
})

export const load = (bool:boolean):IProps=>({
    type:IS_LOADED,
    payload:bool
})

export const toggleMenuItem = (bool:boolean)=>({
    type:MENU_TOGGLE,
    payload:bool
})

export const sendOptions = (options)=>({
    type: NEW_PAGE_OPTIONS,
    payload:options
})

