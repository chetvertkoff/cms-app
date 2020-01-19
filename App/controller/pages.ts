import { getPagesByParentId, getMaxID, getPageById, insertPage, update, deletePage, findChild, updateElemProp, findElemsByProps } from './../model/pages';

export const getSomeParentPageById = (req,res)=>{
    const parId:number= +req.params.id
  
        getPagesByParentId(parId, (err, data)=>{
            try {
                res.send(data)   
            } catch (err) {
                res.status(500)
            }
   
    })
}

export const getSomePagesById = (req, res)=>{
     const id:number = +req.params.id
     setImmediate(()=>{
        getPageById(id,(err, data)=>{
            try {
                res.send(data)  
            } catch (error) {
                res.status(500)
            }
        })
     })
}

export const addNewPage = (req,res)=>{
    const page = req.body

    new Promise((resolve, reject)=>{
        getMaxID((data)=>{
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

}

export const updatePage=(req,res)=>{
    const page = req.body
    delete page._id
    // if(page.isFolder){
    //     findChild(page.id, data=>{
    //     })
    // }
    update(page)   
    setImmediate(()=>{
        res.setHeader('Content-Type', 'application/json');
        res.send({id: req.body._id});
    })
}

export const deleteSomePageById=(req,res)=>{
    try {
        new Promise((resolve, reject)=>{
            const id:number = +req.params.id
            if(id){
                //search for details of this item  
                findElemsByProps({id:id},data=>{
                    if(data[0].id){
                        findElemsByProps({parent: data[0].parent}, data=>{
                            // if element counts is equal 1 then this element parent hasnt childs
                            if(data[0].parent && data.length == 1){
                                updateElemProp(data[0].parent,{hasChild: false} )   
                            }
                            resolve(id)
                        }, 2)
                    }
                } ,1)    
            }
        })
         .then(id=>{
            if(id){
                deletePage(id)  
                res.send({id: id})
            }
         }) 

    } catch (error) {
        res.status(500)
    }

}