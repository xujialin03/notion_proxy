//整合http请求服务用于给esp8266提供服务
//添加https请求notion接口
var express=require('express');
const https = require('https');
const port=process.env.PORT || 3000;
var app=express();
const project_database_id='84b35e6f-6d2e-49d3-a173-92439a4621b5';
const todo_database_id="52967d09-6868-4438-ac83-070fb8f3b288";
const learn_database_id="58fe3237-c47c-4763-9770-58797c178e33";

app.get('/',function(req,res){
    console.log("收到客户端请求");
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    var resdata={}
    if (req.query.notionkey)
    {
        resdata.code=200;
        resdata.msg='发起请求';
        var allresults=[];
        https_Nontion_DataBase(req.query.notionkey,project_database_id).then(v=>{
            console.log('project 数据返回');
            var project_arr=parseProject(v);
            allresults.push(...project_arr);
            https_Nontion_DataBase(req.query.notionkey,todo_database_id).then(td=>{
                console.log('Todo 数据返回');
                var todo_arr=parseTodo(td);
                allresults.push(...todo_arr);
                https_Nontion_DataBase(req.query.notionkey,learn_database_id).then(le=>{
                    console.log('Learn 数据返回');
                    var learn_arr=parseLearn(le);
                    allresults.push(...learn_arr);
                    console.log(allresults);
                    resdata.data=allresults;
                    resdata.msg='数据请求完成';
                    resjson=JSON.stringify(resdata);
                    res.write(resjson);
                    res.end();
                });
            });
        })
        
        // https_get();
    }
    else
    {
        console.log("请求接口错误:notionkey不合法")
        resdata={code:400,msg:'notionkey不合法'};
        resjson=JSON.stringify(resdata);
        res.write(resjson);
        res.end();
    }
    
});
app.listen(port);
//请求notion表方法
function https_Nontion_DataBase(Notionkey,database_id)
{

    var result=[];
    console.log('https_Nontion_DataBase_Project:'+Notionkey);
    //notion过滤参数
    var postdata={
        "filter": {
            "and":[{"property": "isToday","checkbox": {"equals": true}},{"property": "已完成","checkbox": {"equals": false}}]
        }
      };
    var reqdata = JSON.stringify(postdata);
    var options=
    {
        hostname: 'api.notion.com',
        port: '443',
        path: '/v1/databases/'+database_id+'/query',
        method: 'POST',
        headers: {
            'Authorization':'Bearer '+Notionkey,
            'Content-Type': 'Application/json',
            'Notion-Version':'2022-02-22',
        }
    }
    return new Promise(resolve => 
    {
        var req = https.request(options, function(res){});
        req.write(reqdata);
        req.on('response', function (response)
        {
            var datas="";
            response.on('data',function(data)
            {
                datas+=data;//拼接返回数据
            });
            response.on('end',()=>
            {
                // console.log(datas);
                try 
                {
                    var jsondata = JSON.parse(datas)
                    resolve(jsondata);
                } 
                catch(err) {
                    console.error(err)
                }
            });
        });
        req.on('error', function (e)
        {
            console.log(new Error('problem with request: ' + e.message));
            req.end();
        });
        console.log('请求还没开始')
        req.end();//这个要加不然会一直等
    });
}
/**
 * 解析project表
 * @param {array} datas 
 */
function parseProject(datas)
{
    var result=[];
    for (var i=0;i<datas['results'].length;i++)
    {
        result.push(datas['results'][i]['properties']['项目名称']['title'][0]['text']['content']);
    }
    return result;
}
/**
 * 解析todo表
 * @param {array} datas 
 */
function parseTodo(datas)
{
    var result=[];
    for (var i=0;i<datas['results'].length;i++)
    {
        result.push(datas['results'][i]['properties']['Name']['title'][0]['text']['content']);
    }
    return result;
}
/**
 * 学习表数据解析
 * @param {array} datas 
 * @returns 
 */
function parseLearn(datas)
{
    var result=[];
    for (var i=0;i<datas['results'].length;i++)
    {
        result.push(datas['results'][i]['properties']['Name']['title'][0]['text']['content']);
    }
    return result;
}
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
      
      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
          process.stdout.write(d)
        })
      })
      
      req.on('error', error => {
        console.error(error)
      })
      
      req.end()
}