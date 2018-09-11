// pages/work/work.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 时间戳
    timestr: '',
    // 锁 不可重复提交
    kk: true,
    swiperDisNum: getApp().globalData.swiperDisNum,
    crtSwpIndex: getApp().globalData.currentSwiperIndex,
    imgBaseUrl: getApp().globalData.imgBaseUrl,
    newProgressShow: getApp().globalData.newProgressShow,
    ptype: getApp().globalData.pageType,
    progressData: getApp().progressData,
    addBtnShow:true,
    subDisabled:false,
    nextItem: '',
    resultData: '',
    debug: true,
    startDate: '1990-01-01',
    endDate: '1990-01-01',
    addClickNum: 0,
    eduProShow2: false,
    eduProShow3: false,
    mainShow: true,
    mainOpacity: 0,
    animationData: {},
    xiugaiShow:true,
    candidateId: '',
    jobList: '',
    jobListLenTemplete: [],
    newAddListTemplete: [],
    resetItemArr: []
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
  iniFuc:function(tag){
    var that = this
    var rdSessionId = wx.getStorageSync('rdSessionId')
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/findCandidate',
      data: {
        rdSessionId: rdSessionId,
        pagetag: 'jobExperience'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        // 设置用户id
        that.setData({
          candidateId: res.data.result.candidate.id
        })

        that.data.newAddListTemplete = []
        
        if (res.data.code === 200) {

          that.setData({
            resultData: res.data.result
          })

          if (res.data.result.jobExperience.length > 0) {
            for (var i = 0; i < res.data.result.jobExperience.length; i++) {
              res.data.result.jobExperience[i].startTime = res.data.result.jobExperience[i].startTime.split(' ')[0]
              res.data.result.jobExperience[i].endTime = res.data.result.jobExperience[i].endTime.split(' ')[0]

              res.data.result.jobExperience[i].formUnitsName = 'unitsName_' + i
              res.data.result.jobExperience[i].formStartTimeName = 'startTime_' + i
              res.data.result.jobExperience[i].formEndTimeName = 'endTime_' + i
              res.data.result.jobExperience[i].formPositionName = 'position_' + i
              res.data.result.jobExperience[i].formReferencesName = 'references_' + i
              res.data.result.jobExperience[i].iniclass = 'iniclass'
              res.data.result.jobExperience[i].iniResetShow = true
              res.data.result.jobExperience[i].iniResetFlagDef = true
              res.data.result.jobExperience[i].disabled = true

              that.data.jobListLenTemplete.push(i)
            }
            that.setData({
              addBtnShow:false,
              subDisabled: true,
              jobList: res.data.result.jobExperience
            })
          } else {
            // 如果列表为空
            var jobListItemObj = {
              endTime: that.data.endDate,
              formEndTimeName: "endTime_0",
              formPositionName: "position_0",
              formReferencesName: "references_0",
              formStartTimeName: "startTime_0",
              formUnitsName: "unitsName_0",
              iniclass: 'addclass',
              iniResetShow: false,
              iniResetFlagDef: false,
              disabled: false,
              position: "",
              references: "",
              startTime: that.data.startDate,
              unitsName: "",
            }
            that.data.jobListLenTemplete.push(0)
            that.data.newAddListTemplete.push(0)
            that.setData({
              subDisabled: false,
              jobList: [jobListItemObj]
            })
          }
          getApp().progressFuc(res.data, 'jobExperience', tag)
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
          var lastTimeStr = that.data.timestr
          var currentTimeStr = new Date().getTime()
          that.setData({
            kk: true,
            timestr: currentTimeStr
          })


        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   * 
   * 
   */
  onReady: function () {
    // var that = this
    this.iniFuc()
    var timestr = new Date().getTime()
    this.setData({
      timestr: timestr
    })
    console.log('ready timestr：', this.data.timestr)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('onUnload')
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
   * 点击修改
   */
  proReset: function(e){
    var that = this
    var key = e.currentTarget.dataset.key
    // resetItemArr
    this.data.jobList[key].key = key
    if (that.data.resetItemArr.length > 0){
      // 清空之前的还原数据
      var oldkey = that.data.resetItemArr[0].key
      that.data.resetItemArr[0].iniclass = 'iniclass'
      that.data.resetItemArr[0].iniResetFlagDef = true
      that.data.jobList[oldkey] = that.data.resetItemArr[0]
      that.data.jobList[oldkey].disabled = true

      that.data.resetItemArr = []
      that.setData({
        jobList: that.data.jobList
      })
      // 将新的还原数据添加到数组
      that.data.resetItemArr.push(that.data.jobList[key])
    }else{
      that.data.resetItemArr.push(that.data.jobList[key])
    }
    // that.data.resetItemArr.push(that.data.jobList[key])
    if (this.data.jobList[key].iniclass === 'iniclass'){
      that.data.jobList[key].iniclass = ''
      that.data.jobList[key].iniResetFlagDef = false
      that.data.jobList[key].disabled = false
      that.setData({
        jobList: that.data.jobList
      })
    }
    that.setData({
      addBtnShow: true,
    })
  },
  /**
   * 点击保存
   */
  saveClick: function(e){
    var that = this
    var key = e.currentTarget.dataset.key

    var rdSessionId = wx.getStorageSync('rdSessionId')

    var formValArr = []
    var formValItemObj = {
      unitsName: that.data.jobList[key].unitsName,
      startTime: that.data.jobList[key].startTime,
      endTime: that.data.jobList[key].endTime,
      position: that.data.jobList[key].position,
      references: that.data.jobList[key].references,
      candidateId: that.data.candidateId,
      id: that.data.jobList[key].id
    }
    formValArr.push(formValItemObj)

    // 发起网络请求
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/addJobExperience',
      data: {
        rdSessionId: rdSessionId,
        jobs: formValArr
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data.code === 200){
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              that.data.resetItemArr = []
              setTimeout(that.iniFuc, 2500)
            }
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 点击取消
   */
  cancelClick: function(e){
    var that = this
    var key = e.currentTarget.dataset.key
    for (var i = 0; i < that.data.resetItemArr.length; i++){
      if (that.data.resetItemArr[i].key === key){
        that.data.resetItemArr[i].iniclass = 'iniclass'
        that.data.resetItemArr[i].iniResetFlagDef = true
        that.data.jobList[key] = that.data.resetItemArr[i]
        that.data.jobList[key].disabled = true

        that.data.resetItemArr.splice(i, 1)
        that.setData({
          addBtnShow: false,
          jobList: that.data.jobList
        })
      }
    }
  },
  /**
   * 单位名字输入
   */
  unitsNameInput: function(e){
    var that = this
    var key = e.currentTarget.dataset.key
    this.data.jobList[key].unitsName = e.detail.value
  },
  /**
   * 职位名字输入
   */
  positionInput: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    this.data.jobList[key].position = e.detail.value
  },
  /**
 * 证明人名字输入
 */
  referencesInput: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    this.data.jobList[key].references = e.detail.value
  },
  bindStartDateChange: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    this.data.jobList[key].startTime = e.detail.value
    this.setData({
      jobList: that.data.jobList
    });
  },
  bindEndDateChange: function (e) {
    var that = this
    var key = e.currentTarget.dataset.key
    this.data.jobList[key].endTime = e.detail.value
    this.setData({
      jobList: that.data.jobList
    })
    // this.setData({
    //   endDate: e.detail.value
    // })
  },
  jobListSet: function(itemIndex){
    var that = this
    var jobListItemObj = {
      endTime: that.data.endDate,
      formEndTimeName: "endTime_" + (itemIndex + 1),
      formPositionName: "position_" + (itemIndex + 1),
      formReferencesName: "references_" + (itemIndex + 1),
      formStartTimeName: "startTime_" + (itemIndex + 1),
      formUnitsName: "unitsName_" + (itemIndex + 1),
      iniclass: 'addclass',
      iniResetShow: false,
      iniResetFlagDef: false,
      position: "",
      references: "",
      startTime: that.data.startDate,
      unitsName: "",
    }

    that.data.jobList.push(jobListItemObj)
    var newJobList = that.data.jobList
    that.setData({
      jobList: newJobList
    })
  },
  addpro: function () {
    var that = this
    var TempleteLen = that.data.jobListLenTemplete.length
    var newAddLen = that.data.newAddListTemplete.length
    if (newAddLen >0){
      var newAddLastItemIndex = that.data.newAddListTemplete[newAddLen - 1]
      that.data.newAddListTemplete.push(newAddLastItemIndex + 1)
      that.data.jobListLenTemplete.push(newAddLastItemIndex + 1)

      that.jobListSet(newAddLastItemIndex)

    }else{
      var jobListLastItemIndex = that.data.jobListLenTemplete[TempleteLen - 1]
      that.data.newAddListTemplete.push(jobListLastItemIndex + 1)
      that.data.jobListLenTemplete.push(jobListLastItemIndex + 1)

      that.jobListSet(jobListLastItemIndex);
    }

    that.setData({
      subDisabled: false
    })
  },
  fadeIn: function(){
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
  // 检查表单项目中是否有未填写的字段
  checkForm: function (formItemArr) {
    var novalueArr = []
    for (var i = 0; i < formItemArr.length; i++) {
      var novalueItemArr = []
      if (formItemArr[i].professional.length <= 0) {
        novalueItemArr.push('专业名称')
      }
      if (formItemArr[i].academic.length <= 0) {
        novalueItemArr.push('获得学位')
      }
      var novalueObj = {
        key: i,
        itemName: formItemArr[i].school,
        nullItem: novalueItemArr
      }
      if (novalueItemArr.length > 0) {
        novalueArr.push(novalueObj)
      }
    }

    if (novalueArr.length > 0) {
      console.log('有必填项未填写')
      var that = this
      var noValText = novalueArr[0].nullItem[0] + ' 未填写'
      wx.showModal({
        title: novalueArr[0].itemName,
        content: noValText,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false
    }
    return true
  },
  formSubmit: function (e) {
    var that = this

    // 设置 首次点击时间戳
    var currentTimeStr = new Date().getTime()
    if ((currentTimeStr - that.data.timestr) > 3000) {
      that.setData({
        timestr: new Date().getTime()
      })
    }else{
      return
    }
    // 重复提交 锁
    if (that.data.kk) {
      wx.showLoading({
        title: '保存中...',
      })
      that.setData({
        kk: false
      })
    } else {
      return
    }

    var rdSessionId = wx.getStorageSync('rdSessionId')
    var formValArr = []
    var newAddListTem = that.data.newAddListTemplete
    for (var i = 0; i < that.data.newAddListTemplete.length; i++){
      if (e.detail.value['unitsName_' + newAddListTem[i]]){
        var formValItemObj = {
          unitsName: e.detail.value['unitsName_' + newAddListTem[i]],
          startTime: e.detail.value['startTime_' + newAddListTem[i]],
          endTime: e.detail.value['endTime_' + newAddListTem[i]],
          position: e.detail.value['position_' + newAddListTem[i]],
          references: e.detail.value['references_' + newAddListTem[i]],
          candidateId: that.data.candidateId
        }
        formValArr.push(formValItemObj)
      }
    }

    if (formValArr.length <= 0) {
      wx.showToast({
        title: '表单信息不合法',
        icon: 'loading',
        duration: 2000
      })
      // 开锁
      wx.hideLoading()
      that.setData({
        kk: true
      })

      return
    }
    // 检查是否有空字段未填写
    var testItem = ['position_职务名称', 'references_证明人']
    // 项目条目的标题字段名
    var itemFieldName = 'unitsName'
    // 校验
    if (!getApp().checkForm(formValArr, testItem, itemFieldName)) {
      // 开锁
      wx.hideLoading()
      that.setData({
        kk: true
      })

      return
    }

    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/addJobExperience',
      data: {
        rdSessionId: rdSessionId,
        jobs: formValArr
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
        } else if (res.data.code === 305){
          console.log('重复 code：305')
        }else{
          wx.showToast({
            title: 'code:非200',
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
  clickTestBtn: function () {

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