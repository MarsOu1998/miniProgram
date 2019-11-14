//index.js
const app = getApp()
const db = wx.cloud.database();
const admin = db.collection('user');//数据库里面集合名字

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 进入首页后获取用户昵称和个性签名
    admin.get({
    success:(res)=>{
      let user = res.data;
      for (let i = 0; i < user.length; i++) {
        if (app.globalData.userNameGlobal==user[i].account){
          app.globalData.nickName=user[i].nickname;
          app.globalData.sign = user[i].sign;
          app.globalData.tel = user[i].telphone;
          app.globalData.id123 = user[i]._id;
          app.globalData.imageId = user[i].touxiang;
          console.log(app.globalData.nickName);
          break;
        }
      }
       
    }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //跳转到工作页面
  work1:function(){
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  }
})