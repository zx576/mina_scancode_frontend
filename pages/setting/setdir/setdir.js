// setdir.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cookie: '',
    domain: '',
    dirArray: '', // 所有仓库名列表
    dir: '', // 目前选择
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var cookie = app.globalData.cookie
    var dir = app.globalData.cur_dir
    var domain = app.globalData.domain
    var dirs = app.globalData.dirs

    var array = []
    for (var key of dirs){
        var dct = {}
        if (key == dir){
            dct['checked'] = 'true'
        }
        dct['name'] = key
        dct['value'] = key
        array.push(dct)
    }
    this.setData({
      cookie: cookie,
      dir: dir,
      domain:domain,
      dirArray:array 
    })
    
    
  },

  radioChange: function(e) {
      var dir = e.detail.value
      this.setData({
          dir: dir
      })
      app.globalData.cur_dir = this.data.dir
  },

  returnindex: function () {
    wx.switchTab({
      url: '/pages/index/index',
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