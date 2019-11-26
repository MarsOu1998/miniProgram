// pages/information/information.js
const app=getApp();
const db = wx.cloud.database();
const admin = db.collection('user');//数据库里面集合名字
var nickname;
var sign;
var telphone; 

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
    console.log("已获取全局变量——账号信息");
    console.log(app.globalData.accountInfo);
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
  //保存从键盘输入的用户名
  inputNickName:function(event){
    nickname = event.detail.value;
  },
  inputSign: function (event) {
    sign = event.detail.value;
  },
  inputTel: function (event) {
    telphone = event.detail.value;
  },
  //提交修改信息
  saveMessage:function(){ 
    wx.cloud.callFunction({
      name: 'updateInfo',
      data: {
        _id: app.globalData.accountInfo['_id'],
        nickname: nickname,
        tel: telphone,
        sign: sign

      },
      success: res => {
        console.log('更新数据成功')
        wx.cloud.callFunction({
          name: 'login1',
          data: {
            username: app.globalData.userNameGlobal
          },
          success: res => {
            app.globalData.accountInfo = res.result.data[0];
            console.log("当前用户的账号信息已存入全局变量,变更后信息如下:");
            console.log(app.globalData.accountInfo);
          }
        })
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000,
          success: function () {
            setTimeout(
              function () {
                wx.switchTab({
                  url: '/pages/mine/mine'
                })
              }, 1000
            )
          }
        })


      }
    })   
  }
})