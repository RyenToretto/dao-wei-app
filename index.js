/**** index.js ****/
const express =  require('express');
const indexRouter = require('./router/index_router.js');    // 引入路由器

let stylus = require('express-stylus');
let nib = require('nib');
let join = require('path').join;
let publicDir = join(__dirname, '/public');

const app = express();

/*
    将该文件夹下所有静态资源暴露出去
    接受请求，通过分析参数，找到了 public 对应资源就返回响应
 */
// app.use(express.static('./public'));    //默认调用next
app.use(express.static(publicDir));    //默认调用next

/* 解析请求体数据，结果数据挂载到 req.body 上 */
app.use(express.urlencoded({extended: true}));    //默认调用next

/*
    中间件默认能接收并处理所有请求
    需要调用 next() 方法，才会接下来处理下面的中间件或者路由，否则卡住了
 */
app.use((request, response, next)=>{
    next();    // 调用下一个中间件或者路由
});

app.use(stylus({
    src: publicDir,
    use: [nib()],
    import: ['nib']
}));

app.use(indexRouter);    // 使用路由器

app.listen(3000, err=>console.log(err?err:'服务器启动成功: http://localhost:3000'));
