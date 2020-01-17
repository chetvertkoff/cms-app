import { getPagesByParentId, getMaxID, getPageById, insertPage, update, deletePage } from './../model/pages';

export const getSomeParentPageById = (req,res)=>{
    const parId:number= +req.params.id
  
        getPagesByParentId(parId, (err, data)=>{
            try {
                console.log(data);
                
                res.send(data)   
            } catch (err) {
                res.status(500)
            }
   
    })
}

export const getSomePagesById = (req, res)=>{
     const id:number = +req.params.id
     console.log(id);
     
     setImmediate(()=>{
        getPageById(id,(err, data)=>{
            try {
                console.log(data);
                
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
     .then(data=>{
        res.setHeader('Content-Type', 'application/json');
        res.send({id: data.id});
        // res.redirect('/update/0')
        insertPage(data)
     })

}

export const updatePage=(req,res)=>{
    const page = req.body
    delete page._id
    update(page)   
    setImmediate(()=>{
        res.setHeader('Content-Type', 'application/json');
        res.send({id: req.body._id});
    })
}

export const deleteSomePageById=(req,res)=>{
    console.log(req.params.id);
    const id:number = +req.params.id

    setImmediate(()=>{
        try {
            deletePage(id)            
            res.send({id: id})
        } catch (error) {
            res.status(500)
        }
    })
}