const bodyParser = require('body-parser');
const express = require('express')
const app = express();

app.listen(3000,()=>console.log('listening to 3000'))

// app.get(endpoint,callback func)
app.use(bodyParser.urlencoded({
    extender:true
}))
app.get('/',(req,res)=>res.sendFile(__dirname+'/index.html'));

app.post('/quotes',(req,res)=>{
    console.log(req.body)
})

