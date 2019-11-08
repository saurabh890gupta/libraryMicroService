const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var Order = new Schema(
  {
   CustomerID:{
       type:mongoose.SchemaTypes.ObjectId,
       required:true
   },
  BookID:{
      type:mongoose.SchemaTypes.ObjectId,
      required:true
  },
  initialDate:{
        type:Date,
        required:true,
  },
  deliveryDate:{
      type:Date,
      required:true
  }
  },
  { collection: "Order" }
);

module.exports = mongoose.model("Order", Order);
