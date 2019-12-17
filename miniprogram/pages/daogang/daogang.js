var app=getApp();
var daogang;
var job;
var empty;
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
    var that = this;
    empty=false;
    job=[];
    daogang = app.globalData.accountInfo['daogang'];
    console.log("当前用户到岗的工作有:");
    console.log(daogang);
    if(daogang.length){
      empty=true;
    }
    if (daogang.length <= 5) {
      for (var i = 0; i < daogang.length; i++) {
        wx.cloud.callFunction({
          name: 'searchJobById',
          data: {
            _id: daogang[i],
          },
          success: function (res) {
            console.log("当前第" + i + "次获取工作内容为:");
            console.log(res.result.data[0]);
            job.push(res.result.data[0]);
            that.setData({
              job,empty
            })
          }

        })
      }
    }

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