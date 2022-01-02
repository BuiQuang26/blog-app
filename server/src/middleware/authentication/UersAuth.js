const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).json({status: "False", message: "request Forbidden"});
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const userPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.locals.user = userPayload;
        next();
    } catch (error) {
        console.error("user authentication error");
        console.error(error);
        res.status(403).json({status: "False", message: "request Forbidden"});
    }
}