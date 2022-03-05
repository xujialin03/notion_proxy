var express=require('express');
const port=process.env.PORT || 3000;
var app=express();
app.get('/',function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    res.write("网站名:" + req.query.name);
    res.write("\n");
    res.write("网站 URL:" + req.query.url);
    res.end();
});
app.listen(port);