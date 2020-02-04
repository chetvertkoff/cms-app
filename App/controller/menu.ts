import { getMenu } from '../model/menu'

export const getFullmenu = (req,res)=>{
    try {
        getMenu((data, error)=>{
            if (!data && !data.length) {
                res.status(404).send('Can not find menu')
            }
            return res.send(data) 
        })   
    } catch (error) {
        res.status(400).send('Incorrect query')
    }
}