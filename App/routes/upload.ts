import path from 'path'
import express from 'express'
import FroalaEditor from '../lib/froalaEditor.js'
import multer from 'multer'
import sha256 from 'sha256'
import settings from '../settings'

const storage = multer.diskStorage({
   destination: function(req, file, cb) {
      cb(null, `${path.resolve()}/uploads/avatar/`)
  },
   filename: function (req, file, cb) {
    const name = sha256(file.originalname.replace(/([A-Za-zа-яА-Я.0-9-]+)(\.[pngPNGjpgJPGjpegJPEG]+)/gm, '$1'))
    const format = file.originalname.replace(/([A-Za-zа-яА-Я.0-9-]+)(\.[pngPNGjpgJPGjpegJPEG]+)/gm, '$2')

    cb(null ,name+format);
   }
})

const uploading = multer({ storage: storage })

const upload = express.Router()

upload.post('/image', (req,res)=>{  
  type currentPath={
    path: string
  }

  let currentPath = {path:''}

    currentPath.path = '../uploads/'

  try {
    FroalaEditor.Image.upload(req, currentPath.path , function(err, data) {
      if (err){
        return res.send(JSON.stringify(err))
      }
      
      data.link = data.link.slice(2)
      if (settings.MODE = 'prod') {
        data.link = data.link.replace(/\/public/,'')
      }
      res.send(data)
  }) 
  } catch (error) {
    res.status(400).send('Incorrect query')  
  }
})

upload.post('/avatar', uploading.single('avatar'), (req:any,res)=>{  
  try {
    const avatar = req.file  
    const path = `/uploads/avatar/${avatar.filename}`
    res.send({avatar: path}) 
  } catch (error) {
    res.status(400).send('Incorrect query')  
  }
})


export default upload
