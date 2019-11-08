const express = require("express");
const app = express();
 const port = 4545;
 var bodyParser = require("body-parser");

 var mongoose = require('mongoose');
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 

 
// model require
require('./Books');
const Book = mongoose.model('Books');

  var mongoDB = 'mongodb://127.0.0.1/books';
 mongoose.connect(mongoDB, { useNewUrlParser: true });
 
 //Get the default connection
 var db = mongoose.connection;
 
 //Bind connection to error event (to get notification of connection errors)
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));
 if (mongoose.connection.readyState == 2) {
    console.debug("mongoose Connected");
  } else {
    console.error("mongoose is not Connected");
  }

 app.get('/',(req,res)=>{
     res.send("this is our main end point")
 });


app.post('/books',(req,res)=>{
    res.send("books api")
    console.log(req.body)
     var newBook={
         title:req.body.title,
         author:req.body.author,
         numberPages:req.body.numberPages,
         publisher:req.body.publisher,
     }
     console.log('kjhcdsjk',newBook)
     new Book(newBook).save().then((result)=>{
            console.log("new book created")
            res.send("new book created")
     }).catch((err)=>{
         console.log("eroor find")
         res.send("err find in book created")
     })
})



app.get('/books',(req,res)=>{
    Book.find({}).then((book)=>{
        console.log("book",book)
        res.send({"book":book})
    }).catch((err)=>{
        res.send({"err":"somthing erro find data"})
    })
})

app.get('/books/:id',(req,res)=>{
    Book.findById({_id:req.params.id}).then((book)=>{
        console.log("book",book)
        res.send({"book":book})
    }).catch((err)=>{
        res.send({"err":"somthing erro find data"})
    })
})


app.delete('/books/:id',(req,res)=>{
    Book.findOneAndRemove({_id:req.params.id}).then((book)=>{
        console.log("book",book)
        res.send({"msh":"succful remove"})
    }).catch((err)=>{
        res.send({"err":"somthing erro to remove data"})
    })
})



 app.listen(port, () => {

    console.info(`server at started book port ${port}`);
  });