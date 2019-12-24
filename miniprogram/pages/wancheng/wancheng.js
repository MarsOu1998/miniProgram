var job;
var wancheng;
var app=getApp();
// pages/wancheng/wancheng.js
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
    job=[];
    wancheng=[];
    var that=this;
      wx.cloud.callFunction({
        name:'selectUserById',
        data:{
          _id:app.globalData.accountInfo['_id']
        },
        success:function(res){
          wancheng=res.result.data[0]['wancheng'];
          console.log("当前用户已完成的工作ID：")
          console.log(res.result.data[0]['wancheng'])
          for(var i=0;i<wancheng.length;i++){
            wx.cloud.callFunction({
              name:'searchJobById',
              data:{
                _id:wancheng[i]
              },
              success:function(res){
                console.log(res.result)
                job.push(res.result.data[0]);
                console.log("当前用户已完成的工作有:");
                console.log(job)
                that.setData({
                  job
                })
              }
              
            })
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

  }
})