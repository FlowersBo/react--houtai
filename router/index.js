/**
 * Created by Flowers博爵 on 2018/10/31.
 */
//引入express模块
const express=require('express');
//引入模型对象
const Users=require('../moduls/users');
//引入md5
const md5=require('blueimp-md5');
//获取Router
const Router=express.Router;
//创建路由器
const router=new Router();
//解析请求体数据,将请求体数据挂载到req.body中
router.use(express.urlencoded({extended:true}));
//登录
router.post('/login',async(req,res)=>{
 //收集用户信息
  const {username,password}=req.body;
  //判断用户输入是否合法
  if(!username||!password){
    res.json({
      "code": 2,
      "msg": "用户输入不合法"
    })
    return;
  }
  //去数据库中查找是否有指定的用户和密码
  try{
    const data=await Users.findOne({username,password:md5(password)});
    if(data){
      console.log(data);
      res.json(  {
        code: 0,
        data: {
          _id:data._id ,
          username:data.username ,
          type: data.type,
        }
      });
    }else{
      res.json(  {
        "code": 1,
        "msg": "用户名或密码错误"
      })
    }
  }catch(e){
    res.json({
      "code": 3,
      "msg": "网络不稳定，请重新试试~"
    })
  }
})
//注册
router.post('/register',async(req,res)=>{
  //收集提交信息
  const {username,password,type}=req.body;
  //判断用户信息是否合法
   if(!username||!password||!type){
     res.json({
       "code": 2,
       "msg": "用户输入不合法"
     })
     return;
   }
  //去数据库中查找用户是否存在
 /* Users.findOne({username})
    /!*.then(data=>{//找到的是文档对象
      console.log(data);
    if(data){//存在返回错误
      return Promise.reject(res.json({
        "code": 1,
        "msg": "此用户已存在"
      }))
    }else{
      return Users.create({username,password:md5(password),type})
    }
    })
    .catch(err=>{
      if(!err.code){
        err={
          "code": 3,
          "msg": "网络出现问题，请刷新重试"
        }
      }
    return Promise.reject(err)
    })
    .then(data=>{//用户注册成功，返回成功的响应
    res.json({
      code: 0,
      data: {
        _id: data._id,
        username: data.username,
        type: data.type
      }
    })
    })
    .catch(err=>{
      if(!err.code){
        err={
          "code": 3,
          "msg": "网络出现问题，请刷新重试"
        }
      }
      res.json(err);
    })*!/*/
    try{
      const data=await Users.findOne({username});
      if(data){
        res.json(  {
          "code": 1,
          "msg": "此用户已存在"
        });
      }else{
        const data=await Users.create({username,password:md5(password),type});
        //返回成功的响应
        res.json({
          code: 0,
          data: {
            _id: data._id,
            username: data.username,
            type: data.type
          }
        })
      }
    }catch(e){
      //说明findOne / create方法出错了
      //返回失败的响应
      res.json({
        "code": 3,
        "msg": "网络不稳定，请重新试试~"
      })
    }
    
})
//暴露出去
module.exports=router;