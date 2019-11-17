// APP props
export interface IProps{
    loading?:boolean,
    toggled?:boolean,
    toggle?:boolean,
    toggleSide?:(e:any)=>void,
    dropDownShow?:boolean,
    show?:boolean,
    toggleMenu?:(e:any)=>void,
    count?: number,
    className?: string,
    payload?: any,
    type?:string,
    commonReducer?:Common,
    toggleDropDown?:(e:boolean)=>Common,
    sideBarShow?: boolean,
    toggleSideBarAction?:(e:boolean)=>Common,
    isLoaded?:boolean,
    load?:()=>void,
    children?:any,
    fetchPages?:()=>Pages,
    pages?:Tree | any,
    item?:any,
    tree?:Tree,
    toggleMenuItem?:any,
    map?:any,
    collapsed?:boolean,
    fetchPageById?:(e:number)=>Tree,
    match?:any,
    page?:Tree,
    label?: string,
    value?: string,
    title?:string,
    alias?: string,
    data?:Pages,
    fetchMenu?:()=>Menus,
    menu?: Menus,
    fetchPagesById?:(e:number)=>Page,
    classN?: string,
    fetchMenuItemsById?:(e:number)=>void,
    getPageMenu?:(e:number)=>void
}

export interface IState{
    memory?: Array<number>,
    arr?: Tree,
    collapsed?: boolean
}

// reducer states
export interface Common{
    dropDownShow?:boolean,
    sideBarShow?: boolean,
    isLoaded?:boolean,
    toggleMenu?: boolean
}

export interface Pages{
    pages:[{
        userId?: number,
        id?: number,   
        title?: string,
        body?: string
    }],
    title?:string,
    alias?:string
}

export interface Page{
    number:[{
        id?: number,
        title?: string,
        alias?: string,
        isFolder?: boolean,
        parent?: number,
        items?:Tree,
    }],
    filterOb?:(e:Page, id:number | string)=>Page
}

export interface Menus{
    menu:[{
        alias?:string,
        class?:string,
        hasPages?: boolean,
        id?: number,
        title?: string,
    }],
    pages: Tree
}

export interface Tree{
    id?: number,
    title?: string,
    alias?: string,
    isFolder?: boolean,
    parent?: number,
    pages?:Tree,
    page?:Tree,
    items?:Tree,
    map?:any,
    length?:number
}











  