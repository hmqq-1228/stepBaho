//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    this.mianItemNumSet()
  },
  debug: false,
  globalTab:function(tab){
    if(this.debug) console.log(123)
  },
  // 设置面试页面的项目条目数 （如：基本信息、教育、工作、培训、家庭、个人。共6项）
  mianItemNumSet:function(){
    var mianItemNum = 0
    for (var i = 0; i < this.progressData.length; i++) {
      if (this.progressData[i].pageType === 1) {
        mianItemNum = mianItemNum + 1
      }
    }
    this.globalData.mianTotalNum = mianItemNum
  },
  setPageType:function(num){
    this.globalData.pageType = num
  },
  globalData: {
    // kk
    footer: 'footers',
    // 临时测试
    jockillerToken: '',
    // 设置swiper的每页展示个数
    swiperDisNum: 5,
    // 设置面试页条目总个数
    mianTotalNum: 0,
    // 进度条 当前swiper项目索引
    currentSwiperIndex: 0,
    newProgressShow: true,
    pageType:1,
    userInfo: null,
    // baseUrl: 'http://10.0.5.26:8080'
    // baseUrl: 'http://10.0.5.29:8080'
    // 10.0.5.145
    // 外网
    // baseUrl: 'https://srm.baho.cn/employeeSelfService_war',
    imgBaseUrl: 'https://srm.baho.cn',
    // 内网测试环境
    baseUrl: 'http://gsh.vaiwan.com:8081',
    //baseUrl: 'http://ak47.vaiwan.com/employee',
    // baseUrl: 'http://10.0.5.145:8088',
    // 10.0.5.145:8088
    // 内网测试环境 客户端操作
    outerBaseUrl: 'https://srm.baho.cn/employeeSelfService_war',
    innerBaseUrl: 'http://ak47.vaiwan.com/employee',
    // baseUrl: 'http://ak47.vaiwan.com/employee'
    // baseUrl: 'http://gsh.vaiwan.com'
    // baseUrl: 'http://yp.vaiwan.com'
    // baseUrl: 'http://gsh.vaiwan.com:8081'
    // baseUrl: 'https://10.0.5.145'
    // baseUrl: 'http://gsh.vaiwan.com'
    // baseUrl: 'http://10.0.5.135:8089/employee'
  },
  last_next_pro: '',
  next_next_pro: '',
  linkLock: true,
  progressData: [
    {
      proInterface: 'candidate',
      pageName: 'mianBaseInfo',
      pageType: 1,
      status: false,
      current: true,
      proName: '基本'
    },
    {
      proInterface: 'workerInfo',
      pageName: 'extraBaseInfo',
      pageType: 2,
      status: false,
      current: false,
      proName: '补充'
    },
    {
      proInterface: 'educationExperience',
      pageName: 'education',
      pageType: 1,
      status: false,
      current: false,
      proName: '教育'
    },
    {
      proInterface: 'jobExperience',
      pageName: 'work',
      pageType: 1,
      status: false,
      current: false,
      proName: '工作'
    },
    {
      proInterface: 'trainingExperience',
      pageName: 'train',
      pageType: 1,
      status: false,
      current: false,
      proName: '培训'
    },
    {
      proInterface: 'familyMember',
      pageName: 'family',
      pageType: 1,
      status: false,
      current: false,
      proName: '家庭'
    },
    {
      proInterface: 'candidateInfo',
      pageName: 'careerplan',
      pageType: 1,
      status: false,
      current: false,
      proName: '个人'
    },
    {
      proInterface: 'urgentContact',
      pageName: 'urgent',
      pageType: 2,
      status: false,
      current: false,
      proName: '紧急'
    },
    {
      proInterface: 'healthStatus',
      pageName: 'healthStatus',
      pageType: 2,
      status: false,
      current: false,
      proName: '健康'
    },
    {
      proInterface: 'beforeUnits',
      pageName: 'beforeUnits',
      pageType: 2,
      status: false,
      current: false,
      proName: '前单位'
    }
  ],
  navSwitchTo: function (next_pro, tag) {
    var that = this
    console.log(next_pro)
    var that = this
    var linkPath = ''
    switch (next_pro) {
      case 'candidate':
        linkPath = 'mianBaseInfo';
        break;
      case 'educationExperience':
        linkPath = 'education';
        break;
      case 'jobExperience':
        linkPath = 'work';
        break;
      case 'trainingExperience':
        linkPath = 'train';
        break;
      case 'familyMember':
        linkPath = 'family';
        break;
      case 'candidateInfo':
        linkPath = 'careerplan';
        break;
      case 'workerInfo':
        linkPath = 'extraBaseInfo';
        break;
      case 'beforeUnits':
        linkPath = 'beforeUnits';
        break;
      case 'healthStatus':
        linkPath = 'healthStatus';
        break;
      case 'urgentContact':
        linkPath = 'urgent';
        break;
      default:
        console.log('没对应')
    }
    var showModalTit = ''
    if(tag === 'submit'){
      showModalTit = '保存成功'
    }else{
      showModalTit = '完善信息'
    }
    wx.showModal({
      title: showModalTit,
      content: '点击确定，进入下一步填写',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../' + linkPath + '/' + linkPath
          })
          if (that.debug) console.log('用户点击确定')
        } else if (res.cancel) {
          if (that.debug) console.log('用户点击取消')
        }
      }
    })
  },
  progressFuc: function (resData, crtInterface, tag) {
    console.log('progressFuc', tag)
    // 进度设置
    var that = this
    var next_pro = ''
    for (var r = 0; r < that.progressData.length; r++) {

      // 如果返回值不为null('candidate','candidateInfo','healthStatus','beforeUnits'这四类会返回null) 
      // 其它项目返回值为空时，返回空数组
      if (resData.result[that.progressData[r].proInterface]) {
        // 判断是否为数组
        if (resData.result[that.progressData[r].proInterface] instanceof Array){
          if (resData.result[that.progressData[r].proInterface].length > 0){
            that.progressData[r].status = true
          }else{
            if (that.progressData[r].pageType <= that.globalData.pageType){
              that.progressData[r].status = false
              next_pro = next_pro.length > 0 ? next_pro : that.progressData[r].proInterface
            }
          }
        }else{
          that.progressData[r].status = true
        }
        
      } else {
        if (that.progressData[r].pageType <= that.globalData.pageType) {
          that.progressData[r].status = false
          next_pro = next_pro.length > 0 ? next_pro : that.progressData[r].proInterface
        }
      }
      // 判断是否在当前页面
      if (that.progressData[r].proInterface === crtInterface) {
        that.progressData[r].current = true
      } else {
        that.progressData[r].current = false
      }
    }
    that.last_next_pro = that.next_next_pro
    that.next_next_pro = next_pro
    if (next_pro.length > 0 && resData.result[crtInterface]) {
      if (that.linkLock) {
        if (resData.result[crtInterface] instanceof Array) {
          if (resData.result[crtInterface].length > 0) {
            that.navSwitchTo(next_pro, tag)
          }
        }else{
          that.navSwitchTo(next_pro, tag)
        }
        
      }
    }
    // 是否是最后一项提交
    if (that.last_next_pro.length > 0 && that.next_next_pro.length === 0) {
        wx.showToast({
          title: '填写完毕，谢谢',
          mask: true,
          icon: 'success',
          duration: 2000,
          success: function () {
            if (getApp().globalData.pageType === 1) {
              wx.redirectTo({
                url: '../mianBaseInfo/mianBaseInfo'
              })
            } else if (getApp().globalData.pageType === 2) {
              wx.redirectTo({
                url: '../entryBaseInfo/entryBaseInfo'
              })
            }
          }
        })
    }
    // 数组排序
    var insertLock = false
    var insertIndex = 0
    for (var c = 0; c < that.progressData.length; c++) {
      if (!that.progressData[0].status) {
        return
      }else{
        if (that.progressData[c].status) {
          if (!insertLock) {
            insertIndex = c
          }else{
            var delItem = that.progressData.splice(c, 1)
            that.progressData.splice(insertIndex, 0, delItem[0])
            c = insertIndex
            insertLock = false
          }
        }else{
          if (!insertLock) {
            insertIndex = c
            insertLock = true
          }else{

          }
        }

        if (crtInterface === that.progressData[c].proInterface) {
          console.log('c:', c)
          that.globalData.currentSwiperIndex = c
        }

      }
    }
  },
  // 点击 进度条小圆点 跳转到对应的页面
  ballClickFuc: function (pageName) {
    this.linkLock = false
    wx.redirectTo({
      url: '../' + pageName + '/' + pageName
    })
  },
  bottomNavLink: function (e) {
    var linkPage = e.currentTarget.dataset.linkpage
    var pageType = this.globalData.pageType
    if (linkPage === 'toindex') {
      if (pageType === 1) {
        wx.redirectTo({
          url: '../mianBaseInfo/mianBaseInfo'
        })
      } else if (pageType === 2) {
        wx.redirectTo({
          url: '../entryBaseInfo/entryBaseInfo'
        })
      }
    } else if (linkPage === 'tomine') {
      wx.redirectTo({
        url: '../mine/mine'
      })
    }
  },
  // 项目内未填项
  // 检查表单项目中是否有未填写的字段
  checkForm: function (formItemArr, testItem, itemFieldTit) {
    // var testItem = ['professional_专业名称', 'academic_获得学位']
    var novalueArr = []
    for (var i = 0; i < formItemArr.length; i++) {
      var novalueItemArr = []
      for (var t = 0; t < testItem.length; t++) {

        var fieldName = testItem[t].split('_')[0]
        var fieldIntro = testItem[t].split('_')[1]

        if (formItemArr[i][fieldName].length <= 0) {
          novalueItemArr.push(fieldIntro)
        }
      }

      if (novalueItemArr.length > 0) {
        var novalueObj = {
          key: i,
          itemName: formItemArr[i][itemFieldTit],
          nullItem: novalueItemArr
        }
        novalueArr.push(novalueObj)
      }
    }

    if (novalueArr.length > 0) {
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
  }
})