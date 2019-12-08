var app=getApp();
var fabu=[];//获取当前用户已发布的工作id
var job=[];
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
    var that=this;
    fabu=app.globalData.accountInfo['fabu'];
    console.log("目前此账号已发布工作id如下:");
    console.log(fabu);
    for(var i=0;i<fabu.length;i++){
      wx.cloud.callFunction({
        name: 'searchJobById',
        data:{
          _id:fabu[i]
        },
        success:function(res){
          console.log(res.result.data);
          job.push(res.result.data[0]);
          that.setData({
            job
          })
        }
      })
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