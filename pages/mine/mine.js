// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    netswitchKK:0,
    baseUrl: '',
    imgBaseUrl: getApp().globalData.imgBaseUrl,
    newProgressShow: getApp().globalData.newProgressShow,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
    this.fadeIn()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (getApp().globalData.baseUrl === getApp().globalData.innerBaseUrl){
      this.setData({
        baseUrl: getApp().globalData.baseUrl
      })
    }
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
  
  },
  fadeIn: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation;
    // opacity
    animation.opacity(1).step();
    this.setData({
      animationData: animation.export()
    })
  },
  // toIndex: function () {
  //   var pageType = getApp().globalData.pageType
  //   console.log(pageType)
  //   if (pageType === 1) {
  //     wx.navigateTo({
  //       url: '../interview/interview'
  //     })
  //   } else if (pageType === 2) {
  //     wx.navigateTo({
  //       url: '../newentry/newentry'
  //     })
  //   }
  // },
  // toMine: function () {
  //   wx.navigateTo({
  //     url: '../mine/mine'
  //   })
  // },
  toInterview: function () {
    getApp().setPageType(1)
    wx.navigateTo({
      url: '../mianBaseInfo/mianBaseInfo'
    })
  },
  toNewentry: function () {
    getApp().setPageType(2)
    wx.navigateTo({
      url: '../entryBaseInfo/entryBaseInfo'
    })
  },
  bottomNavClick: function (e) {
    getApp().bottomNavLink(e)
  },
  // 环境切换
  toNetSwitch:function(){
    this.data.netswitchKK = this.data.netswitchKK + 1
    if (this.data.netswitchKK === 6) {
      wx.navigateTo({
        url: '../index/index'
      })

    }
  }
})