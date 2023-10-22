const express = require('express');
const server = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose')

server.use(express.static('public'));

mongoose.connect('mongodb://0.0.0.0/Akash').then(()=>{
    console.log("database Connected");
})
.catch(()=>{
    console.log("Not database Connected");
})
const conn = mongoose.connection
server.use(bodyparser.urlencoded({ extended : true}))

const rath = new mongoose.Schema({
    firstname:String,
    lastname:String,
    rollno:Number,
    Dob:String,
    phone:Number,
    email:String,
    aadharno:Number,
    collage:String,
    dept:String,
    year:{
        type: String,
         }
    

});
const blix = mongoose.model('data',rath);
server.get('/',(req,res)=> {
    res.sendFile(__dirname+'/reg.html')
})


server.post('/registration',(req,res)=>{
    console.log(req.body)
    var firstname=req.body.firstname
    var lastname=req.body.lastname
    var rollno=req.body.rollno
    var dob=req.body.dob
    var phone=req.body.phone
    var email = req.body.email
    var aadharno =req.body.aadharno
    var collage=req.body.collage
    var dept=req.body.dept
    var year=req.body.year

    conn.collection('datas').insertOne({'firstname':firstname,'lastname':lastname,'rollno':rollno,'Dob':dob,'phone':phone,
    'email':email,'aadharno':aadharno,'collage':collage,'dept':dept,'year':year})
    console.log('Value inserted');
    res.sendFile(__dirname+'/home.html')


});
server.listen(3100,()=>{
    console.log("server running Port 3100");
})
