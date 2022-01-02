const mongoose = require('mongoose');
const schema = mongoose.Schema;

const User = new schema({
    userName: {type : String , unique : true},
    age: Number,
    country: String,
    email: {type : String, unique : true},
    password: String
},{
    timestamps: true,
})

module.exports = mongoose.model('user',User);