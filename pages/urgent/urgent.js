// pages/urgent/urgent.js
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
    currentItem: 'urgentContact',
    nextItem: '',
    resultData: '',
    id: '',
    candidateId: '',
    subDisabled: false,
    urgentContact: [],
    animationData: {}
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
        pagetag: 'urgentContact'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('findCandidate:')
        console.log(res)
        // return
        // 设置用户id
        that.setData({
          candidate: res.data.result.candidate,
          candidateId: res.data.result.candidate.id
        })
        if (res.data.code === 200) {

          // if (res.data.result.urgentContact.length === 0){
          //   that.data.itemReadyList = []
          //   that.data.itemReadyList.push
          // }
          // that.data = res.data.result.candidate
          that.setData({
            resultData: res.data.result
          })
          if (getApp().globalData.pageType === 1) {
            that.setNextItem('urgentContact', 1)
          } else {
            that.setNextItem('urgentContact', 2)
          }
          // that.setNextItem('urgentContact')

          if (res.data.result.urgentContact.length > 0) {

            res.data.result.urgentContact[0].iniclass = 'iniclass'
            res.data.result.urgentContact[0].iniResetShow = true
            res.data.result.urgentContact[0].iniResetFlagDef = true
            res.data.result.urgentContact[0].disabled = true

            that.setData({
              subDisabled: true,
              id: res.data.result.urgentContact[0].id,
              urgentContact: res.data.result.urgentContact
            })
          } else {
            that.setData({
              id: '',
            })
            console.log('工作经验长度为0')
          }

          getApp().progressFuc(res.data, 'urgentContact',tag)
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
 * 家庭成员名字输入
 */
  nameInput: function (e) {
  },
  /**
   * 亲属关系输入
   */
  relationalInput: function (e) {
  },
  /**
   * 联系电话输入
   */
  mobileInput: function (e) {
  },
  /**
   * 工作单位输入
   */
  addressInput: function (e) {
    // j
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
  changeContact: function(){
    var that = this
    this.data.urgentContact[0].iniclass = 'addclass'
    this.data.urgentContact[0].disabled = false
    this.setData({
      subDisabled:false,
      urgentContact: that.data.urgentContact
    })
  },
  setNextItem: function (current, typeNum){
    var that = this
    var itenArr = ''
    if (typeNum === 1) {
      itenArr = ['educationExperience', 'jobExperience', 'trainingExperience', 'familyMember', 'candidateInfo']
    } else if (typeNum === 2) {
      itenArr = ['urgentContact', 'beforeUnits', 'healthStatus', 'educationExperience', 'jobExperience', 'trainingExperience', 'familyMember', 'candidateInfo']
    }
    console.log(that.data.resultData)
    for (var i = 0; i < itenArr.length; i++){
      console.log('i:' + i)
      if (that.data.resultData[itenArr[i]] === null || that.data.resultData[itenArr[i]].length === 0){
        if (current !== itenArr[i]) {
          var address = ''
          if (itenArr[i] === 'urgentContact'){
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
    var formValArr = []

    if (e.detail.value.mobile.length < 11) {
      wx.showToast({
        title: '请正确填写手机号',
        icon: 'loading',
        duration: 2000
      })
      return
    }

    if (e.detail.value.name && e.detail.value.mobile && e.detail.value.relational && e.detail.value.address) {
      var formValItemObj = {
        name: e.detail.value.name,
        relational: e.detail.value.relational,
        mobile: e.detail.value.mobile,
        address: e.detail.value.address,
        candidateId: that.data.candidateId,
        id: that.data.id
      }
      formValArr.push(formValItemObj)
    }


    if (formValArr.length <= 0) {
      wx.showToast({
        title: '表单信息不完整',
        icon: 'loading',
        duration: 2000
      })
      return
    }

    // 发起网络请求
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/addUrgentContact',
      data: {
        rdSessionId: rdSessionId,
        contacts: formValArr
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
          //       if (that.data.nextItem){
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
            icon: 'success',
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
  testmodal:function(){
    
    console.log(this.data.nextItem)
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success: function (res) {
    //     console.log(res.confirm)
    //     console.log(res.cancel)
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  toIndex: function () {
    var pageType = getApp().globalData.pageType
    console.log(pageType)
    if (pageType === 1) {
      wx.navigateTo({
        url: '../interview/interview'
      })
    } else if (pageType === 2) {
      wx.navigateTo({
        url: '../newentry/newentry'
      })
    }
  },
  toMine: function () {
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