/**
 * Created by Flowers博爵 on 2018/10/31.
 */
//引入mongoose模块
const mongoose=require('mongoose');
//获取Schema
 const Schema=mongoose.Schema;
 //创建约束对象
 const usersSchema=new Schema({
   username:{
     type:String,
     unique:true,
     required:true
   },
   password:{
     type:String,
     required:true
   },
   type:{
     type:String,
     required:true
   },
   header: String, // 头像名称
   info: String, // 职位简介
   post: String, // 职位名称
   company: String, // 公司名称
   salary: String // 工资
 })
//创建模型对象
 const Users=mongoose.model('User',usersSchema);
 module.exports=Users;