var app=getApp();
var empty;
var result;
var job=[];//用于前端页面显示
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty:true
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
    job = [];
    console.log(empty)
    var that = this;
    for (var i = 0; i < app.globalData.accountInfo['baoming'].length; i++) {
      wx.cloud.callFunction({
        name: 'searchJobById',
        data: {
          _id: app.globalData.accountInfo['baoming'][i]
        },
        success: function (res) {
          console.log(res.result.data);
          result = res.result.data;
          job.push(result);
          console.log(job);
          that.setData({
            job
          })
        }
      })

    }
    if (app.globalData.accountInfo['baoming'].length != 0) {
      console.log("当前报名内容不为空");
      empty = false;
    }
    else {
      console.log("当前报名内容为空");
      empty = true;
    }
    console.log(job);
    that.setData({
      empty
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

  }
})