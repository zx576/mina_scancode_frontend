// dataout.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    cookie: '',
    domin: '',
    dir: '',
    name: '',
    remarks:'',
    count:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('op',options)

    var cookie = app.globalData.cookie
    var dir = app.globalData.cur_dir
    var domin = app.globalData.domin

    this.setData({
      code: options.code,
      cookie: cookie,
      dir: dir,
      domin: domin,

    })

    this.query_qr2()


  },

  query_qr2: function () {
    var that = this
    var data = {}
    data['cookie'] = this.data.cookie
    data['code'] = this.data.code
    data['dir'] = this.data.dir
    var domin_url = this.data.domin

    console.log('dtout',this.data)

    wx.request({
      url: domin_url + 'checkqr/',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var info = res['data']
        if (typeof info.error !== 'undefined') {
          // 用户信息错误
          // console.log(info.error)
          wx.navigateTo({
            url: '../error/error?error=' + '用户信息错误',
          })
        } else if (info.exist == 'none_existed') {
          // 数据库内无信息
          console.log(info)
          wx.navigateTo({
            url: '../error/error?error=' + '不存在此商品',
          })
        } else {
          // 数据库内有该条目

          that.setData({

            name: info['name'],
            remarks: info['remarks'],
            count: info['count']

          })
        }
      }

    })
  }, 

  dataOut: function(){
    var data = {}
    var domin_url = this.data.domin
    data['code'] = this.data.code
    data['dir'] = this.data.dir
    data['cookie'] = this.data.cookie
    // data[]

    console.log(data)
    wx.request({
      url: domin_url + 'dataout/',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var info = res.data
        if (typeof res.error !== 'undefined'){
          wx.navigateTo({
            url: '../error/error?error=' + res.error,
          })
        } else {
          var count = info.cur_count
          var s_info = '出库成功，目前库存为' + count
          wx.navigateTo({
            url: '../success/success?sucinfo=' + s_info,
          })
        }
      }
    })


    // wx.switchTab({
    //   url: '/pages/index/index',
    // })

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