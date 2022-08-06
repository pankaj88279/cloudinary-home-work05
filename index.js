console.log('hallo')
const express=require('express');
const app=express();
const fs = require('fs');
const cloudinary=require('cloudinary');
const  mongoose  = require('mongoose');
const path = express("path");
const multer=require('multer');
const { uuid, fromString } = require('uuidv4');
require('dotenv').config();


cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME , 
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.file)
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    
    let random=uuid();
    let filen=random+''+file.originalname;
    cb(null, filen)
  }
})

const upload = multer({storage })

  mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@${process.env.USER_DB}.4gb2s.mongodb.net/?retryWrites=true&w=majority`)
  .then((d)=>{
    console.log('connected')
    
    
  }).catch(()=>{
    console.log('unconnected')

  })
    app.post('/pankaj', upload.single('photo'),(req,res)=>{
      console.log(req.file.path)

  cloudinary.uploader.upload( req.file.path, function(error, result) {
        fs.unlink(req.file.path,function (err){
          if(err)console.log(err)
          else console.log('file deleted')
        })
        console.log(result, error)});
        
      
      res.status(200).json({
          msg:"file uploaded successfully"
      })
  })


const port=process.env.port || 2000
app.listen(port,()=>{
    console.log(`this port on running on port${port}`)
})