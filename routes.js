const express=require("express");
const multer=require("multer");
const mongoose= require("mongoose");
const router=express.Router();

const images = require('./models/image');
const { Mongoose } = require("mongoose");
const storage = multer.diskStorage({
    destination: './photos/uploads' ,
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
})
const upload= multer( {storage: storage })

router.use(express.static('./photos/uploads'));


// to check the collection
router.get('/',(req,res)=>{
    var query=images.find({},(err,result)=>{
        res.send(result);
    });
})


// for adding a file
router.post('/api/add', upload.single('pic') ,(req,res)=>{
    const file=req.file;
    const url = "http://localhost:3000/"+ req.file.filename;
    const name= req.file.filename;
    const type= req.file.mimetype;

    var User={ url : url , name : name , type : type }
    images.insertMany(  User);

    User.metadata = {
        size : file.size ,
        encoding : file.encoding ,
        ogname : file.originalname
    }
    res.send(User) ;
    
})

// displayig array of images
router.get('/api/images',(req,res)=>{
    const offset= parseInt( req.query.offset);
    const limit=parseInt(req.query.limit);

    var query= images.find( {} ).skip(offset).limit(limit);
    query.exec( (err,result)=>{
        if(err)
            console.log(err);
        else{
            var size;
            var subQuery=images.countDocuments( {}, (err,c)=>{ 
                size=c;
                //console.log(size);
                pageResult={};
                if ( offset> limit && offset< size ){
                    const prevOffest= offset-limit;
                    const prev= `http://localhost:3000/api/images?offset=`+prevOffest+`&limit=${limit}`;
                    pageResult.previous= prev;    
                }
                if(  (offset + limit) < size){
                    const nextOffset=offset+limit;
                    const next= `http://localhost:3000/api/images?offset=`+nextOffset+`&limit=${limit}`;
                    pageResult.next=next;
                }
                pageResult.result=result;
                res.send(pageResult);
                })
            }
        })
})




module.exports =router ;