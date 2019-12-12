var app=getApp();
var fabu=[];//获取当前用户已发布的工作id
var job=[];
var count = 0;//统计获取到的工作数量
var page = 0;
var indexPage;//首页
var nextPage;//下一页
var lastPage;//上一页
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
            job.push(res.result.data[0]);
          that.setData({
            job
          })
        }
      })
    }
    count=fabu.length;
    console.log("当前获取工作数量为："+count);
    if (count > 5) {
      nextPage = true;
      that.setData({
        nextPage
      })
    }
    if (nextPage) {
      indexPage = true;
      that.setData({
        indexPage
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

  },


  0: function () {
    app.globalData.job = app.globalData.job1;
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },
  1: function () {
    app.globalData.job = app.globalData.job2;
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },
  2: function () {
    app.globalData.job = app.globalData.job3;
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },
  3: function () {
    app.globalData.job = app.globalData.job4;
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },
  4: function () {
    app.globalData.job = app.globalData.job5;
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },
  next: function () {
    var that = this;
    if (page <= count) {
      if (count - page < 5) {
        page = count;
      } else {
        page += 5;
      }
    }
    if (page >= 5) {
      lastPage = true;
      console.log("lastPage:" + lastPage);
    }
    that.setData({
      lastPage,
      page
    })
    console.log("page:" + page);
    console.log("count:" + count);
    wx.cloud.callFunction({
      name: 'searchJob',
      data: {
        query: app.globalData.jobSearch,
        count: count,
        page: page
      },
      success: function (res) {
        result = res.result.data;
        console.log(result);
        //把当前结果存入全局变量，便于页面切换也不会丢失结果
        app.globalData.job1 = result[0];
        app.globalData.job2 = result[1];
        app.globalData.job3 = result[2];
        app.globalData.job4 = result[3];
        app.globalData.job5 = result[4]; that.setData({
          result
        })
      }
    })
  },
  last: function () {
    var that = this;
    if (page > 0) {
      page -= 5;
    }
    if (page < 0) {
      page = 0;
    }
    this.setData({
      page
    })
    wx.cloud.callFunction({
      name: 'searchJob',
      data: {
        query: app.globalData.jobSearch,
        count: count,
        page: page
      },
      success: function (res) {
        result = res.result.data;
        console.log(result);
        //把当前结果存入全局变量，便于页面切换也不会丢失结果
        app.globalData.job1 = result[0];
        app.globalData.job2 = result[1];
        app.globalData.job3 = result[2];
        app.globalData.job4 = result[3];
        app.globalData.job5 = result[4]; that.setData({
          result
        })
      }
    })
  },
  first: function () {
    var that = this;
    page = 0;
    this.setData({
      page
    })
    wx.cloud.callFunction({
      name: 'searchJob',
      data: {
        query: app.globalData.jobSearch,
        count: count,
        page: page
      },
      success: function (res) {
        result = res.result.data;
        console.log(result);
        //把当前结果存入全局变量，便于页面切换也不会丢失结果
        app.globalData.job1 = result[0];
        app.globalData.job2 = result[1];
        app.globalData.job3 = result[2];
        app.globalData.job4 = result[3];
        app.globalData.job5 = result[4]; that.setData({
          result
        })
      }
    })

  }
})