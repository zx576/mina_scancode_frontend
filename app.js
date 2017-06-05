//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },

  // 弃用方法
  getUserInfo:function(cb){
    console.log(cb)
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      // 调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
      
    }
  },


  // 认证用户
  login_u: function (cb) {
    var that = this
    var domain_url = this.globalData.domain
    var encryptdata = {}
    // 登陆
    wx.login({
      success: function (res) {
        // console.log('loginsuc',res)
        encryptdata['code'] = res['code']
        
        // 请求用户信息
        wx.getUserInfo({
          success: function (res) {
            // console.log('getuserinfosuc',res)
            encryptdata['encrypteddata'] = res['encryptedData']
            encryptdata['iv'] = res['iv']
            console.log('加密信息',encryptdata)
            // 请求服务器
            wx.request({
              url: domain_url+'login/',
              method:'POST',
              data: Util.json2Form(encryptdata),
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                var info = res['data']
                // console.log('login_r', res)
                if (typeof info.error !== 'undefined') {
                  // 与服务器链接失败
                  console.log('与服务器链接失败')
                  
                  wx.navigateTo({
                    url: '../error/error?error=' + info.error,
                  })
                } else {
                  // 服务器返回内容
                  var info = res['data']
                  var userinfo = info['info']
                  // 缓存 cookie
                  wx.setStorage({
                    key: 'cookie',
                    data: userinfo['cookie']
                  })

                  // 添加全局数据
                  that.globalData.cookie = userinfo['cookie']
                  that.globalData.userInfo = userinfo
                  that.globalData.dirs = info['dirs']
                  that.globalData.cur_dir = info['dirs'][0]
                  // console.log('global',that.globalData)
                  typeof cb == "function" && cb(that.globalData)
                }
              },
              // 请求服务器失败
              fail: function () {
                console.log('请求服务器失败')
                wx.navigateTo({
                  url: '../error/error?errorinfo=' + '请求服务器失败',
                })
              }

            })
          },
          // 获取用户信息失败
          fail: function (res) {
            console.log('获取用户信息失败', res)
            wx.navigateTo({
              url: '../error/error?errorinfo=' + '获取用户信息失败',
            })

          }
        })

      },

      // 登陆失败
      fail: function (res) {
        console.log('登陆失败', res)
        wx.navigateTo({
          url: '../error/error?errorinfo=' + '登陆失败',
        })
      }
    })

  },


  globalData:{
    userInfo:null,
    cur_dir: null,
    dirs: null,
    domain: 'https://lab.crossincode.com/scan/',
    // domain: 'http://127.0.0.1:8000/scan/',
    cookie: ''
  },

})
// 导入 utils 处理 post 请求数据
var Util = require('./utils/util.js')