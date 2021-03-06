/**
 * Created by Flowers博爵 on 2018/10/31.
 */
//引入mongoose模块
const mongoose=require('mongoose');

module.exports =new Promise((resolve,reject)=>{
  //连接mongoose数据库
  mongoose.connect('mongodb://localhost:27017/gzhipin',{useNewUrlParser:true});
//绑定事件监听
  mongoose.connection.once('open',err=>{
    if(!err) {
      console.log('数据库连接成功了');
      resolve();
    }else{
      console.log(err);
      reject();
    }
  })
})