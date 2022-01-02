//config, connect database

const mongoose = require('mongoose');

async function connectDB(){
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/blogs',{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to database')
        } catch (error) {
            console.log(error)
        }
    }

module.exports = connectDB;