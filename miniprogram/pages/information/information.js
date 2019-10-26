// pages/information/information.js
const app=getApp();
const db = wx.cloud.database();
const admin = db.collection('user');//数据库里面集合名字
var nickname1="lelelelele";
var id;

Page({

  /**
   * Page initial data
   */
  data: {
    placeholder: app.globalData.userNameGlobal
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
  //保存从键盘输入的用户名
  inputNickName:function(event){
    nickname1 = event.detail.value;
  },
  //提交修改信息
  saveMessage:function(){ 

    let that = this;
    admin.get({
      success: (res) => {
        let user = res.data;
        console.log(res.data);
        console.log(user.length);
        for (var i = 0; i < user.length; i++){
          if (app.globalData.userNameGlobal === user[i].account) {
            id=user[i]._id;
            break;
          }
        }
        console.log(id);

        wx.cloud.callFunction({
          name: 'updateInfo',
          data: {
            _id: id,
            nickname:nickname1
          },
          success: res => {
            console.log('更新数据成功')
            console.log(nickname1)
            wx.switchTab({
              url: '/pages/mine/mine',
              icon:'success',
              duration:2500
            })
            app.globalData.nickName=nickname1;
          }
        })
        

      }
    })
       
  }
})