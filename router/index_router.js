/**** index_router.js ****/
const express = require('express');
const {resolve} = require('path');

const homeData = require("../jsonData/homeData");

const indexRouter = new express.Router();    // 实例化一个 路由器

/*************************/
indexRouter.get('/', (request, response)=>{
    response.sendFile(resolve(__dirname, '../public/index.html'));
});

indexRouter.get('/home_data', (request, response)=>{
    // response.set('access-control-allow-origin', '*');    // 所有地址都允许
    response.set('access-control-allow-origin', 'http://localhost:3000');
    response.send({code: "200", data: homeData});
});

/*************************/
module.exports = indexRouter;    // 暴露 路由器
