const express=require("express");
const bodyParser=require("body-parser"); // to access data base received from form
const request=require("request");

const app=express();

app.use(bodyParser.urlencoded({extended:true})); // to handle data from form
app.use(express.static("public")); // this makes a particular folder public so that we can access css and image file

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var fname=req.body.first;
    var lname=req.body.last;
    var email1=req.body.email;

    // console.log(fname,lname,email);
    var data={              // javascript format using stringfy convert into json
        members : [
            {
                email_address: email1,
                status : "subscribed",
                merge_field :{
                    fname:fname,
                    lname:lname
                }
            }
        ]
    };

    var jsondata=JSON.stringify(data);

    var option={
        url: "https://us14.api.mailchimp.com/3.0/lists/1c4a8dc23e",
        method:'POST',
        headers:{
            "Authorization":"sunny efd5b72a8092c14ae4c1373bb02431ff-us14"
                },
        body: jsondata
    };
    request(option,function(error,response,body){
        if(error){
            res.sendFile(__dirname+"/failure.html"); // server return batayega error aaya hai
        }else{
            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        }
    });

});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){     // process.env.PORT it i used to set port no by heraku itself
    console.log("server is running at port 3000");
});


// efd5b72a8092c14ae4c1373bb02431ff-us14

// audience id

//1c4a8dc23e