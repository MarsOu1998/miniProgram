// pages/register/register.js

let app = getApp();
const db = wx.cloud.database();
const admin = db.collection('user');
let userName = null;
let password = null;
let passwordAgain = null;
let nickname=null;

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
      let that = this;
      admin.get({
        success: function (res) {
          let user = res.data;
          for (var i = 0; i < user.length; i++) {
            if (user[i].account == userName) {
              wx.showToast({
                title: '账号已存在',
                icon: 'none'
              })
              break;
            }

          }
          if (i == user.length) {
            app.globalData.userNameGlobal = userName;

            admin.add({
              data: {
                account: userName,
                password: password,
                nickname: userName,
                touxiang: "cloud://part-time-job-yw301.7061-part-time-job-yw301-1259707559/touxiang/默认头像.jpg",
                sign:' ',
                telphone:' '
              },
              
              // 注册成功后把信息存入全局变量
              
              success: function (res) {
               
                wx.showToast({
                  title: '注册成功',
                  icon: 'success',
                  duration: 2500,
                  success:function(){
                    setTimeout(function(){
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    },2000)
                  }
                })
                  
              }
            })
          }
        }
      })
      
    }

  }
})