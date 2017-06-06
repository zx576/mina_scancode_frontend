//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    status:'正在连接服务器',
    dir: '',
    hidden: false,
    loadtext: '加载中...'
  },
  //事件处理函数
  // bindViewTap: function() {

  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // 加载函数
  onLoad: function () {
    var that = this

    app.login_u(function(globaldata){
      // console.log('globaldt_index',globaldata)
      if (globaldata.cur_dir !== 'undefined'){
        that.setData({
          userInfo: globaldata.userInfo,
          dir: globaldata.cur_dir,
          hidden: true

        })
      } else {
        that.setData({

          loadtext: '加载失败，请稍后重试'
        })
      }

    })
  
    // console.log('indexdata',this.data)
    // 状态

    
  },
  
  onShow: function () {
    // console.log('onshow',app.globalData)
    var g_dir = app.globalData.cur_dir
    var i_dir = this.data.dir

    if ( g_dir !== 'null' && g_dir !== i_dir){
      this.setData({
        dir: g_dir
      })
    }
  },


  // 扫码入库
  datain: function(){
    wx.scanCode({
      success: function(res){
        // 跳转页面
        wx.navigateTo({
          url: '../datain/datain?res='+res['result']
    })
      },
      fail: function(res){
        var error = '入库扫码失败'
        wx.navigateTo({
          url: '../error/error?error='+error,
        })
      }
    })
  },


  // 扫码出库
  dataout: function(){

    wx.scanCode({
      success: function(res){
        var result = res['result']
        wx.navigateTo({
          url: '../dataout/dataout?code='+result,
        })
      },
      fail: function (res) {
        var error = '出库扫码失败'
        wx.navigateTo({
          url: '../error/error?error=' + error,
        })
      }
    })
    
  },

  // 查询条目
  query: function(){
    
    wx.navigateTo({
      url: '../query/query',
    })
  }

})
