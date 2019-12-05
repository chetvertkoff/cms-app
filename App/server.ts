import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import menu from './routes/menu';
import parentPages from './routes/parentPages';
import pages from './routes/pages';
import cors from 'cors'

dotenv.config()
const app:any = express()
const port:number|string = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended":true}));


// app.use(express.static('public'))
// app.use(bodyParser.json()); 

// app.use('/getMenu', menu)
app.use('/parentPage/', parentPages)
app.use('/page/', pages)
app.use('/menu', menu)

// app.get ('*', (req, res) => { 
//     res.sendFile('index.html', { root: 'public' }); 
// });


app.listen(port,()=>console.log(`Server running on ${port}`))





