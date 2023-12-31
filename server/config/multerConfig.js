const multer = require("multer");
// const path = require("path")


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'files/images');
    },
    
    filename:(req,file,cb)=>{
        cb(null,req.user.email);
    },
});


const fileFilter = (req, file, cb) =>{
    if (file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png') {
        cb(null,true)
        
    }else{
        cb(null,false)
    }
}

const upload = multer({storage:storage, fileFilter:fileFilter})

module.exports = upload;