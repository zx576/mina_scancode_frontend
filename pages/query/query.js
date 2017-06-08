// query.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  cookie: '',
  dir: '',
  domain: '',
  // 仓库数据
  info: '',  // 某一仓库下所有数据
  alldata: '', // 全部仓库数据
  dirArray: '', // 所有仓库名列表
  objectArray: '', // 仓库名已经其索引
  index: 0, // 仓库索引号

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // this.get_cookie()
    var cookie = app.globalData.cookie
    var dir = app.globalData.cur_dir
    var domain = app.globalData.domain
    var dirs = app.globalData.dirs

    var cur_index = 0
    var count = 0
    for (var key of dirs){
      if (key == dir){
        cur_index = count
        break
      }
      count += 1
    }


    this.setData({
      // code: options.res,
      cookie: cookie,
      dir: dir,
      domain: domain,
      index: cur_index

    })

    
    this.query_dt()
  },

  query_dt: function(){
    var that = this
    var data = {}
    var domain_url = this.data.domain
    var dir = this.data.dir
    data['cookie'] = this.data.cookie

    console.log('querydata',this.data)

    wx.request({
      url: domain_url + 'query/',
      method: 'POST',
      data: Util.json2Form(data),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        var info = res['data']
        if (typeof info.error !== 'undefined') {
          // 错误处理
          // console.log(info.error)
          wx.navigateTo({
            url: '../error/error?error=' + info.error,
          })
        } else {
          // 所有数据
          // 提出所有仓库
          var dirs = info['dirs']
          // 所有仓库名
          var dirarray = []
          // 仓库名以及索引
          var ob_array = []
          var cur_dir_index = 0
          // 仓库计数
          var count = 0
          for (var key in dirs) {

            if (key == dir){
              cur_dir_index = count
            }
            var dct = {}
            dct['id'] = count
            dct['name'] = key
            dirarray.push(key)
            ob_array.push(dct)
            count += 1
          }
          that.setData({
            // 设置数据
            alldata: dirs,
            dirArray: dirarray,
            objectArray: ob_array,
            info: dirs[dir],

          })
        }
      },
      // 请求服务器错误
      fail: function (res) {
        console.log(res)
        wx.navigateTo({
          url: '../error/error?error=' + '请求服务器出错',
        })

      }

    })
  },



  // 选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value
    var dir = this.data.dirArray[index]
    console.log('dir', dir)
    var dct = this.data.alldata[dir]
    console.log('指定信息', dct)


    this.setData({
      index: e.detail.value,
      info: dct,
      dir: dir,
      // name: dct['name'],
      // remark: dct['remarks']


    })


  },

  index: function(){
    wx.switchTab({
      url: '../index/index',
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