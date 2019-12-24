const xhr = (reqType:string, url:string, data:any)=>{
    const xhr = new XMLHttpRequest()

    switch (reqType) {
        case 'GET':
          return  new Promise<string>((resolve,reject)=>{
                xhr.open(reqType, url, true)
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
            return  new Promise<string>((resolve,reject)=>{
                xhr.open(reqType, url, true)
                xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                xhr.onload = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(xhr.response)
                        } else {
                            reject(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = function () {
                    reject(xhr.statusText);
                };
                xhr.send(JSON.stringify(data));
            })
        break;
        case 'PUT':
            return  new Promise<string>((resolve,reject)=>{
                xhr.open(reqType, url, true)
                xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                xhr.onload = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(xhr.response)
                        } else {
                            reject(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = function () {
                    reject(xhr.statusText);
                };
                xhr.send(JSON.stringify(data));
            })
        break;
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