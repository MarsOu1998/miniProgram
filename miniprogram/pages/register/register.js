// pages/register/register.js

let app = getApp();
const db = wx.cloud.database();
const admin = db.collection('user');
let userName = null;
let password = null;
let passwordAgain = null;
let nickname=null;
let flag_business;

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
  login: function () {
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },
  inputUserName: function (event) {
    userName = event.detail.value;
  },
  inputPassword: function (event) {
    password = event.detail.value;
  },
  inputPasswordAgain: function (event) {
    passwordAgain = event.detail.value;
  },
  //获取radio的值
  business:function(event){
    flag_business=event.detail.value;
    console.log("是否选择为商家:" + flag_business);
  }
  ,
  register: function () {
    console.log(password+" "+passwordAgain);
    if (password != passwordAgain) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 1500,
      })
    }
    else {
      wx.cloud.callFunction({
        name:'login1',
        data:{
          username: userName
        },
        success:res=>{
          if (res.result.data.length!=0){
            console.log("账号已存在");
            wx.showToast({
              title: '账号已存在',
              icon:'none'
            })
          }
          else{
            console.log("此账号不存在，可以注册");
            app.globalData.userNameGlobal = userName;
            if(flag_business=="yes"){
            admin.add({
              data:{
                account: userName,
                password: password,
                nickname: userName,
                touxiang: "cloud://part-time-job-yw301.7061-part-time-job-yw301-1259707559/touxiang/touxiang.jpg",
                sign: '个性签名',
                telphone: '手机号',
                shangjia:1,
                creditScore:60
              }
            })
            wx.showToast({
              title: '注册成功，即将进入主页',
              icon:'none',
              success:function(){
                setTimeout(function(){
                wx.switchTab({
                  url: '/pages/index/index',
                })
              },2000);}
            })
          }
          else{
              admin.add({
                data: {
                  account: userName,
                  password: password,
                  nickname: userName,
                  touxiang: "cloud://part-time-job-yw301.7061-part-time-job-yw301-1259707559/touxiang/touxiang.jpg",
                  sign: '个性签名',
                  telphone: '手机号',
                  shangjia: 0
                }
              })
              wx.showToast({
                title: '注册成功，即将进入主页',
                icon: 'none',
                success: function () {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }, 2000);
                }
              })
          }
          }
        },
        fail:res=>{

        }
      })
    }

  }
})