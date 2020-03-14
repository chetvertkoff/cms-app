import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config()
const dbName = 'CRUD'
var db

//DB Connect
MongoClient(process.env.URL,{ useUnifiedTopology: true })
 .connect((err, client)=>{
     db = client.db(dbName)
 })


export const getPagesByParentId = (id:number, limit: number, callback)=>{
    try {
        var pages
        var count:number
        Promise.all([
            new Promise((resolve)=>{
                db
                .collection('pages')
                .find(
                    {$or: [ { parent:id }, { id: id } ]}
                )
                .limit(limit)
                .toArray((err, data)=>{   
                    pages = data
                    resolve()
                })
            }),
            new Promise((resolve)=>{
                db
                .collection('pages')
                .find(
                    {$or: [ { parent:id }, { id: id } ]}
                )
                .count()
                .then(newCount=>{
                    count = newCount
                    resolve()
                })
            })
        ])
         .then(()=>{
            callback(null,pages,count)
         })
         .catch(err=>callback(err))

    } catch (error) {}
}

export const getPageById = (id:number, callback)=>{
    db
     .collection('pages')
     .find({id:id})
     .limit(1)
     .toArray((err, data)=>{          
        callback(err,data)
     })
}


export const insertPage=(page)=>{    
    if(page){
        console.log(page);
        db
         .collection('pages')
         .insertOne(page)
    }
}

export const update=(page)=>{
    if(page){
        db
        .collection('pages')
        .updateOne(
            {id: page.id},
            {$set:{...page}}
        )
    }
}

export const deletePage=(id: number | any)=>{
    if(id){
        db
         .collection('pages')
         .deleteOne(
             {id: id}
         )
    }
}

export const deletePageWithChild=(id: number | any, title)=>{
    try {
        db
         .collection('pages')
         .deleteMany(
            {$or: [ { path: {$regex: ".*"+title+".*"}}, { id: id } ]}
         )
    } catch (error) {
        
    }
}

// ? tools
export const findChild=(id:number, callback)=>{
    try {
        db
         .collection('pages')
         .find({parent: id})  
         .limit(1) 
         .project({id:1, _id: 0})
         .toArray((err,data)=>{
             if(err) throw new Error
             callback(data)
         })
    } catch (error) {
        
    }
}

export const getMaxID=(callback)=>(
    db
     .collection('pages')
     .find()
     .sort({'id':-1})
     .project({id:1, _id: 0})
     .limit(1)
     .toArray((err,data)=>{         
        callback(data)
     })
)

export const updateElemProp=(id, props)=>{
    if(id && props){
        db
        .collection('pages')
        .updateOne(
            {id: id},
            {$set:{...props}}
        )
    }
}

export const findElemsByProps=(props,callback, limit)=>{
    try {
        db
         .collection('pages')
         .find(props)  
         .limit(limit) 
         .toArray((err,data)=>{
             if(err) throw new Error
             callback(data)
         })
    } catch (error) {
        
    }
}

