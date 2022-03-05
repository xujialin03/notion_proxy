var express=require('express');
const port=process.env.PORT || 3000;
var app=express();
app.get('/',function(req,res){
    res.send("hello world 部署完成");
});
app.listen(port);