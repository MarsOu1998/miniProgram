var app=getApp();
var input;

// pages/search/search.js
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
  input:function(res){
    app.globalData.jobSearch=res.detail.value;
    
  },
  search:function(){
    console.log("全局变量——工作关键字已存储：" + app.globalData.jobSearch);
    wx.navigateTo({
      url: '/pages/jobResult/jobResult',
    })
  },
  student:function(){
    app.globalData.jobSearch="学生";
    wx.navigateTo({
      url: '/pages/jobResult/jobResult',
    })
  },
  jiaqi: function () {
    app.globalData.jobSearch = "假期";
    wx.navigateTo({
      url: '/pages/jobResult/jobResult',
    })
  },
  rijie: function () {
    app.globalData.jobSearch = "日结";
    wx.navigateTo({
      url: '/pages/jobResult/jobResult',
    })
  },
  baojie: function () {
    app.globalData.jobSearch = "保洁";
    wx.navigateTo({
      url: '/pages/jobResult/jobResult',
    })
  },
  linshi: function () {
    app.globalData.jobSearch = "学生";
    wx.navigateTo({
      url: '/pages/jobResult/jobResult',
    })
  },
  fuwuyuan: function () {
    app.globalData.jobSearch = "服务员";
    wx.navigateTo({
      url: '/pages/jobResult/jobResult',
    })
  }
})