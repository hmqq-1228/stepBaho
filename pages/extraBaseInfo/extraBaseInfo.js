// pages/extraBaseInfo/extraBaseInfo.js
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
    // 栏目ID
    id: '',
    // 应聘者ID
    candidateId: '',

    disabled: false,

    workerInfo: '',
    account: '',
    educationMax: '',
    professional: '',
    political: '',

    account: ['本地城镇（杭州主城区）', '本地农村（杭州主城区）', '外地城镇', '外地农村'],
    accountIndex: 0,

    educationMax: ['博士', '研究生', '本科', '大专', '中专', '高中', '初中', '小学'],
    educationMaxIndex: 0,
    
    professional: ['初级', '中级', '高级', '其它'],
    professionalIndex: 0,

    lanDegree: [['英语', '法语', '德语', '意大利语', '俄语', '日语', '韩语'], ['A级', 'B级', '非专业4级', '非专业6级', '专业4级', '专业6级', '专业8级']],
    lanDegreeIndex: [0, 0],

    politics: ['团员', '党员', '群众'],
    politicsIndex: 0,

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
        pagetag: 'workerInfo'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {
          that.setData({
            resultData: res.data.result,
            candidateId: res.data.result.candidate.id
          })
          if (res.data.result.workerInfo) {
            // workerInfo account educationMax professional political
            var educationMaxIndex = 0, professionalIndex = 0, politicsIndex = 0, lanIndex = 0, graIndex= 0
            // 最高学历
            for (var r = 0; r < that.data.educationMax.length; r++){
              if (res.data.result.workerInfo.educationMax === that.data.educationMax[r]) {
                educationMaxIndex = r
              }
            }
            // 外语等级
            lanIndex = parseInt(res.data.result.workerInfo.foreignGrade.split('_')[0])
            graIndex = parseInt(res.data.result.workerInfo.foreignGrade.split('_')[1])
            // 职业资格
            for (var z = 0; z < that.data.professional.length; z++) {
              if (res.data.result.workerInfo.professional === that.data.professional[z]) {
                professionalIndex = z
              }
            }
            // 政治面貌
            for (var p = 0; p < that.data.politics.length; p++) {
              if (res.data.result.workerInfo.political === that.data.politics[p]) {
                politicsIndex = p
              }
            }

            that.setData({
              workerInfo: res.data.result.workerInfo,
              // 户口性质
              accountIndex: res.data.result.workerInfo.account,
              // 最高学历
              educationMaxIndex: educationMaxIndex,
              // 外语等级
              lanDegreeIndex: [lanIndex, graIndex],
              // 职业资格
              professionalIndex: professionalIndex,
              // 政治面貌
              politicsIndex: politicsIndex,
              id: res.data.result.workerInfo.id,
              disabled: true,
            })
          } else {
            that.setData({
              id: '',
              disabled: false,
            })
          }

          getApp().progressFuc(res.data, 'workerInfo',tag)
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
  // 户籍性质
  bindAccountChange: function (e) {
    console.log(e)
    console.log(66666)
    this.setData({
      accountIndex: e.detail.value
    })
  },
  // 最高学历
  bindEducationMaxChange: function (e) {
    this.setData({
      educationMaxIndex: e.detail.value
    })
  },
  // 外语等级
  bindLanDegreeChange: function (e) {
    console.log('value 携带的参数是：' + e.detail.value)
    // var that = this
    this.setData({
      lanDegreeIndex: e.detail.value
    })
  },
  // 外语等级 列变化时的值
  bindLanDegreeColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  },
  // 职业资格
  bindProfessionalChange: function (e) {
    this.setData({
      professionalIndex: e.detail.value
    })
  },
  // 政治面貌
  bindPoliticsChange: function (e) {
    this.setData({
      politicsIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      leaveDate: e.detail.value
    })
  },
  /**
   * 离职原因 变化
   */
  leaveReasionChange: function (e) {
    console.log(e)
    this.setData({
      leaveReasion: e.detail.value
    })
  },
  /**
   * 点击修改
   */
  editClick: function () {
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
  itemFor: function (item) {
    var that = this
    console.log(123)
    console.log(that.data[item][0].checked)
    console.log(that.data[item][1].checked)
    for (var i = 0; i < 2; i++) {
      if (that.data[item][i].checked === 'true') {
        return i
      }
    }
  },
  formSubmit: function (e) {
    var that = this
    var rdSessionId = wx.getStorageSync('rdSessionId')

    var workerInfoObj = {
      account: that.data.accountIndex,
      educationMax: that.data.educationMax[that.data.educationMaxIndex],
      foreignGrade: that.data.lanDegreeIndex[0] + '_' + that.data.lanDegreeIndex[1],
      professional: that.data.professional[that.data.professionalIndex],
      political: that.data.politics[that.data.politicsIndex],
      candidateId: that.data.candidateId,
      id: that.data.id
    }
    // 发起网络请求
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/addWorkerInfo',
      data: {
        rdSessionId: rdSessionId,
        workerInfo: workerInfoObj
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(123456789)
        console.log(res)
        if (res.data.code === 200) {
          wx.showToast({
            title: '保存成功',
            duration: 2000
          })
          getApp().linkLock = true
          that.iniFuc('submit')

        } else {
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