var app=getApp();
var user;//保存当前工作已到岗的用户
var empty;
var users;
var userDaogang;//保存当前用户到岗信息
var job;
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
          //保存当前工作的详细数据
          job=res.result.data[0];
          console.log("当前工作详细内容为:");
          console.log(job)
          console.log("此工作报名者:");
          console.log(res);
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
                console.log(res)
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
    var that=this;
    var id = event.currentTarget.dataset.id;
    console.log("当前用户id：" + users[id]['_id']);

    //保存当前用户已完成的工作
    var wanchengUser = users[id]['wancheng'];
    console.log("当前用户已完成工作有：");
    console.log(wanchengUser);
    
    //把当前点击的工作添加到完成数组中
    wanchengUser.push(app.globalData.job);
    console.log("当前用户已完成的工作有：");
    console.log(wanchengUser);

    //从用户数组中删除当前用户到岗信息
    console.log("当前已到岗用户信息:");
    console.log(users[id]);
    for (var i = 0; i < users[id]['daogang'].length;i++){
      if (users[id]['daogang'][i]==app.globalData.job){
        users[id]['daogang'].splice(i, 1);
        console.log("当前用户已经在数组中删除，因为工作即将完成,当前数组为");
        console.log(users[id]['daogang']);
        break;
      }
    }
   
    //更新用户信息，把到岗的工作添加到完成字段里面
    wx.cloud.callFunction({
      name:'updateInfo',
      data:{
        _id:users[id]['_id'],
       daogang:users[id]['daogang'],
       wancheng:wanchengUser
      },
      success:function(res){
        console.log("当前工作已完成，已从数据库的到岗字段中删除");

        //接下来从job数据库里面删除该到到岗者
        for(var i=0;i<job['daogang'].length;i++){
          if(job['daogang'][i]==users[id]['_id'])
          job['daogang'].splice(i,1);
          console.log("已从当前job['daogang']数组中删除此用户");
          console.log(job);
        }
        wx.cloud.callFunction({
          name:'updateBusInfo',
          data:{
            _id:app.globalData.job,
            daogang: job['daogang']
          },
          success:function(res){
            console.log("已从数据库中删除当前工作者，因工作已完成");
            users.splice(id,1);
          console.log("当前到岗人:");
          console.log(users)
          that.setData({
            users
          })
          }
        })
      }
    })
  }
})