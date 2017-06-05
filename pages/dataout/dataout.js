// dataout.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    cookie: '',
    domain: '',
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
    var domain = app.globalData.domain

    this.setData({
      code: options.code,
      cookie: cookie,
      dir: dir,
      domain: domain,

    })

    this.query_qr2()


  },

  query_qr2: function () {
    var that = this
    var data = {}
    data['cookie'] = this.data.cookie
    data['code'] = this.data.code
    data['dir'] = this.data.dir
    var domain_url = this.data.domain

    // console.log('dtout',this.data)

    // 查询扫码信息
    wx.request({
      url: domain_url + 'checkqr/',
      method: 'POST',
      data: Util.json2Form(data),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res)
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
    var domain_url = this.data.domain
    data['code'] = this.data.code
    data['dir'] = this.data.dir
    data['cookie'] = this.data.cookie


    // console.log(data)
    // 与后台交互
    wx.request({
      url: domain_url + 'dataout/',
      method: 'POST',
      data: Util.json2Form(data),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        var info = res.data
        if (typeof info.error !== 'undefined'){

          wx.navigateTo({
            url: '../error/error?error=' + info.error,
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
var Util = require('../../utils/util.js')