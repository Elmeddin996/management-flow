const jwt = require("jsonwebtoken")

module.exports = function (req, res , next){
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401)
    }

    try {
        const decodedToken = jwt.verify(token,"secretkey")
        req.user = decodedToken; 
        next();
    } catch (ex) {
        res.status(400)
    }


}