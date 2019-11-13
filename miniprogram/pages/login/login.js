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

  login(){
    let that = this;
    admin.get({
      success:(res) => {
        let user=res.data;
        console.log(res.data);
        console.log(username);
        for(let i=0;i<user.length;i++){
          if(username===user[i].account){
            if(password===user[i].password){
              // 登录成功后把信息存入全局变量
              app.globalData.userNameGlobal=username;
              app.globalData.sign = user[i].sign;
              app.globalData.tel = user[i].telphone;
              app.globalData.id123=user[i]._id;
              app.globalData.imageId = user[i].touxiang;
              username=null;//存入全局后将变量清空防止账号登出后依然能进入
              password=null;//同上
              console.log("头像地址"+app.globalData.imageId)
              wx.showToast({
                title: '登陆成功',
                icon:'success',
                duration:2500
              })
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
            else{
              wx.showToast({
                title: '密码错误',
                icon:'none',
                duration: 2500
              })
            }
          }
        }
      }
    })
  }
})