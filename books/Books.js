const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var Books = new Schema(
  {
   title:String,
   author:String,
   numberPages:Number,
   publisher:String
  },
  { collection: "Books" }
);

module.exports = mongoose.model("Books", Books);
