var express=require('express');
const port=process.env.PORT || 3000;
var app=express();
app.get('/',function(req,res){
    res.write("网站名:" + req.query.name);
    res.write("\n");
    res.write("网站 URL:" + req.query.url);
    res.end();
});
app.listen(port);