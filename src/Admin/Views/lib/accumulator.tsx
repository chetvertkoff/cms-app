const accumulator =(arr,id:number | string, putted)=>{    
    arr.map(item=>{
        if(item.id != item.parent){
            if(item.isFolder && item.items!==undefined){
                this.accumulator(item.items, id, putted)
            }else{
                if(item.id == putted[0].parent){
                    item.items = putted
                }
            }
        }
    })    
    
    return arr
}

export default accumulator