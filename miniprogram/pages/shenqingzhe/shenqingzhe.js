var app=getApp();
var job=[];
var empty;
var user=[];
var baoming=[];//更改用户报名的信息
var luqu=[];//存放录取用户的工作id
var shenqing=[];//存放当前工作中申请的用户id
var page;//用于页数控制
var nextPage;//控制下一页
var lastPage;//控制上一页
var indexPage;//控制首页
var number;//控制页面
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
      page=0;
      user=[];
      job=app.globalData.job;
      if(job['shenqing']==0){
        empty=true;
      }
      else{
        empty=false;
      }
      console.log("empty:"+empty)
      this.setData({
        empty
      })
      console.log("此工作申请者id:");
      console.log(job['shenqing']);
      //循环取出当前工作的申请者id，从数据库中获取完整信息，放入user数组显示在前端页面
    if (job['shenqing'].length>5){
      indexPage=nextPage=true;
      indexPage=true;
      number=page+5;
      for (page; page < number; page++) {
        console.log("page=" + page);
        console.log(job['shenqing']);
        wx.cloud.callFunction({
          name: 'selectUserById',
          data: {
            _id: job['shenqing'][page]
          },
          success: function (res) {
            console.log(res.result.data[0]);
            user.push(res.result.data[0]);
            baoming = res.result.data[0]['baoming']
            luqu = res.result.data[0]['luqu'];
            console.log("当前录取的人有:")
            console.log(luqu);
            user = user.reverse();
            that.setData({
              user,nextPage,indexPage
            })
          }
        })
      }
    }else{
    for (var i = 0; i < job['shenqing'].length;i++){
      console.log("page=" + page);
      console.log(job['shenqing']);
      wx.cloud.callFunction({
        name:'selectUserById',
        data:{
          _id: job['shenqing'][i]
        },
        success:function(res){
          console.log(res.result.data[0]);
          user.push(res.result.data[0]);
          baoming = res.result.data[0]['baoming']
          luqu = res.result.data[0]['luqu'];
          console.log("当前录取的人有:")
          console.log(luqu);
          user=user.reverse();
          that.setData({
            user
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

  },
  agree:function(event){
    var that=this;
    var id = event.currentTarget.dataset.id;
    console.log("当前点击第"+id+"个按钮");
    console.log("当前数组中第"+id+"个账号为:"+user[id]['_id']);
    user.splice(id,1);
    that.setData({
      user
    })
    console.log(baoming)
    console.log(job['_id'])
    //查找用户数组baoming中当前工作的id，将其删除，准备录取该用户，在用户的luqu字段中新增此工作
    for(var i=0;i<baoming.length;i++){
      if (baoming[i] == job['_id']){
        baoming.splice(i,1);
        luqu.push(job['_id']);
        break;
      }
    }
    wx.cloud.callFunction({
      name:'updateInfo',
      data:{
        _id: user[0]['_id'],
        baoming:baoming,
        luqu:luqu
      },
      success:function(res){
        console.log("用户录取成功");
        shenqing=job['shenqing'];
        console.log("此工作目前申请情况");
        console.log(shenqing);
        for(var i=0;i<shenqing.length;i++){
          if (shenqing[i] == user[0]['_id'])
          {
            shenqing.splice(i,1);
            break;
          }
        }
        
        console.log("申请数组已删除当前用户id");
        console.log(shenqing)
        console.log("当前工作id为" + job['_id']);
        wx.cloud.callFunction({
          name:'updateBusInfo',
          data:{
            _id:job['_id'],
            shenqing:shenqing
          },
          success:function(res){
            console.log("以从当前工作的申请者中删除该用户，因已录取");
          }
        })
      }
    })
  },
  disagree:function(event){
    var that=this;
    console.log(user);
    var id = event.currentTarget.dataset.id;
    console.log("当前点击第" + id + "个按钮");
    console.log("当前数组中第" + id + "个账号为:" + user[id]['_id']);
    user.splice(id,1);
    var sq = [];//暂时存储删除用户id后user数组
    console.log(user)//把user打印出来看看
    if(user.length==0){
      sq=[];//防止找不到空数组中的键名而报错
    }
    else{
      for (var i = 0; i < user[i]['_id']; i++) {
        sq.push(user[i]['_id']);
      }
    }
    that.setData({
      user
    })
   
    wx.cloud.callFunction({
      name:'updateBusInfo',
      data:
      {
        _id:job['_id'],
        shenqing:sq
      },
      success:function(res){
        console.log("已拒绝该用户的申请，已从job数据库中删除此申请者。")
      }
    })
  },
  next:function(){
    user=[]
    var that=this;
    console.log("page="+page);
    if (job['shenqing'].length-page<5){
      for (page; page < job['shenqing'].length; page++) {
        console.log("page="+page);
        console.log(job['shenqing']);
        wx.cloud.callFunction({
          name: 'selectUserById',
          data: {
            _id: job['shenqing'][page]
          },
          success: function (res) {
            console.log(res.result.data[0]);
            user.push(res.result.data[0]);
            baoming = res.result.data[0]['baoming']
            luqu = res.result.data[0]['luqu'];
            console.log("当前录取的人有:")
            console.log(luqu);
            user = user.reverse();
            that.setData({
              user, nextPage, indexPage
            })
          }
        })
      }
    }
    else{
      number=page+5;
    for (page; page < number; page++) {
      console.log("page=" + page);
      console.log(job['shenqing']);
      wx.cloud.callFunction({
        name: 'selectUserById',
        data: {
          _id: job['shenqing'][page]
        },
        success: function (res) {
          console.log(res.result.data[0]);
          user.push(res.result.data[0]);
          baoming = res.result.data[0]['baoming']
          luqu = res.result.data[0]['luqu'];
          console.log("当前录取的人有:")
          console.log(luqu);
          user = user.reverse();
          that.setData({
            user
          })
        }
      })
    }
    }
  },
  first:function(){
    user=[];
    var that=this;
    page=0;
    number=0;
    number = page + 5;
    for (page; page < number; page++) {
      console.log("page=" + page);
      console.log(job['shenqing']);
      wx.cloud.callFunction({
        name: 'selectUserById',
        data: {
          _id: job['shenqing'][page]
        },
        success: function (res) {
          console.log(res.result.data[0]);
          user.push(res.result.data[0]);
          baoming = res.result.data[0]['baoming']
          luqu = res.result.data[0]['luqu'];
          console.log("当前录取的人有:")
          console.log(luqu);
          user = user.reverse();
          that.setData({
            user, nextPage, indexPage
          })
        }
      })
    }

  }
})