const { json } = require('express/lib/response');
const https = require('https');
process.env.TZ = 'Asia/Shanghai';
// var postdata={
//     "filter": {
//       "property": "isToday",
//       "checkbox": {
//         "equals": true
//       }
//     }
//   };
var postdata={};
var reqdata = JSON.stringify(postdata);
var options=
{
    hostname: 'api.notion.com',
    port: '443',
    path: '/v1/databases/5a8306b5-ab26-4547-a4fd-04fcf9a8c384/query',
    method: 'POST',
    headers: {
        'Authorization':'Bearer '+'secret_151Mw9NJrcCkraFR7ytPZJcKdHInwrSCcMcxrt7z19f',
        'Content-Type': 'Application/json',
        'Notion-Version':'2022-02-22',
    }
}
var req = https.request(options, function(res){});
req.write(reqdata);
req.on('response', function (response)
{
    var datas="";
    response.on('data',function(data){
        datas+=data;
    })
    response.on('end',function()
    {
        // console.log(datas);
        try 
        {
            const jsondata = JSON.parse(datas)
            for (var i=0;i<jsondata['results'].length;i++)
            {
                // console.log(jsondata['results'][i]['properties']['项目名称']['title'][0]['text']['content']);
                console.log(jsondata['results'][i]['properties']['nowdate']['formula']['number']);
                console.log(jsondata['results'][i]['properties']['nowhour']['formula']['number']);
                console.log(jsondata['results'][i]['properties']['nowmin']['formula']['number']);
                console.log(jsondata['results'][i]['properties']['Status']['formula']['string']);
                console.log(jsondata['results'][i]['properties']['BetweenStart']['formula']['number']);
                console.log(jsondata['results'][i]['properties']['BetweenEnd']['formula']['number']);
            }
            
        } 
        catch(err) {
            console.error(err)
        }
    })
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
        default:
            // var returndatatojson= JSON.parse(body);
            req.end();
            break;
    }
});
req.on('error', function (e){
    console.log(new Error('problem with request: ' + e.message));
    req.end();
    setTimeout(cb, 10);}
);
req.end();