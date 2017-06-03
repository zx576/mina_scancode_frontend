// setting.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dirname: '', // 仓库名
    cookie: '',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cookie = app.globalData.cookie
    var domin = app.globalData.domin
    this.setData({
      cookie: cookie,
      domin: domin
    })

  },

  getinput: function (e) {
    console.log(e)
    this.setData({
      dirname: e.detail.value
    })
  },

  submit: function () {
    // var that = this
    var data = {}
    data['cookie'] = this.data.cookie
    var dirname = this.data.dirname
    data['dirname'] = dirname
    var domin_url = this.data.domin

    wx.request({
      url: domin_url + 'builddir/',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var info = res['data']
        if (typeof info.error !== 'undefined') {
          wx.navigateTo({
            url: '/pages/error/error?error=' + info['error'],
          })
        } else {
          // 把当前仓库添加到全局
          app.globalData.dirs.push(dirname)
          console.log('buildnew=', app.globalData.dirs)
          // 新建仓库
          wx.navigateTo({
            url: '/pages/success/success?sucinfo=' + info['status'],
          })
        }
      },
      fail: function (res) {
        // 链接服务器错误
        wx.navigateTo({
          url: '/pages/error/error?error=' + '请求服务器出错',
        })
      }

    })

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