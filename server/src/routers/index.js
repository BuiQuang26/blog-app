//config router 
//cau hinh cac duong dan 

const userRouter = require('./user');

module.exports = function routers(app) {
    app.use('/user', userRouter)
};