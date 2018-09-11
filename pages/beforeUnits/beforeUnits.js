// pages/beforeUnits/beforeUnits.js
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
    id:'',
    // 应聘者ID
    candidateId: '',

    leaveDate:'2018-05-05',
    leaveReasion: '世界很大想出去看看',

    beforeUnits: '',
    disabled:false,

    confidentialityValue: '',
    legalLiabilityValue: '',
    criminalLiabilityValue: '',
    chuanRanValue: '',
    // confidentiality legalLiability criminalLiability
    confidentiality: [
      { name: 0, value: '是' },
      { name: 1, value: '否', checked: 'true' },
    ],
    legalLiability: [
      { name: 0, value: '是' },
      { name: 1, value: '否', checked: 'true' },
    ],
    criminalLiability: [
      { name: 0, value: '是' },
      { name: 1, value: '否', checked: 'true' },
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
        pagetag: 'beforeUnits'
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
          if (getApp().globalData.pageType === 1) {
            that.setNextItem('beforeUnits', 1)
          } else {
            that.setNextItem('beforeUnits', 2)
          }
          // that.setNextItem('beforeUnits')
          if (res.data.result.beforeUnits) {
            var baomi = '', falv = '', xingshi = ''
            var confidentialityVal = '', legalLiabilityVal = '', criminalLiabilityVal = ''
            if (res.data.result.beforeUnits.confidentiality === 0){
              confidentialityVal = 0
              baomi = [
                { name: 0, value: '是', checked: 'true'},
                { name: 1, value: '否' },
              ]
            }else{
              confidentialityVal = 1
              baomi = [
                { name: 0, value: '是' },
                { name: 1, value: '否', checked: 'true'},
              ]
            }

            if (res.data.result.beforeUnits.legalLiability === 0) {
              legalLiabilityVal = 0
              falv = [
                { name: 0, value: '是', checked: 'true' },
                { name: 1, value: '否' },
              ]
            } else {
              legalLiabilityVal = 1
              falv = [
                { name: 0, value: '是' },
                { name: 1, value: '否', checked: 'true' },
              ]
            }
            
            if (res.data.result.beforeUnits.criminalLiability === 0) {
              criminalLiabilityVal = 0
              xingshi = [
                { name: 0, value: '是', checked: 'true' },
                { name: 1, value: '否' },
              ]
            } else {
              criminalLiabilityVal = 1
              xingshi = [
                { name: 0, value: '是' },
                { name: 1, value: '否', checked: 'true' },
              ]
            }
            // confidentiality legalLiability criminalLiability
            // var baomi = '', falv = '', xingshi = ''
            // var confidentialityVal = '', legalLiabilityVal = '', criminalLiabilityVal = ''
            that.setData({
              confidentialityValue: confidentialityVal,
              legalLiabilityValue: legalLiabilityVal,
              criminalLiabilityValue: criminalLiabilityVal,
              confidentiality: baomi,
              legalLiability: falv,
              criminalLiability: xingshi,
              beforeUnits: res.data.result.beforeUnits,
              leaveReasion: res.data.result.beforeUnits.dimissionReason,
              leaveDate: res.data.result.beforeUnits.dimissionTime.split(' ')[0],
              id: res.data.result.beforeUnits.id,
              disabled: true,
            })
          } else {
            that.setData({
              id: '',
              disabled: false,
            })
          }

          getApp().progressFuc(res.data, 'beforeUnits', tag)
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
  bindDateChange: function(e){
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      leaveDate: e.detail.value
    })
  },
  /**
   * 离职原因 变化
   */
  leaveReasionChange:function(e){
    console.log(e)
    this.setData({
      leaveReasion: e.detail.value
    })
  },
  /**
   * 是否与前用人单位约定了保密写协议与竞业限制条款
   */
  confidentialityChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.confidentialityValue = e.detail.value
  },
  /**
   * 是否与前用人单位有未尽的法律事宜
   */
  legalLiabilityChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.legalLiabilityValue = e.detail.value
  },
  /**
   * 是否曾经或正在追究与承担过刑事责任
   */
  criminalLiabilityChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.criminalLiabilityValue = e.detail.value
  },
  /**
   * 点击修改
   */
  editClick:function(){
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
  setNextItem: function (current, typeNum) {
    var that = this
    var itenArr = ''
    if (typeNum === 1) {
      itenArr = ['educationExperience', 'jobExperience', 'trainingExperience', 'familyMember', 'candidateInfo']
    } else if (typeNum === 2) {
      itenArr = ['urgentContact', 'beforeUnits', 'healthStatus', 'educationExperience', 'jobExperience', 'trainingExperience', 'familyMember', 'candidateInfo']
    }
    console.log(that.data.resultData)
    for (var i = 0; i < itenArr.length; i++) {
      console.log('i:' + i)
      if (that.data.resultData[itenArr[i]] === null || that.data.resultData[itenArr[i]].length === 0) {
        if (current !== itenArr[i]) {
          var address = ''
          if (itenArr[i] === 'urgentContact') {
            address = 'urgent'
          }
          if (itenArr[i] === 'beforeUnits') {
            address = 'beforeUnits'
          }
          if (itenArr[i] === 'healthStatus') {
            address = 'healthStatus'
          }
          if (itenArr[i] === 'educationExperience') {
            address = 'education'
          }
          if (itenArr[i] === 'jobExperience') {
            address = 'work'
          }
          if (itenArr[i] === 'trainingExperience') {
            address = 'train'
          }
          if (itenArr[i] === 'familyMember') {
            address = 'family'
          }
          if (itenArr[i] === 'candidateInfo') {
            address = 'careerplan'
          }
          that.setData({
            nextItem: address
          })
          return
        }
      }
    }
  },
  formSubmit: function (e) {
    var that = this
    var rdSessionId = wx.getStorageSync('rdSessionId')

    var beforeUnitsObj = {
      dimissionTime: that.data.leaveDate,
      dimissionReason: that.data.leaveReasion,
      confidentiality: that.data.confidentialityValue,
      legalLiability: that.data.legalLiabilityValue,
      criminalLiability: that.data.criminalLiabilityValue,
      candidateId: that.data.candidateId,
      id: that.data.id
    }
    console.log(888888)
    console.log(beforeUnitsObj)
    // 发起网络请求
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/addBeforeUnits',
      data: {
        rdSessionId: rdSessionId,
        beforeUnits: beforeUnitsObj
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {

          getApp().linkLock = true
          that.iniFuc('submit')

          // var backHome = '', modalText = ''
          // if (getApp().globalData.pageType === 1) {
          //   backHome = 'interview'
          // } else {
          //   backHome = 'newentry'
          // }
          // if (that.data.nextItem) {
          //   modalText = '点击确定，进入下一步填写'
          // } else {
          //   modalText = '点击确定，返回填表首页'
          // }
          // wx.showModal({
          //   title: '保存成功',
          //   content: modalText,
          //   success: function (res) {
          //     if (res.confirm) {
          //       if (that.data.nextItem) {
          //         wx.navigateTo({
          //           url: '../' + that.data.nextItem + '/' + that.data.nextItem
          //         })
          //       } else {
          //         wx.navigateTo({
          //           url: '../' + backHome + '/' + backHome
          //         })
          //       }
          //       console.log('用户点击确定')
          //     } else if (res.cancel) {
          //       setTimeout(that.iniFuc, 2000)
          //       console.log('用户点击取消')
          //     }
          //   }
          // })
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
  toIndex:function(){
    var pageType = getApp().globalData.pageType
    console.log(pageType)
    if (pageType === 1){
      wx.navigateTo({
        url: '../interview/interview'
      })
    } else if (pageType === 2){
      wx.navigateTo({
        url: '../newentry/newentry'
      })
    }
  },
  toMine:function(){
    wx.navigateTo({
      url: '../mine/mine'
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