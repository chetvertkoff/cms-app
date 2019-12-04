import { getMenu } from '../model/menu'

export const getFullmenu = (req,res)=>{
    getMenu((data)=>{
        res.send(data)
    })
}