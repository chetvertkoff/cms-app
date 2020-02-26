import { getPagesByParentId, getMaxID, getPageById, insertPage, update, deletePage, findChild, updateElemProp, findElemsByProps, deletePageWithChild } from './../model/pages';

export const getSomeParentPageById = async (req,res)=>{
    try {
        const parId:number= +req.params.id
        var limit:number | any

        if(req.query.limit) limit = +req.query.limit
        else limit = 0

        await getPagesByParentId(parId, limit, (err, data, count)=>{            
            const newData:any = {}
            newData.length = count
            newData.data = data
            if (!data && !data.length) res.status(404).send('Can not find page')
            return res.send(newData)   
        })
    } catch (error) {
        res.status(400).send('Incorrect query')
    }
}

export const getSomePagesById = async (req, res)=>{
    try {
        const id:number = +req.params.id
        await getPageById(id,(err, data)=>{
            if (!data && !data.length) res.status(404).send('Can not find page')
            return res.send(data)   
        })
    } catch (error) {
        res.status(400).send('Incorrect query')
    }
}


export const addNewPage = async (req,res)=>{
    try {
        const page = req.body
        new Promise((resolve, reject)=>{
            getMaxID((data)=>{
                if (!data && !data.length) res.status(404).send('Can not find page')
                resolve(data[0].id)
            })
        }).then(id=>{
            const idNew:number = +id+1
            return {
                alias: page.alias,
                isFolder: page.isContainer,
                id: idNew,
                title: page.title,
                parent: +page.options.id,
                parentName: page.options.parentName,
                path: page.options.path,
                isActive: page.active,
                body: page.body,
                metaDescription: page.metaDescription,
                metaKeywords: page.metaKeywords,
                metaTitle: page.metaTitle,
                hasChild: false
            }
        })
         .then(async data=>{
            res.setHeader('Content-Type', 'application/json');
            res.send({id: data.id});
            await insertPage(data)
            if(data.parent){
                await updateElemProp(data.parent, {hasChild: true})
            }
         })
        
    } catch (error) {
        res.status(400).send('Incorrect query')
    }
}

export const updatePage= async (req,res)=>{
    try {
        const page = req.body
        delete page._id
        await update(page)   
        setImmediate(()=>{
            res.setHeader('Content-Type', 'application/json');
            res.send({id: req.body._id});
        })   
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
}

export const deleteSomePageById=(req,res)=>{
    try {
        var currentPage
        new Promise((resolve, reject)=>{
            const id:number = +req.params.id
            if(id){
                //search for details of this item  
                findElemsByProps({id:id},data=>{
                    currentPage = data[0]
                    if(data[0].id){
                        findElemsByProps({parent: data[0].parent}, data=>{
                            // if element counts is equal 1 then this element parent hasnt childs
                            if(data[0].parent && data.length == 1){
                                updateElemProp(data[0].parent,{hasChild: false} )   
                            }
                            resolve(id)
                        }, 2)
                    }else{
                        res.status(500).send('Something went wrong')
                    }
                } ,1)    
            }else{
                res.status(500).send('Something went wrong')
            }
        })
         .then(async id=>{
            if(id){
                if (currentPage.isFolder) {
                    deletePageWithChild(id, currentPage.title)
                    await res.send({id: id})
                }else{
                    deletePage(id)  
                    await res.send({id: id})
                }
            }
         }) 
    } catch (error) {
        res.status(500).send('Something went wrong')
    }

}