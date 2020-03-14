const xhr = (reqType:string, url:string, data?:any, headers?:object={})=>{
    const xhr = new XMLHttpRequest()

    switch (reqType) {
        case 'GET':
          return  new Promise<string>((resolve,reject)=>{
                xhr.open(reqType, url, true)
                if(headers){
                    for(let[key,value] of Object.entries(headers)){
                        xhr.setRequestHeader(key, value)
                    }
                }
                xhr.onload = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                        resolve(xhr.responseText)
                        } else {
                        reject(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = function () {
                reject(xhr.statusText);
                };
                xhr.send(); 
            }) 
             .then(data=>JSON.parse(data))
        case 'POST':
        case 'PUT':
            return new Promise<string>((resolve,reject)=>{
                
                xhr.open(reqType, url)
                xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                xhr.onerror = function () {
                    reject(xhr.statusText);
                };
                
                xhr.onload =()=>{
                    resolve(xhr)
                }
                xhr.send(JSON.stringify(data));
            }).then(data=>data)
        case 'DELETE':
            return new Promise<string>((resolve,reject)=>{
                
                xhr.open(reqType, url)
                xhr.onerror = function () {
                    reject(xhr.statusText);
                };
                
                xhr.onload =()=>{
                    resolve(xhr)
                }
                
                xhr.send(xhr);
            }).then(data=>data)
        default:
        return new Promise<string>((resolve,reject)=>{
                xhr.open(reqType, url, true)
                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                        resolve(xhr.responseText)
                        } else {
                        reject(xhr.statusText);
                        }
                    }
                    };
                    xhr.onerror = function (e) {
                    reject(xhr.statusText);
                    };
                    xhr.send(); 
            }) 
             .then(data=>JSON.parse(data))
    }
}

export default xhr