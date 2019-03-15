const mongoose = require('mongoose');

module.exports = new Promise((resolve, reject)=>{
    mongoose.connect('mongodb://localhost:27017/ajax', {useNewUrlParser:true})
    mongoose.connection.once('open', err=>{
        if(err){
            console.log(err);
            reject(err);
        }else{
            resolve('数据库已连接');
        };
    });
});
