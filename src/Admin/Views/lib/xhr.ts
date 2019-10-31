const xhr = (reqType:string, url:string)=>{
    switch (reqType) {
        case 'GET':
          return  new Promise<string>((resolve,reject)=>{
                const xhr = new XMLHttpRequest()
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
        default:
        return new Promise<string>((resolve,reject)=>{
                const xhr = new XMLHttpRequest()
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