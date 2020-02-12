import express from 'express'
import FroalaEditor from '../lib/froalaEditor.js'

const upload = express.Router()

upload.post('/', (req,res)=>{
    FroalaEditor.Image.upload(req, '../uploads/', function(err, data) {
        
        if (err) return res.send(JSON.stringify(err))
        console.log(data);
        
        res.send(data);
      });
    
})


export default upload
