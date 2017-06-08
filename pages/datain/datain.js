// datain.js

// 获取全局数据
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    code: '', // 扫码结果
    name: '',
    remarks: '',
    count: 0, // 商品数量默认为0
    dir:'',  // 仓库名
    cookie: '',
    domain: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    var cookie = app.globalData.cookie
    var dir = app.globalData.cur_dir
    var domain = app.globalData.domain

    this.setData({
      code: options.res,
      cookie: cookie,
      dir: dir,
      domain: domain,

    })

    // console.log('thisdata',this.data)

  this.query_qr2()

  },

  query_qr2: function(){

    var that = this
    var data = {}
    data['cookie'] = this.data.cookie
    data['code'] = this.data.code
    data['dir'] = this.data.dir
    var domain_url = this.data.domain

    // 请求后台，获取扫码商品详细信息
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
            url: '../error/error?error=' + info['error'],
          })
        } else if (info.exist == 'none_existed') {
          // 数据库内无信息
          console.log(info)
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

  namein: function (e) {
    console.log('namein',e)
    var that = this
    var name = e.detail.value
    that.setData({
      name: name
    })
    
    
  },

  remarkin: function (e) {
    console.log('REMARKIN', e)
    var remarks = e.detail.value
    var that = this

    that.setData({
      remarks: remarks
    })
    // console.log('insideif',that.data.remarks)
    
  },

  saveDataIn: function () {
  
    var data = {}
    var domain_url = this.data.domain
    data['name'] = this.data.name
    data['code'] = this.data.code
    data['remarks'] = this.data.remarks
    data['cookie'] = this.data.cookie
    data['dir'] = this.data.dir

    console.log('所有数据',data)

    // 处理商品名,备注名为空的情况
    if (data['name'] == ''){
      data['name'] = data['code'].substring(0,16)
    }

    if (data['remarks'] == ''){
      data['remarks'] = ''
    }

    // 请求后台，保存数据
    wx.request({
      url: domain_url + 'datain/',
      method: 'POST',
      data: Util.json2Form(data),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res)
        var returndata = res.data
        // var errorinfo = ''
        if (typeof returndata.error !== 'undefined'){
          wx.navigateTo({
            url: '../error/error?errorinfo=' + returndata.error,
          })
        } else if (returndata.exist == 'newone'){
          var count = returndata.cur_count
          var info = '已成功创建新条目，目前库存为' + count
          wx.navigateTo({
            url: '../success/success?sucinfo='+info,
          })
        }else {
          var count = returndata.cur_count
          var info = '已向数据库添加数据，目前库存为'+ count
          wx.navigateTo({
            url: '../success/success?sucinfo=' + info,
          })
        }
      },
      fail: function(res){
        wx.navigateTo({
          url: '../error/error?errorinfo=' + '请求服务器失败',
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

// 导入 utils
var Util = require('../../utils/util.js')