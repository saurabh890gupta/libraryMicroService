const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var Customers = new Schema(
  {
   name:String,
   age:Number,
   address:String
  },
  { collection: "Customers" }
);

module.exports = mongoose.model("Customers", Customers);
