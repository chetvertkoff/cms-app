import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import menu from './routes/menu';
import parentPages from './routes/parentPages';
import pages from './routes/pages';
import cors from 'cors'
import upload from './routes/upload'
import user from './routes/user';
import multer from 'multer'

dotenv.config()
const app:any = express()
const port:number|string = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))


app.use("/uploads",express.static("uploads", { redirect : false }));
app.use(express.static('public', { redirect : false }))
// app.use(bodyParser.json()); 
// app.use('/getMenu', menu)
app.use('/api/user/', user)
app.use('/api/parentPage/', parentPages)
app.use('/api/page/', pages)
app.use('/api/menu/', menu)
app.use('/api/upload/', upload);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
     cb(null, '../uploads/avatar/');
   },
  filename: function (req, file, cb) {
     cb(null ,file.originalname);
  }
})

const uploading = multer({ storage: storage });

app.post('/api/upload/avatar', uploading.single('avatar'), (req,res)=>{  
  res.send({a: '1'})
})


// app.get ('*', (req, res) => { 
//     res.sendFile('index.html', { root: 'public' }); 
// });


app.listen(port,()=>console.log(`Server running on ${port}`))





