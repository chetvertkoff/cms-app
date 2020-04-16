// APP props
export interface IProps{
    history?: any,
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
    fetchPages?:any,
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
    fetchParentPageById?:(e:number, l?:number)=>Page,
    classN?: string,
    fetchMenuItemsById?:(e:number)=>void,
    getPageMenu?:(e:number)=>void,
    options?: Options,
    required?: boolean,
    url?: string,
    blur?:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    path?: string,
    sendOptions?: (e:Options)=>void,
    isInvalid?: boolean,
    toggleCheck?: (e:boolean | string)=>void | boolean,
    changeInput?:(a: string, b: string)=>void,
    getData?: (a: string, b: string | boolean)=>void,
    checked?: boolean,
    getFromTextEditor?:(e:string)=>void,
    defaultValue?: string,
    updateMenu?:(e:boolean)=>void,
    deletePage?: (e: number)=>void,
    id?: number | any,
    update?: boolean,
    pagesLength?: number,
    isAuth?:boolean
}

export interface IState{
    memory?: Array<number>,
    arr?: Tree,
    pageLimit?: number,
    collapsed?: boolean,
    search?: Tree,
    url?: string,
    active?: boolean,
    isContainer?: boolean,
    container?: boolean,
    options?: Options,
    title?: string,
    alias?: string,
    body?: string,
    metaTitle?: string,
    metaKeywords?: string,
    metaDescription?: string,
    isInvalid?: boolean,
    fields?: Fields,
    unClicked?: boolean,
    showMenu?: boolean,
    limit?: number
}

// reducer states
export interface Common{
    dropDownShow?:boolean,
    sideBarShow?: boolean,
    isLoaded?:boolean,
    toggleMenu?: boolean,
    options?: Options
}

export interface Pages{
    pages?:[{
        userId?: number,
        id?: number,   
        title?: string,
        body?: string
    }],
    title?: string,
    alias: string,
    _id?: number,
    metaTitle?: string,
    metaKeywords?: string,
    metaDescription?: string
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
    length?:number,
    _id?:string,
    filter?: (e:any)=>Tree,
    data?: Fields
}

type Options={
    id?: number,
    path?: string
}

type Fields={
    _id?: number,
    alias?: string,
    isFolder?: boolean,
    id?: number,
    title?: string,
    parent?: number
    parentName?: string,
    path?: string,
    isActive?: boolean,
    body?: string
    metaTitle?: string,
    metaKeywords?: string,
    metaDescription?: string
}

type User={
    _id?: string,
    id?: number,
    login:string,
    password: string,
    name?:string,
    role?: string,
    avatar?: string
}










  