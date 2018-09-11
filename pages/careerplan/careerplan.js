// pages/careerplan/careerplan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperDisNum: getApp().globalData.swiperDisNum,
    crtSwpIndex: getApp().globalData.currentSwiperIndex,
    imgBaseUrl: getApp().globalData.imgBaseUrl,
    newProgressShow: getApp().globalData.newProgressShow,
    ptype: getApp().globalData.pageType,
    progressData: getApp().progressData,
    nextItem: '',
    resultData: '',
    disabled: false,
    id: '',
    addClickNum: 0,
    eduProShow2: false,
    eduProShow3: false,
    gender: 1,
    sanqi: 4,
    candidateInfo: '',
    items: [
      { name: 1, value: '孕期'},
      { name: 2, value: '产期' },
      { name: 3, value: '哺乳期' },
      { name: 4, value: '非三期', checked: 'true'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ptype: getApp().globalData.pageType
    })
    wx.showLoading({
      title: '加载中',
    })
  },
  /**
   * 初始化调用 
   */
  iniFuc: function (tag) {
    var that = this
    var rdSessionId = wx.getStorageSync('rdSessionId')
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/findCandidate',
      data: {
        rdSessionId: rdSessionId,
        pagetag: 'candidateInfo'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {

          that.setData({
            resultData: res.data.result
          })

          if (res.data.result.candidateInfo) {
            var womanVal = res.data.result.candidateInfo.woman
            for (var i = 0; i < that.data.items.length; i++) {
              if (that.data.items[i].name = womanVal) {
                that.data.items[i].checked = 'true'
              } else {
                that.data.items[i].checked = 'false'
              }
            }
            that.setData({
              disabled: true,
              id: res.data.result.candidateInfo.id,
              items: that.data.items,
              candidateInfo: res.data.result.candidateInfo,
              gender: res.data.result.candidate.distinction,
              candidateId: res.data.result.candidate.id
            })
            console.log(123)
            console.log(typeof that.data.gender)
          } else {
            that.setData({
              disabled: false,
              id: res.data.result.candidate.id,
              gender: res.data.result.candidate.distinction,
              candidateId: res.data.result.candidate.id
            })
          }

          getApp().progressFuc(res.data, 'candidateInfo', tag)
          that.setData({
            progressData: getApp().progressData
          })

          var progressDataLen = getApp().globalData.pageType === 2 ? getApp().progressData.length : getApp().globalData.mianTotalNum
          var appCurrentIndex = getApp().globalData.currentSwiperIndex
          var swiperDisNum = getApp().globalData.swiperDisNum
          var centerIndex
          if ((appCurrentIndex - 2) >= 0 && (appCurrentIndex + 2) <= (progressDataLen - 1)) {
            centerIndex = appCurrentIndex - 2
            that.setData({
              swiperDisNum: getApp().globalData.swiperDisNum,
              crtSwpIndex: centerIndex
            })
          } else if ((appCurrentIndex - 2) < 0) {
            that.setData({
              swiperDisNum: getApp().globalData.swiperDisNum,
              crtSwpIndex: 0
            })
          } else if ((appCurrentIndex + 2) > (progressDataLen - 1)) {
            that.setData({
              swiperDisNum: getApp().globalData.swiperDisNum,
              crtSwpIndex: (progressDataLen - 1) - (swiperDisNum - 1)
            })
          }

          wx.hideLoading()
          that.fadeIn()

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.iniFuc()
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
  
  },
  /**
   * 是否处于三期
   */
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.sanqi = e.detail.value
  },
  editClick: function(){
    this.setData({
      disabled: false
    })
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
  formSubmit: function (e) {
    var that = this
    var rdSessionId = wx.getStorageSync('rdSessionId')

    var workCare = e.detail.value.workCare
    var workTime = e.detail.value.workTime
    var introduce = e.detail.value.introduce
    var careerPlan = e.detail.value.careerPlan
    var specialty = e.detail.value.specialty

    if (workCare && workTime && careerPlan && specialty){

    }else{
      wx.showToast({
        title: '请完整填写表单',
        icon: 'loading',
        duration: 2000
      })
      return
    }

    var candidateInfoObj = {
      jobPriority: workCare,
      jobAskTime: workTime,
      selfAssessment: introduce,
      threePlanning: careerPlan,
      woman: that.data.sanqi,
      specialty: specialty,
      candidateId: that.data.candidateId,
      id:that.data.id
    }

    // 发起网络请求
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/addCandidateInfo',
      data: {
        rdSessionId: rdSessionId,
        candidateInfo: candidateInfoObj
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if(res.data.code === 200){
          getApp().linkLock = true
          that.iniFuc('submit')
        }else{
          wx.showToast({
            title: 'code:非200',
            mask: true,
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log('add fail')
        console.log(res)
      }
    })
  },
  ballClick: function (e) {
    var page_name = e.currentTarget.dataset.pagename
    if (this.data.candidateId || this.data.candidate.id) {
      getApp().ballClickFuc(page_name)
    } else {
      wx.showToast({
        title: '请填写基本信息',
        icon: 'success',
        duration: 2000
      })
    }
  },
  // 底部导航 点击
  bottomNavClick: function (e) {
    getApp().bottomNavLink(e)
  },
})