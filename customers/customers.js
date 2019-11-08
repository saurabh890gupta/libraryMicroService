const express = require("express");
const app = express();
 const port = 5555;
 var bodyParser = require("body-parser");

 var mongoose = require('mongoose');
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 

 
// model require
require('./Customers');
const Customer = mongoose.model('Customers');

  var mongoDB = 'mongodb://127.0.0.1/customers';
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


app.post('/customer',(req,res)=>{
    res.send("Customer api")
    console.log(req.body)
     var newCustomer={
        name:req.body.name,
        age:req.body.age,
        address:req.body.address,
     }
     console.log('kjhcdsjk',newCustomer)
     new Customer(newCustomer).save().then((result)=>{
            console.log("new Customer created")
            res.send("new Customer created")
     }).catch((err)=>{
         console.log("eroor find")
         res.send("err find in Customer created")
     })
})



app.get('/customer',(req,res)=>{
    Customer.find({}).then((customer)=>{
        console.log("customer",customer)
        res.send({"customer":customer})
    }).catch((err)=>{
        res.send({"err":"somthing erro find data"})
    })
})

app.get('/customer/:id',(req,res)=>{
    Customer.findById({_id:req.params.id}).then((customer)=>{
        console.log("customer",customer)
        res.send({"customer":customer})
    }).catch((err)=>{
        res.send({"err":"somthing erro find data"})
    })
})


app.delete('/customer/:id',(req,res)=>{
    Customer.findOneAndRemove({_id:req.params.id}).then((customer)=>{
        console.log("customer",customer)
        res.send({"msg":"succful remove"})
    }).catch((err)=>{
        res.send({"err":"somthing erro to remove data"})
    })
})



 app.listen(port, () => {

    console.info(`server at started of customer port ${port}`);
  });