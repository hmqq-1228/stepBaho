//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 0:面试 1:入职
    entrance: 0,
    pagePwdArr: [],
    animationData: {},
    background: [
      'images/start01.png',
      'images/start02.png',
      'images/start03.png'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    imgBaseUrl: getApp().globalData.imgBaseUrl,
    bgCoverShow: false,
    interview: '面试填表',
    newentry: '入职填表',
    interviewClickFuc: null,
    mianBaseInfoClickFuc: null,
    entryBaseInfoClickFuc: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    // var rdSessionId = wx.getStorageSync('rdSessionId')
    // console.log('onReady:rdSessionId:=>' + rdSessionId)
    this.checkUserState()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this

    var animation = wx.createAnimation({
      duration: 5900,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translate(-50, 0).step()
    animation.translate(0, 0).step()

    this.setData({
      animationData: animation.export()
    })

    setInterval(that.balloonMove, 6000)
  },
  balloonMove: function () {
    var animation = wx.createAnimation({
      duration: 6000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translate(-50, 0).step()
    animation.translate(0, 0).step()

    this.setData({
      animationData: animation.export()
    })
  },
  /**
   * 查询rdsessionid状态
   */
  queryRdSessionId: function (sid) {
    console.log('sid:', sid)
    var that = this
    var resultdata = false
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/sessionIsNullOrNot',
      data: {
        rdSessionId: sid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if(res.data.code === 200){
          // console.log('rdSessionId未过期')
        }else{
          // console.log('rdSessionId已经过期')
          that.wxLogin();
        }
      },
      fail: function () {
      }
    })
  },
  /**
   * 检查用户状态
   **/
  checkUserState: function(){
    var that = this
    var rdSessionId = wx.getStorageSync('rdSessionId')
    if (!rdSessionId) {
      // console.log('本地rdSessionId不存在')
      that.wxLogin();
      return;
    }
    //session_key 去微信服务器检查session_key是否过期
    wx.checkSession({
      success: function (res) {
        // 查询用户状态 是面试还是入职
        // console.log('微信服务器session_key未过期')
        that.queryInterviewState()
      },
      fail: function () {
        // console.log('微信服务器session_key已经过期')
        that.wxLogin()
        return;
      }
    })
    // 检查rdSessionId是否过期
    that.queryRdSessionId(rdSessionId)
    return true
  },
  /**
   * 调用微信登录
   */
  wxLogin: function(){
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: getApp().globalData.baseUrl + '/weChat/getSessionKeyOropenid',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              wx.setStorageSync('rdSessionId', res.data.result)
              that.setData({
                bgCoverShow: true
              })
              // console.log(res)
            },
            fail: function(){
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  // toInterview: function(){
  //   var toInterviewFuc = function(){
  //     getApp().setPageType(1)
  //     wx.navigateTo({
  //       url: '../interview/interview'
  //     })
  //   }
  //   if(this.checkUserState()){
  //     toInterviewFuc()
  //   }else{
  //     this.setData({
  //       interviewClickFuc: toInterviewFuc
  //     })
  //   }
  // },
  // toNewentry: function () {
  //   getApp().setPageType(2)
  //   wx.navigateTo({
  //     url: '../newentry/newentry'
  //   })
  // },
  // toNewentry2: function () {
  //   wx.navigateTo({
  //     url: '../newentry2/newentry2'
  //   })
  // },
  toMianBaseInfo: function () {
    var toMianBaseInfoFuc = function () {
      getApp().setPageType(1)
      wx.navigateTo({
        url: '../mianBaseInfo/mianBaseInfo'
      })
    }
    if (this.checkUserState()) {
      toMianBaseInfoFuc()
    } else {
      this.setData({
        interviewClickFuc: toMianBaseInfoFuc
      })
    }
  },
  // 入职
  toEntryBaseInfo: function () {
    var that = this
    var toEntryBaseFuc = function () {
      getApp().setPageType(2)
      wx.navigateTo({
        url: '../entryBaseInfo/entryBaseInfo'
      })
    }
    if (this.checkUserState()) {
      toEntryBaseFuc()
    } else {
      this.setData({
        interviewClickFuc: toEntryBaseFuc
      })
    }
  },
  toTest: function () {
    // wx.navigateTo({
    //   url: '../test/test'
    // })
  },
  // pagePwd 页面密码 开发测试
  pagePwdCellClick: function (e) {
    // console.log(e)
    var that = this
    var dataindex = e.currentTarget.dataset.index
    that.data.pagePwdArr.push(dataindex)
    var pwdstr = ''
    for (var i = 0; i < that.data.pagePwdArr.length; i++){
      pwdstr = pwdstr + that.data.pagePwdArr[i]
    }
    console.log(pwdstr)
    if(pwdstr === '112233'){
      // wx.navigateTo({
      //   url: '../test/test'
      // })
    }else if(pwdstr === '789'){
      wx.setStorageSync('rdSessionId', '')
    }
  },
  // pagePwd 页面密码 内外网环境切换
  netSwitch: function (e) {
    // console.log(e)
    var that = this
    var dataindex = e.currentTarget.dataset.index
    that.data.pagePwdArr.push(dataindex)
    var pwdstr = ''
    for (var i = 0; i < that.data.pagePwdArr.length; i++) {
      pwdstr = pwdstr + that.data.pagePwdArr[i]
    }
    console.log(pwdstr)
    if (pwdstr === '123456') {
      // 设置外网环境 outerBaseUrl
      getApp().globalData.baseUrl = getApp().globalData.outerBaseUrl
      this.wxLogin()
    } else if (pwdstr === '789') {
      // 设置内网环境
      getApp().globalData.baseUrl = getApp().globalData.innerBaseUrl
      this.wxLogin()
    }
  },
  // 测试获取手机号
  onGetphonenumber: function (e) {
    var that = this
    this.setData({
      bgCoverShow: false
    })
    var rdSessionId = wx.getStorageSync('rdSessionId')
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/statgetUserinfo',
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        rdSessionId: rdSessionId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log('index-mobile:', res)
        if(res.data.code === 200){
          // 查询用户状态 是面试还是入职
          that.queryInterviewState()
          if (typeof that.data.interviewClickFuc === "function"){
            var interview = that.data.interviewClickFuc
            interview()
          }else{
            // console.log('不是function')
          }
        }
        // wx.setStorageSync('userId', res.data.result)
        // 

      },
      fail: function () {
        console.log(res)
      }
    })
  },
  // 查询是入职还是面试
  queryInterviewState:function(){
    var that = this
    var rdSessionId = wx.getStorageSync('rdSessionId')
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/getInterviewOrComing',
      data: {
        rdSessionId: rdSessionId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log('面试还是入职:', res)
        if (res.data.code === 200) {
          that.setData({
            entrance: res.data.result
          })
        }
        // wx.setStorageSync('userId', res.data.result)
        // 

      },
      fail: function () {
        console.log(res)
      }
    })
  }
})
