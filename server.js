    const bodyParser = require('body-parser');
    const express = require('express')
    const MongoClient = require('mongodb').MongoClient
    const connectionString = 'mongodb+srv://msikder:msikder08@cluster0.n8b3k.mongodb.net/<dbname>?retryWrites=true&w=majority';

    // MongoClient.connect(connectionString, (err, client) => { 
    //     // ... do something here 
    //     if(err) return console.error(err)
    //     console.log('connected to database')
    // })

    MongoClient.connect(connectionString,
        { useUnifiedTopology: true },
        (err, client) => { 
            if (err) return console.error(err)
            console.log('Connected to Database server') 
            const db = client.db('star-wars-quotes')
            const quotesCollections = db.collection('quotes')
            app.post('/quotes',(req,res)=>{
                //console.log(req.body)
                quotesCollections.insertOne(req.body)
                .then(result=>{res.redirect('/')})
                .catch(err=>console.error(err))
                
                
            })
            app.get('/',(req,res)=>{
                // const getCollections = db.collection('quotes').find()
                // console.log(getCollections)
                db.collection('quotes').find().toArray()
                .then(result=>{ res.render('index.ejs',{quotes:result})})
                .catch(err=>console.error(err))
               
            })
           
        }
    );

    const app = express();

    app.listen(3000,()=>console.log('listening to 3000'))

    // app.get(endpoint,callback func)
    app.use(bodyParser.urlencoded({
        extender:true
    }))
    
    //app.get('/',(req,res)=>res.sendFile(__dirname+'/index.html'));

    

