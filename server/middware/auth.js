const jwt = require("jsonwebtoken")

function auth(req, res , next){
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401)
    }

    try {
        const decodedToken = jwt.verify(token,"secretkey")
        req.user = decodedToken; 
    } catch (ex) {
        res.status(400)
    }


}