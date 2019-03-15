/**** index_router.js ****/
const express = require('express');
const {resolve} = require('path');

const homeData = require("../jsonData/homeData");
const serviceData = require("../jsonData/serviceData");
const serviceDetailData = require("../jsonData/serviceDetailData");
const userCommentData = require("../jsonData/userCommentData");

const indexRouter = new express.Router();    // 实例化一个 路由器

let serviceId = -1;
let pageIndex = 0;
    /************ 页面请求 *************/
indexRouter.get('/', (request, response)=>{
    response.sendFile(resolve(__dirname, '../public/index.html'));
});

indexRouter.get('/service', (request, response)=>{
    response.sendFile(resolve(__dirname, '../public/pages/service.html'));
});

indexRouter.get('/service/detail', (request, response)=>{
    serviceId = request.query.id;
    response.sendFile(resolve(__dirname, '../public/pages/detail.html'));
});

/************ 数据请求 *************/
indexRouter.get('/home_data', (request, response)=>{
    // response.set('access-control-allow-origin', '*');    // 所有地址都允许
    response.set('access-control-allow-origin', 'http://localhost:3000');
    response.send({code: "200", data: homeData});
});

indexRouter.get('/service_data', (request, response)=>{
    response.set('access-control-allow-origin', 'http://localhost:3000');
    response.send({code: "200", data: serviceData});
});

indexRouter.get('/service_detail', (request, response)=>{
    response.set('access-control-allow-origin', 'http://localhost:3000');
    response.send({code: "200", data: serviceDetailData});
});

indexRouter.get('/user_comment', (request, response)=>{
    pageIndex = +request.query.pageIndex+1;
    const obj = Array.prototype.slice.call(userCommentData);
    const data = obj.filter((each, index)=>{
       return index>=pageIndex*10-10 && index<pageIndex*10
    });
    
    response.set('access-control-allow-origin', 'http://localhost:3000');
    response.send({code: "200", data});
});

/*************************/
module.exports = indexRouter;    // 暴露 路由器
