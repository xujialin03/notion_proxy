var express=require('express');
const port=process.env.PORT || 3000;
var app=express();
app.get('/',function(req,res){
    var params = url.parse(req.url, true).query;
    res.write("网站名:" + params.name);
    res.write("\n");
    res.write("网站 URL:" + params.url);
    res.end();
});
app.listen(port);