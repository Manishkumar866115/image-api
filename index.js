const express=require("Express");
const mongoose=require("mongoose");
const cors=require("cors");

const route=require('./routes');
const images=require('./models/image');

const app=express();
app.use(cors());
app.use('/',route);


mongoose.connect("mongodb://localhost:27017/rest",{ useNewUrlParser: true , useUnifiedTopology: true });
mongoose.connection.on("connected",()=>{
    console.log("Connected to MongoDb @ port 27017");
    mongoose.connection.dropDatabase();
})
mongoose.connection.on("error",(err)=>{
    if(err){
        console.log(err);
    }
})

const port=3000;
app.listen(port,()=>{
    console.log("Listening on the port :"+port);
});

