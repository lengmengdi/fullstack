const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();



app.use(express.static("statics"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;

    const data = {
        members:[
        {
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME: firstName,
            LNAME: lastName
        }
        }
    ]
    }

    const jsonData = JSON.stringify(data);
    const apikey = '245137dfa41d0c2baf5619805e97b17c-us14';
    const id = '201a3891ee';
    const url = 'https://us14.api.mailchimp.com/3.0/lists/' + id;
    const token = 'andrew:' + apikey;
    const options = {
        auth:token,
        method:'POST'
    }


    const request = https.request(url,options,function(response){
        response.on("data",(d)=>{
            console.log(JSON.parse(d));
        })
    })

    request.write(jsonData);
    request.end();
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});