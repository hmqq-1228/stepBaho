// pages/interview/interview.js
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
    // 当前页面
    currentPage: '',
    // 下一个未填写项目
    naxtPro: '',
    debug: false,
    disabled: false,
    iptItemObj:{

    },
    bgCoverShow: false,
    // 离职原因
    dimissionReason: '',
    // 离职原因 切换
    dimissionReasonSwitch: true,
    // 离职原因 切换之后获取焦点
    dimissionReasonFocus: false,
    // 身份证号码
    identity: '',
    // 身份证号码 切换
    identitySwitch: true,
    // 身份证号码 切换之后获取焦点
    identityFocus: false,
    // 应聘职位
    position: '',
    // 应聘职位 切换
    positionSwitch: true,
    // 应聘职位 切换之后获取焦点
    positionFocus: false,
    // 用户姓名
    name: '',
    // 用户姓名 切换
    nameSwitch: true,
    // 用户姓名 切换之后获取焦点
    nameFocus: false,
    // 身份证号码
    identity: '',
    // 身份证号码 切换
    identitySwitch: true,
    // 身份证号码 切换之后获取焦点
    identityFocus: false,
    // 电话
    mobile: '',
    // 电话 切换
    mobileSwitch: true,
    // 电话 切换之后获取焦点
    mobileFocus: false,
    // 邮箱
    email: '',
    // 邮箱 切换
    emailSwitch: true,
    // 邮箱 切换之后获取焦点
    emailFocus: false,
    // 现在住址
    address: '',
    // 现在住址 切换
    addressSwitch: true,
    // 现在住址 切换之后获取焦点
    addressFocus: false,
    // 过往薪资
    beforePay: '',
    // 过往薪资 切换
    beforePaySwitch: true,
    // 过往薪资 切换之后获取焦点
    beforePayFocus: false,
    // 期望薪资
    hopePay: '',
    // 期望薪资 切换
    hopePaySwitch: true,
    // 期望薪资 切换之后获取焦点
    hopePayFocus: false,
    // formEdit formDisabled
    editState: 'formEdit',
    callbackFucName: null,
    callbackNum: 0,
    // 离职原因
    beforeUnits: '',
    // 基础信息
    candidate: {},
    // 附加信息
    candidateInfo: '',
    // 教育经历
    educationExperience: '',
    // 家庭主要成员
    familyMember: '',
    // 工作经历
    jobExperience: '',
    // 培训经历
    trainingExperience: '',
    // 紧急联系人
    urgentContact: '',
    jobname: '',
    sourseArr: ['智联招聘', '前程无忧', '猎聘网', 'BOSS', '招聘会', '内推', '其它'],
    sourseIndex: 0,
    genderArr: ['男', '女'],
    index: 0,
    nationalityArr:
      [
        '汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族',
        '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族', '哈尼族', '哈萨克族', '傣族',
        '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族',
        '柯尔克孜族', '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族',
        '锡伯族', '阿昌族', '普米族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族',
        '保安族', '裕固族', '京族', '塔塔尔族', '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'
      ],
    nationalityIndex: 0,
    marryArr: ['未婚', '已婚'],
    marryIndex: 0,
    baseInfoAddBtn: false,
    date: '1990-01-01',
    entryDate: '2018-07-01',
    animationData: {},
    region: ['浙江省', '杭州市', '滨江区'],
    customItem: '全部',
    switchObj: {
      dimissionReason: {
        dimissionReasonSwitch: true,
        dimissionReasonFocus: false
      },
      hopePay: {
        dimissionReasonSwitch: true,
        dimissionReasonFocus: false
      }
    },
    switchObj: [
      {
        name: 'dimissionReason',
      },
      {
        name: 'hopePay',
        dimissionReasonSwitch: true,
        dimissionReasonFocus: false
      },
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
  // 测试面试补充
  testEntryAdd: function(){
    var rdSessionId = wx.getStorageSync('rdSessionId')
    // 发起网络请求
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/addWorkerInfo',
      data: {
        rdSessionId: rdSessionId,
        candidate: {
          account: 1,
          educationMax: '本科',
          foreignGrade: '四级',
          professional: '高级',
          political: '群众'
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('succ:',res)
      },
      fail: function (res) {
        console.log('fail:',res)
      }
    })
  },

  iniFuc: function () {
    var that = this
    var callbackfuc = function (obj) {
      var that = obj
      var rdSessionId = wx.getStorageSync('rdSessionId')
      if (getApp().debug) console.log('获取本地存储 rdSessionId:' + rdSessionId)
      wx.request({
        url: getApp().globalData.baseUrl + '/weChat/findCandidate',
        data: {
          rdSessionId: rdSessionId,
          pagetag: 'candidate'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          if (res.data.result.beforeUnits) {
            var dimissionReason = res.data.result.beforeUnits.dimissionReason
          } else {
            var dimissionReason = ''
          }
          if (res.data.code === 200) {
            // nationality
            var nationality = res.data.result.candidate.nationality
            for (var i = 0; i < that.data.nationalityArr.length; i++) {
              if (that.data.nationalityArr[i] === nationality) {
                that.setData({
                  nationalityIndex: i
                })
              }
            }

            res.data.result.candidate.birthTime = res.data.result.candidate.birthTime.split(' ')[0]
            res.data.result.candidate.reportTime = res.data.result.candidate.reportTime.split(' ')[0]

            getApp().progressFuc(res.data, 'candidate')
            that.setData({
              progressData: getApp().progressData
            })

            that.setData({
              editState: 'formDisabled',
              disabled: true,
              dimissionReason: dimissionReason,
              beforeUnits: res.data.result.beforeUnits,
              candidate: res.data.result.candidate,
              candidateInfo: res.data.result.candidateInfo,
              educationExperience: res.data.result.educationExperience,
              familyMember: res.data.result.familyMember,
              jobExperience: res.data.result.jobExperience,
              trainingExperience: res.data.result.trainingExperience,
              urgentContact: res.data.result.urgentContact,

              identity: res.data.result.candidate.identity,
              position: res.data.result.candidate.position,
              name: res.data.result.candidate.name,
              identity: res.data.result.candidate.identity,
              mobile: res.data.result.candidate.mobile,
              email: res.data.result.candidate.email,
              address: res.data.result.candidate.address,
              beforePay: res.data.result.candidate.beforePay,
              hopePay: res.data.result.candidate.hopePay,
              dimissionReason: res.data.result.candidate.dimissionReason,
              region: res.data.result.candidate.native.split('_')
            })

            wx.hideLoading()
            that.fadeIn()
          } else if (res.data.code === 302) {
            // 获取应聘者信息失败
            wx.showToast({
              title: 'code:302',
              duration: 2000
            })
          } else if (res.data.code === 300 || res.data.code === 301) {
            // 300 session获取失败
            wx.hideLoading()
            that.data.callbackNum = that.data.callbackNum + 1
            if (that.data.callbackNum < 3) {
              that.setData({
                callbackFucName: callbackfuc
              })
              console.log(that.data.callbackFucName)
              that.wxLogin()
            }
          } else if (res.data.code === 303) {
            console.log('303')
            getApp().progressFuc(res.data, 'candidate')
            that.setData({
              progressData: getApp().progressData
            })
            // 没有创建应聘人信息 即 基础信息未填写
            wx.showToast({
              title: 'Welcome',
              duration: 1000,
              success: function () {
                that.fadeIn()
              }
            })
            if (that.data.debug) console.log('code: 303')
          } else {
            console.log('code:' + res.data.code)
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    callbackfuc(that)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.iniFuc()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (getApp().debug) console.log(this.data.progressData)
    this.iniFuc()
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
 * 调用微信登录
 */
  wxLogin: function () {
    if (this.data.debug) console.log(6)
    console.log('走了login')
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
              var gets = wx.getStorageSync('rdSessionId')
              that.setData({
                bgCoverShow: true
              })
              // console.log(res)
            },
            fail: function () {
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  /**
   * 测试获取手机号
   */
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
        // console.log(res)
        if (that.data.debug) console.log(8)
        if (res.data.code) {
          if (typeof that.data.callbackFucName === "function") {
            if (that.data.debug) console.log(9)
            var callbackFuc = that.data.callbackFucName
            that.data.callbackFucName = null
            callbackFuc(that)
          } else {
            // console.log(10)
            if (that.data.debug) console.log('不是function')
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
  /**
   * iptReplaceClick
   */
  iptReplaceClick: function (e) {
    // console.log(e)
    var that = this
    if (!this.data.disabled) {
      if (e.currentTarget.id === 'dimissionReason') {
        that.setData({
          dimissionReasonFocus: true,
          dimissionReasonSwitch: !that.data.dimissionReasonSwitch
        })
      } else if (e.currentTarget.id === 'hopePay') {
        that.setData({
          hopePayFocus: true,
          hopePaySwitch: !that.data.hopePaySwitch
        })
      } else if (e.currentTarget.id === 'beforePay') {
        that.setData({
          beforePayFocus: true,
          beforePaySwitch: !that.data.beforePaySwitch
        })
      } else if (e.currentTarget.id === 'address') {
        that.setData({
          addressFocus: true,
          addressSwitch: !that.data.addressSwitch
        })
      } else if (e.currentTarget.id === 'email') {
        that.setData({
          emailFocus: true,
          emailSwitch: !that.data.emailSwitch
        })
      } else if (e.currentTarget.id === 'mobile') {
        that.setData({
          mobileFocus: true,
          mobileSwitch: !that.data.mobileSwitch
        })
      } else if (e.currentTarget.id === 'identity') {
        that.setData({
          identityFocus: true,
          identitySwitch: !that.data.identitySwitch
        })
      } else if (e.currentTarget.id === 'name') {
        that.setData({
          nameFocus: true,
          nameSwitch: !that.data.nameSwitch
        })
      } else if (e.currentTarget.id === 'position') {
        that.setData({
          positionFocus: true,
          positionSwitch: !that.data.nameSwitch
        })
      }
      // this.data.dimissionReasonSwitch = !this.data.dimissionReasonSwitch
    }
  },
  /**
   * leaveResBlur
   */
  leaveResBlur: function (e) {
    // e.currentTarget.name
    // console.log(e)
    var that = this
    if (e.currentTarget.dataset.name === 'dimissionReason') {
      this.setData({
        dimissionReasonFocus: false,
        dimissionReasonSwitch: !that.data.dimissionReasonSwitch
      })
    } else if (e.currentTarget.dataset.name === 'hopePay') {
      this.setData({
        hopePayFocus: false,
        hopePaySwitch: !that.data.hopePaySwitch
      })
    } else if (e.currentTarget.dataset.name === 'beforePay') {
      this.setData({
        beforePayFocus: false,
        beforePaySwitch: !that.data.beforePaySwitch
      })
    } else if (e.currentTarget.dataset.name === 'address') {
      this.setData({
        addressFocus: false,
        addressSwitch: !that.data.addressSwitch
      })
    } else if (e.currentTarget.dataset.name === 'email') {
      that.regCheckEmail(that.data.email)
      this.setData({
        emailFocus: false,
        emailSwitch: !that.data.emailSwitch
      })
    } else if (e.currentTarget.dataset.name === 'mobile') {
      that.regCheckTel(that.data.mobile)
      this.setData({
        mobileFocus: false,
        mobileSwitch: !that.data.mobileSwitch
      })
    } else if (e.currentTarget.dataset.name === 'identity') {
      that.regCheckIdentity(that.data.identity)
      this.setData({
        identityFocus: false,
        identitySwitch: !that.data.identitySwitch
      })
    } else if (e.currentTarget.dataset.name === 'name') {
      this.setData({
        nameFocus: false,
        nameSwitch: !that.data.nameSwitch
      })
    } else if (e.currentTarget.dataset.name === 'position'){
      this.setData({
        positionFocus: false,
        positionSwitch: !that.data.positionSwitch
      })
    }
  },
  /**
   * 正则校验 身份证号码
   */
  regCheckIdentity: function (iptstr) {
    var that = this
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (iptstr === "") {
      wx.showToast({
        title: '身份证不能为空',
        duration: 2000,
        success: function () {
          that.fadeIn()
        }
      })
      return false
      // console.log('输入不能为空')
    } else if (!reg.test(iptstr)) {
      wx.showToast({
        title: '身份证格式错误',
        duration: 2000,
        success: function () {
          that.fadeIn()
        }
      })
      return false
      // console.log('邮箱格式不正确')
    } else {
      return true
      console.log('身份证验证正确')
    }
  },
  /**
   * 正则校验 邮箱
   */
  regCheckEmail: function (iptstr) {
    var that = this
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
    if (iptstr === "") {
      wx.showToast({
        title: '邮箱不能为空',
        duration: 2000,
        success: function () {
          that.fadeIn()
        }
      })
      return false
      // console.log('输入不能为空')
    } else if (!reg.test(iptstr)) {
      wx.showToast({
        title: '邮箱格式不正确',
        duration: 2000,
        success: function () {
          that.fadeIn()
        }
      })
      return false
      // console.log('邮箱格式不正确')
    } else {
      return true
      console.log('邮箱验证正确')
    }
  },
  /**
   * 正则校验 电话号码
   */
  regCheckTel: function (iptstr) {
    var that = this
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (iptstr === "") {
      wx.showToast({
        title: '输入不能为空',
        duration: 2000,
        success: function () {
          that.fadeIn()
        }
      })
      return false
      // console.log('输入不能为空')
    } else if (!reg.test(iptstr)) {
      wx.showToast({
        title: '电话格式不正确',
        duration: 2000,
        success: function () {
          that.fadeIn()
        }
      })
      return false
      // console.log('邮箱格式不正确')
    } else {
      return true
      console.log('电话验证正确')
    }
  },
  /**
   * 输入校验 
   */
  bindKeyInput: function (e) {
    var that = this
    var iptval = e.detail.value
    var iptvallen = e.detail.value.length
    var spaceIndex = iptval.indexOf(' ')
    var dataName = e.currentTarget.dataset.name

    if (dataName === 'dimissionReason') {
      this.setData({
        dimissionReason: iptval
      })
    } else if (dataName === 'hopePay') {
      this.setData({
        hopePay: iptval
      })
    } else if (dataName === 'beforePay') {
      this.setData({
        beforePay: iptval
      })
    } else if (dataName === 'address') {
      this.setData({
        address: iptval
      })
    } else if (dataName === 'email') {
      this.setData({
        email: iptval
      })
    } else if (dataName === 'mobile') {
      this.setData({
        mobile: iptval
      })
    } else if (dataName === 'identity'){
      this.setData({
        identity: iptval
      })
    } else if (dataName === 'name') {
      this.setData({
        name: iptval
      })
    } else if (dataName === 'position') {
      this.setData({
        position: iptval
      })
    }


    if (iptval.indexOf(' ') >= 0) {
      // console.log(1)
      this.data.candidate[dataName] = iptval.slice(0, spaceIndex) + iptval.slice(spaceIndex + 1, iptvallen)
      this.setData({
        candidate: that.data.candidate
      })
    } else {
      // console.log(2)
      this.data.candidate[dataName] = iptval
      var newcandidate = that.data.candidate
      this.setData({
        candidate: newcandidate
      })
    }
  },
  bindDateChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.candidate.birthTime = e.detail.value
    // candidate.birthTime
    this.setData({
      candidate: that.data.candidate,
      date: e.detail.value
    })
  },
  // 到岗时间 bindEntryDateChange
  bindEntryDateChange: function (e) {
    var that = this
    this.data.candidate.reportTime = e.detail.value
    this.setData({
      candidate: that.data.candidate,
      entryDate: e.detail.value
    })
  },
  // 应聘来源
  bindPickerSourseChange: function (e) {
    var that = this
    console.log(e)
    this.data.candidate.source = this.data.sourseArr[e.detail.value]
    this.setData({
      candidate: that.data.candidate,
      sourseIndex: e.detail.value
    })
  },
  // 民族选择
  bindPickerMinzuChange: function (e) {
    console.log('picker发送选择改变，携带值:为', e.detail.value)
    this.setData({
      nationalityIndex: e.detail.value
    })
  },
  // 性别选择
  bindPickerChange: function (e) {
    console.log(e)
    var that = this
    this.data.candidate.distinction = parseInt(e.detail.value) + 1
    this.setData({
      candidate: that.data.candidate,
      index: e.detail.value
    })
  },
  // 婚姻情况
  bindPickerMarryChange: function (e) {
    var that = this
    this.data.candidate.marriage = parseInt(e.detail.value) + 1
    this.setData({
      candidate: that.data.candidate,
      marryIndex: e.detail.value
    })
  },
  // 籍贯选择器
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    console.log(this.data.region)
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
  /**
   * 修改基本信息
   */
  modifyClick: function () {
    // formEdit formDisabled
    this.setData({
      disabled: false,
      editState: 'formEdit',
    })
  },
  /**
   * 提交基本信息
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this
    // return
    var rdSessionId = wx.getStorageSync('rdSessionId')
    if (that.data.position.length < 2) {
      wx.showToast({
        title: '请填写应聘职位',
        icon: 'loading',
        duration: 2000,
        success: function () {
          console.log('应聘职位不能为空')
        }
      })
      return
    } else if (that.data.name.length < 2) {
      wx.showToast({
        title: '请填写姓名项',
        icon: 'loading',
        duration: 2000,
        success: function () {
          console.log('姓名不能为空')
        }
      })
      return
    } else if (!that.regCheckIdentity(that.data.identity)) {
      wx.showToast({
        title: '身份证号必填',
        icon: 'loading',
        duration: 2000,
        success: function () {
          console.log('身份证号不能为空')
        }
      })
      return
    } else if (!that.regCheckTel(that.data.mobile)) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'loading',
        duration: 2000,
        success: function () {
          console.log('手机号不能为空')
        }
      })
      return
    } else if (!that.regCheckEmail(that.data.email)) {
      wx.showToast({
        title: '邮箱为必填项',
        icon: 'loading',
        duration: 2000,
        success: function () {
          console.log('邮箱不能为空')
        }
      })
      return
    } else if (that.data.address.length < 1) {
      wx.showToast({
        title: '请填写现住址',
        icon: 'loading',
        duration: 2000,
        success: function () {
          console.log('现住址不能为空')
        }
      })
      return
    } else if (that.data.beforePay.length < 1) {
      wx.showToast({
        title: '过往薪资必填',
        icon: 'loading',
        duration: 2000,
        success: function () {
          console.log('过往薪资不能为空')
        }
      })
      return
    } else if (that.data.hopePay.length < 1) {
      wx.showToast({
        title: '期望薪资必填',
        icon: 'loading',
        duration: 2000,
        success: function () {
          console.log('期望薪资不能为空')
        }
      })
      return
    } else if (that.data.dimissionReason.length < 1) {
      wx.showToast({
        title: '离职原因未填',
        icon: 'loading',
        duration: 2000,
        success: function () {
          console.log('离职原因不能为空')
        }
      })
      return
    }
    // 点击之后 返回之前 禁止点击二次
    that.setData({
      disabled: true,
      editState: 'formDisabled',
    })
    // 发起网络请求
    wx.request({
      url: getApp().globalData.baseUrl + '/weChat/addCandidate',
      data: {
        rdSessionId: rdSessionId,
        candidate: {
          id: that.data.candidate.id,
          name: that.data.name,
          source: e.detail.value.jobfrom,
          position: that.data.position,
          distinction: parseInt(e.detail.value.gender) + 1,
          identity: that.data.identity,
          marriage: parseInt(e.detail.value.merry) + 1,
          nationality: e.detail.value.minzu,
          native: e.detail.value.jiguan[0] + '_' + e.detail.value.jiguan[1] + '_' + e.detail.value.jiguan[2],
          birthTime: e.detail.value.birth,
          email: that.data.email,
          reportTime: e.detail.value.entryTime,
          address: that.data.address,
          mobile: that.data.mobile,
          beforePay: that.data.beforePay,
          hopePay: that.data.hopePay,
          dimissionReason: that.data.dimissionReason
        }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              getApp().linkLock = true
              setTimeout(that.iniFuc, 2000)
            }
          })
        } else {
          wx.showToast({
            title: '信息保存失败',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            disabled: false,
            editState: 'formEdit',
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  getGlobalFuc: function () {
    getApp().globalFuc(5)
  },
  test2: function () {
    console.log('jj:')
    console.log(getApp().globalData.testdata)
  },
  getGlobalType: function () {
    var tt = getApp().globalData.pageType
    console.log(tt)
  },
  testHopepay: function () {
    console.log('hopePay:', this.data.hopePay)
  },
  // 测试电话号码自动获得焦点
  testGetAppData: function () {
    // this.setData({
    //   mobileFocus: true,
    //   mobileSwitch: !this.data.mobileSwitch
    // })
    // console.log(getApp().progressData)
    this.testEntryAdd()
  },
  // testGetAppData: function () {
  //   var ptype = getApp().globalData.pageType
  //   console.log(ptype)
  // },
  ballClick: function (e) {
    var page_name = e.currentTarget.dataset.pagename
    if (this.data.candidateId || this.data.candidate.id) {
      getApp().ballClickFuc(page_name)
    }else{
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