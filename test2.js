const https = require('https');

//启动http服务
var express=require('express');
const port=process.env.PORT || 3000;
var app=express();
app.get('/',function(req,res){
    requ(req.query.notionkey,req.query.dbid);
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    res.write("网站名:" + req.query.notionkey);
    res.write("\n");
    res.write("网站 URL:" + req.query.dbid);
    res.end();
});
app.listen(port);
function requ(ntionkey,dbid)
{
    console.log("post");
    var postdata={};
    var reqdata = JSON.stringify(postdata);
    var options={
        hostname: 'api.notion.com',
        port: '443',
        path: 'v1/databases/'+dbid+'/query',
        method: 'POST',
        headers: {
            'Authorization':'Bearer '+ntionkey,
            'Content-Type': 'Application/json',
            'Notion-Version': '2021-08-16',
            "Content-Length":reqdata.length,
        }
    }

    var req = https.request(options, function (res) 
    {});
    req.write(reqdata);
   
    req.on('response', function (response)
    {
        switch (response.headers['content-encoding'])
        {
            case 'gzip':
                var body = '';
                var gunzip = zlib.createGunzip();
                response.pipe(gunzip);
                gunzip.on('data', function (data) {
                    body += data;
                });
                gunzip.on('end', function () {
                    var returndatatojson= JSON.parse(body);
                    req.end();
                });
                gunzip.on('error', function (e) {
                    console.log('error' + e.toString());
                    req.end();
                });
                break;
            case 'deflate':
                var output = fs.createWriteStream("d:temp.txt");
                response.pipe(zlib.createInflate()).pipe(output);
                req.end();
                break;
            default:req.end();
                break;
        }
    });
    req.on('error', function (e){
        console.log(new Error('problem with request: ' + e.message));
        req.end();
        setTimeout(cb, 10);}
    );
    req.end();
}