const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


class userController{

    // method: [POST] /user/login
    async login(req, res){
        try {
            const user = await User.findOne({name : req.body.userName});

            if(user)
            {
                const isPassword = await bcrypt.compare(req.body.password, user.password);
                if(isPassword) {
                    const jwtToken = await jwt.sign({
                        id : user._id,
                        userName : user.userName,
                        age : user.age,
                        email : user.email
                    }, process.env.JWT_SECRET_KEY ,{ expiresIn: '1h' }); //token valid for 1 hour
                    res.send({token: jwtToken});
                }
                else
                    res.status(400).json({status: "False", message: "username or password is incorrect"});
            }
            else
            res.status(400).json({status: "False", message: "username or password is incorrect"});

        } catch (error) {
            console.error("login", error);
            res.status(500).json({error : "server error"});
        }
    }

    //Register , [POST] /user/register
    async register(req, res){
        const nameExists = await User.findOne({name : req.body.userName});
        const emailExists = await User.findOne({email : req.body.email});
        if(nameExists) {
            res.status(400).json({status: "False", message: "Email already exists"});
            return;
        }

        if(emailExists) {
            res.status(400).json({status: "False", message: "Email already exists"});
            return;
        }

        const user = new User(req.body);
        try {
            const hash = await bcrypt.hash(req.body.password, 10) //encode password by bcrypt , 10 : saltRounds
            user.password = hash;
            user.save();
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({error : "server error"});
        }
    }

    //Register , [GET] /user/blogs
    getBlogList(req, res){
        const data = [
            {
                userName : "Quang",
                blog : "xin chao cac ban minh la Quang, blog 1"
            }, 
            {
                userName : "Quang2",
                blog : "xin chao cac ban minh la Quang2, blog 2"
            }, 
            {
                userName : "Quang",
                blog : "xin chao cac ban minh la Quang, blog 3"
            },
            {
                userName : "Quang2",
                blog : "xin chao cac ban minh la Quang2, blog 2"
            }, 
            {
                userName : "Quang",
                blog : "xin chao cac ban minh la Quang, blog 3"
            }
        ]

        if(res.locals.user){
            const userName = res.locals.user.userName;
            const blogs = data.filter(blog=> {
                return blog.userName === userName;
            })
            res.status(200).json({
                userId: res.locals.user.id,
                userName: userName,
                blogs
            })
        }
    }
}

module.exports = new userController;
