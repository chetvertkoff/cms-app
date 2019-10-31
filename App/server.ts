import express from 'express'

const app:any = express()
const port:number = 8000

app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.send('ok');
})


app.listen(port,()=>console.log(`Server running on ${port}`))
