const express = require('express');
const promiseConnect = require('./db/connectDB.js');
const citiesModel = require('./models/userModel.js');
const app = express();

(async ()=>{
    const ret = await promiseConnect;
    console.log(ret);
    
    app.use(express.static("public"));
    app.use(express.urlencoded({extended: true}));
    
    app.get("/", (request, response)=>{
        response.sendFile("./public/index.html");
    });

    // 省 的 get 路由
    app.get("/province", async (request, response)=>{
        try{
            const province = await citiesModel.find({"level": 1}, {"province": 1, "name": 1, "_id": 0});
            response.json({code: 200, data: province});
        }catch(err){
            console.log(err);
            response.json({code: 404, data: '网络不稳定，请刷新重试'});
        };
    });
    
    // 市 的 get 路由
    app.get("/city", async (request, response)=>{
        try{
            const {province} = request.query;
            const city = await citiesModel.find({province, "level": 2}, {"city": 1, "name": 1, "_id": 0});
            response.json({code: 200, data: city});
        }catch(err){
            console.log(err);
            response.json({code: 404, data: '网络不稳定，请刷新重试'});
        };
    });
    
    // 县 的 get 路由
    app.get("/county", async (request, response)=>{
        try{
            const {province, city} = request.query;
            const county = await citiesModel.find({province, city, "level": 3}, {"county": 1, "name": 1, "_id": 0});
            response.json({code: 200, data: county});
        }catch(err){
            console.log(err);
            response.json({code: 404, data: '网络不稳定，请刷新重试'});
        };
    });
})().catch(err=>console.log(err));

/**************** 端口号 3000, 启动服务器 ***************/
app.listen(3001, err=>console.log(err?err:'\n\n服务器已启动: http://localhost:3001\n\t\tHunting Happy!'));
