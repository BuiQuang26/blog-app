const express = require('express');
const app = express();
const routers = require('./routers/index.js');
const connectMongoDb = require('./data_config/configMongoDb');

const port = process.env.PORT || 3000;

//use json body
app.use(express.json());

//connect to DB
connectMongoDb();

//routers
routers(app);

app.listen(port, function(){
    console.log('listening on port ' + port);
})