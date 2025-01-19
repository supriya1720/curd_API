const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://navu1517:supiscute@lms.9k1fy.mongodb.net/curd");
//Schema Definition here
const ItemSchema = new mongoose.Schema({
    name:String,
    price:Number
});
const Items= mongoose.model('Items',ItemSchema);

module.exports = {Items};