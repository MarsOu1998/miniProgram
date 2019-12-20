var app=getApp();
var user;//保存当前工作已到岗的用户
var empty;
var users;

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
      user=[];
      users=[];
    var jobId = app.globalData.job;
      console.log("当前工作id：");
      console.log(app.globalData.job);
      wx.cloud.callFunction({
        name:'searchJobById',
        data:{
          _id: jobId
        },
        success:function(res){
          console.log("此工作报名者:");
          console.log(res.result.data[0]['daogang']);
          user = res.result.data[0]['daogang'];
          console.log(user);
          if (user.length == 0) {
            empty = true;
          }
          else {
            empty = false;
          }
          that.setData({
            empty
          })
          for(var i=0;i<user.length;i++){
            wx.cloud.callFunction({
              name: 'selectUserById',
              data:{
                _id:user[i]
              },
              success:function(res){
                users.push(res.result.data[0]);
                console.log("此工作到岗者的信息:");
                console.log(users);
                that.setData({
                  users
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

  },
  finish:function(event){
    var id = event.currentTarget.dataset.id;
    console.log("当前用户id：" + users[id]['_id']);
    wx.cloud.callFunction({
      name:'updateInfo',
      data:{
        _id:users[id]['_id']
      }
    })
  }
})