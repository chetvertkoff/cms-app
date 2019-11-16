import express from 'express'
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import menu from './routes/menu';
import pages from './routes/pages';
import cors from 'cors'

dotenv.config()
const app:any = express()
const port:number|string = process.env.PORT || 5000

app.use(cors())


// app.use(express.static('public'))
// app.use(bodyParser.json()); 

// app.use('/getMenu', menu)
app.use('/page/', pages)

// app.get ('*', (req, res) => { 
//     res.sendFile('index.html', { root: 'public' }); 
// });


app.listen(port,()=>console.log(`Server running on ${port}`))





