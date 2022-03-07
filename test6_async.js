const https = require('https');
const { resolve } = require('path');
function takeLongTime() {
    console.log('执行方法')
    return new Promise(resolve => {
        https_get();
    });
}

// https_get2().then(v => {
//     console.log("got", v);
//     console.log('应该同步代码执行后再执行这行')
// });
async function test()
{
    var info=await https_get();
    console.log(info);
}
test();
console.log("获取完数据之后执行");
function https_get()
{
    var options = {
        hostname: 'api.notion.com',
        port: 443,
        path: '/v1/databases',
        method: 'GET',
        headers:
        {
          'Authorization':'Bearer secret_151Mw9NJrcCkraFR7ytPZJcKdHInwrSCcMcxrt7z19f',
          'Notion-Version':'2021-08-16'
        }
    }
    return new Promise(resolve=>{
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            var datainfo="";
            res.on('data', d => {
              //process.stdout.write(d)
              datainfo+=d;
            })
            res.on('end',()=>{
                console.log("请求完成");
                resolve(datainfo);
            })
          })
          
          req.on('error', error => {
            console.error(error)
          })
          
          req.end()
    }) 
}
async function https_get2()
{
    var options = {
        hostname: 'api.notion.com',
        port: 443,
        path: '/v1/databases',
        method: 'GET',
        headers:
        {
          'Authorization':'Bearer secret_151Mw9NJrcCkraFR7ytPZJcKdHInwrSCcMcxrt7z19f',
          'Notion-Version':'2021-08-16'
        }
    }
   
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        var datainfo="";
        res.on('data', d => {
            //process.stdout.write(d)
            datainfo+=d;
        })
        res.on('end',()=>{
            console.log("请求完成");
            resolve(datainfo);
        })
        })
        
        req.on('error', error => {
        console.error(error)
        })
        
        req.end() 
}