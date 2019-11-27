var app=getApp();
var job;//从全局变量中获取当前工作信息
var accountInfo;//从全局变量中获取当前账号信息
var shoucang={};//获取当前数据库中已收藏的工作id
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
    this.setData({
      job: app.globalData.job,
      accountInfo: app.globalData.accountInfo
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
  shoucang:function(){
    //先获取当前用户已收藏的工作id,把当前工作的_id以数组的形式存入用户的账号中
    
    shoucang=app.globalData.accountInfo['shoucang'];
    console.log("当前用户收藏的工作有:");
    console.log(shoucang);
    console.log("当前工作id："+app.globalData.job['_id']);
    shoucang.push(app.globalData.job['_id']);
    console.log("当前工作添入数组后：");
    console.log(shoucang);
    wx.cloud.callFunction({
      name:'updateInfo',
      data:{
        _id:app.globalData.accountInfo['_id'],
        shoucang:shoucang
      },
      success:res=>{
        console.log(res)
        wx.showToast({
          title: '收藏成功',
        })
      }
      
    })
  }

})