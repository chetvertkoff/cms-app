import { getPagesByParentId, getMaxID, insertPage } from './../model/pages';

export const getSomePagesById = (req,res)=>{
    const parId:number= +req.params.id
    setImmediate(()=>{
        getPagesByParentId(parId, (err, data)=>{
            try {
                res.send(data)   
            } catch (err) {
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
            metaTitle: page.metaTitle
        }
    })
     .then(data=>{
        console.log(data);
        // insertPage(data)
     })

}