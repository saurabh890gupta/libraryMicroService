const express = require("express");
const app = express();
 const port = 7777;
 var bodyParser = require("body-parser");
const axios=require('axios')
 var mongoose = require('mongoose');
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 

 
// model require
require('./Order');
const Order = mongoose.model('Order');

  var mongoDB = 'mongodb://127.0.0.1/order';
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


app.post('/order',(req,res)=>{
    res.send("order api")
    console.log(req.body)
     var newOrder={
        CustomerID:  mongoose.Types.ObjectId(req.body.CustomerID) ,
        BookID:mongoose.Types.ObjectId(req.body.BookID),
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate,
     }
     console.log('kjhcdsjk',newOrder)
     new Order(newOrder).save().then((result)=>{
            console.log("new newOrder created")
            res.send("new newOrder created")
     }).catch((err)=>{
         console.log("eroor find")
         res.send("err find in newOrder created")
     })
})



app.get('/order',(req,res)=>{
    Order.find({}).then((order)=>{
        console.log("Order",order)
        res.send({"Order":order})
    }).catch((err)=>{
        res.send({"err":"somthing erro find data"})
    })
})

app.get('/order/:id',(req,res)=>{
    Order.findById({_id:req.params.id}).then((order)=>{
        if(order){
            console.log("order",order)
            axios.get('http://localhost:5555/customer/'+order.CustomerID).then(async (response)=>{
                 console.log(response.data.customer.name)
                var orderObject={
                    customerName:response.data.customer.name,
                    bookTitle:''
                }
                console.log(order.BookID)
               await axios.get('http://localhost:4545/books/'+order.BookID).then((response2)=>{
                    console.log("response2 response2",response2.data.book.title)
                    orderObject.bookTitle=response2.data.book.title

                 res.send({"order":orderObject})
                })
                        // console.log("quick response")
            // res.send({"order":order})
            })
        }
        else{
            res.send("somthing error to data order get")
        }
    })
})


// app.delete('/customer/:id',(req,res)=>{
//     Customer.findOneAndRemove({_id:req.params.id}).then((customer)=>{
//         console.log("customer",customer)
//         res.send({"msg":"succful remove"})
//     }).catch((err)=>{
//         res.send({"err":"somthing erro to remove data"})
//     })
// })



 app.listen(port, () => {

    console.info(`server at started of customer port ${port}`);
  });