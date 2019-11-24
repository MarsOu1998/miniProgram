// pages/login/login.js

let app=getApp();
const db=wx.cloud.database();
const admin=db.collection('user');//数据库里面集合名字
let username=null;
let password=null;
var test = app.globalData.userNameGlobal;
Page({

  /**
   * Page initial data
   */
  data: {
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  register: function () {
    wx.redirectTo({
      url: '/pages/register/register'
    })
  },
  inputUserName:function(event){
      username=event.detail.value;
    //把账号放到变量里面
  },
  inputPassword:function(event) {
      password=event.detail.value;//把密码放到变量里面
  },
  login1:function(){
    wx.cloud.callFunction({
      name:'login1',
      data:{
        username:username
      },
      success:res=>{
        if(res.result.data.length!=0){
          console.log("账号存在，查询成功");
          if (res.result.data[0].password == password){
            console.log("密码校验成功，即将转入主页");
            // 登录成功后把信息存入全局变量
            app.globalData.userNameGlobal = username;
            app.globalData.nickName = res.result.data[0].nickname;
            app.globalData.sign = res.result.data[0].sign;
            app.globalData.tel = res.result.data[0].telphone;
            app.globalData.id123 = res.result.data[0]._id;
            app.globalData.imageId = res.result.data[0].touxiang;
            username = null;//存入全局后将变量清空防止账号登出后依然能进入
            password = null;//同上
            wx.showToast({
              title: '登陆成功',
              icon:'success',
              success:function(){
                setTimeout(function(){
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                },2000
                );
              }
            })
          }
          else
          {
            console.log("密码错误");
            wx.showToast({
              title: '密码错误',
              icon:'none'
            })
          }
        }
        else{
          console.log("账号不存在，查询失败");
          wx.showToast({
            title: '不存在此账号',
            icon:'none'
          })
        }
      },
      fail:res=>{
        console.error();
      } 
    })
  }
})