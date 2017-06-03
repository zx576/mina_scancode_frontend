//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登陆认证用户
    // this.login_u()

    // 
  },

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
    var domin_url = this.globalData.domin
    var encryptdata = {}
    // 登陆
    wx.login({
      success: function (res) {
        console.log('loginsuc',res)

        encryptdata['code'] = res['code']
        // 请求用户信息
        wx.getUserInfo({
          success: function (res) {
            console.log('getuserinfosuc',res)

            // that.globalData.UserInfo = res['rawData']
            encryptdata['encrypteddata'] = res['encryptedData']
            encryptdata['iv'] = res['iv']

            console.log('加密信息',encryptdata)
            // 请求服务器
            wx.request({
              url: domin_url+'login/',
              data: encryptdata,
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                // 出错位置
                console.log('login_r', res)
                // console.log('login_r_type', typeof (res['data']['cookie']))

                if (typeof res.error !== 'undefined') {
                  // 与服务器链接失败
                  console.log('与服务器链接失败')
                  wx.navigateTo({
                    url: '../error/error?errorinfo=' + '服务器未响应',
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

                  // 添加全局 cookie
                  // that.setData({
                  //   cookie: res['data']['cookie']

                  // })
                  that.globalData.cookie = userinfo['cookie']
                  that.globalData.userInfo = userinfo
                  that.globalData.dirs = info['dirs']
                  that.globalData.cur_dir = info['dirs'][0]
                  console.log('global',that.globalData)
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
    domin: 'https://lab.crossincode.com/scan/',
    cookie: ''
  },

  // console.log()
})
