var businessName;//商家名字
var app=getApp();//获取全局变量


// pages/qiehuan/qiehuan.js
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
      businessName: app.globalData.nickName
    })
    console.log("商家名称:"+businessName);
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
  // 发布工作
  fabu:function(){
    wx.navigateTo({
      url: '/pages/fabu/fabu',
    })
  },
  shenqing:function(){
    wx.navigateTo({
      url: '/pages/shenqing/shenqing',
    })
  },
  chexiao:function(){
    wx.navigateTo({
      url: '/pages/chexiao/chexiao',
    })
  },
  jiesuan: function () {
    wx.navigateTo({
      url: '/pages/jiesuan/jiesuan',
    })
  }
})