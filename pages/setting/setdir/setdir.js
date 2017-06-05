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
    objectArray:'', // 仓库以及索引
    dir: '', // 目前选择
    index : 0 // 仓库索引
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var cookie = app.globalData.cookie
    var dir = app.globalData.cur_dir
    var domain = app.globalData.domain
    var dirs = app.globalData.dirs
    // console.log('stdirs=',dirs)
    var count = 0
    var obj = []
    var cur_index = 0

    for (var key of dirs){
      // console.log('key=',key)
      if (key == dir){
        cur_index = count
      }
      var dct = {}
      dct['name'] = key
      dct['id'] = count
      obj.push(dct)
      count += 1
    }

    this.setData({
      cookie: cookie,
      dir: dir,
      domain:domain,
      objectArray:obj,
      index:cur_index,
      dirArray:dirs 
    })
    
    // this.query_dir()
    // console.log('setdir',this.data)

    
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value
    this.setData({
      index: index
    })
    app.globalData.cur_dir = this.data.dirArray[index]
    // console.log('changedir', app.globalData.cur_dir)
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