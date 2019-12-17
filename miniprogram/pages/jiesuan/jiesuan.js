var app = getApp();
var fabu = [];//获取当前用户已发布的工作id
var job = [];
var count = 0;//统计获取到的工作数量
var page = 0;
var indexPage;//首页
var nextPage;//下一页
var lastPage;//上一页
var result = [];

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
    result = [];
    var that = this;
    fabu = app.globalData.accountInfo['fabu'];
    count = fabu.length;
    console.log("目前此账号已发布工作id如下:");
    console.log(fabu);
    wx.cloud.callFunction({
      name: 'searchJobByUser',
      data: {
        'id': app.globalData.accountInfo['_id'],
        count: fabu.length,
        page: page
      },
      success: function (res) {
        result = res.result.data;
        console.log(result);
        app.globalData.job1 = result[0];
        app.globalData.job2 = result[1];
        app.globalData.job3 = result[2];
        app.globalData.job4 = result[3];
        app.globalData.job5 = result[4];
        that.setData({
          result
        })
      }
    })
    console.log("当前获取工作数量为：" + count);
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
  next: function () {
    var that = this;
    lastPage = true;

    if (page <= count) {
      if (count - page < 5) {
        page = count;
      } else {
        page += 5;
      }
    }
    if (page > 5) {
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
      name: 'searchJobByUser',
      data: {
        'id': app.globalData.accountInfo['_id'],
        count: count,
        page: page
      },
      success: function (res) {
        result = res.result.data;
        console.log(result);
        app.globalData.job1 = result[0];
        app.globalData.job2 = result[1];
        app.globalData.job3 = result[2];
        app.globalData.job4 = result[3];
        app.globalData.job5 = result[4];
        that.setData({
          result
        })
      }
    })

  },
  last: function () {
    var that = this;
    result = [];
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
      name: 'searchJobByUser',
      data: {
        'id': app.globalData.accountInfo['_id'],
        count: fabu.length,
        page: page
      },
      success: function (res) {
        result = res.result.data;
        console.log(result);
        app.globalData.job1 = result[0];
        app.globalData.job2 = result[1];
        app.globalData.job3 = result[2];
        app.globalData.job4 = result[3];
        app.globalData.job5 = result[4];
        that.setData({
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
      name: 'searchJobByUser',
      data: {
        'id': app.globalData.accountInfo['_id'],
        count: fabu.length,
        page: page
      },
      success: function (res) {
        result = res.result.data;
        console.log(result);
        app.globalData.job1 = result[0];
        app.globalData.job2 = result[1];
        app.globalData.job3 = result[2];
        app.globalData.job4 = result[3];
        app.globalData.job5 = result[4];
        that.setData({
          result
        })
      }
    })

  }
})