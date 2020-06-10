var a = getApp();
var util = require('../../utils/util');

// 弹窗提示显示图片
var iconImg = '../../icofont/war.png';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: [],
    billDate: [],
    repDate: [],
    RMB: 0,
    cLlength: 0,
    slideX: 0,
    touchS: [],
    touchE: [],
    isShow: false,
    iconFont: '../../icofont/war.png',
    txt: '发生错误',
    aniData: null,
  },




  // 提示弹窗
  toastShow: function (img, str) {
    let that = this;
    that.setData({
      isShow: true,
      iconFont: img,
      txt: str,
    });
    setTimeout(() => {
      that.setData({
        isShow: false,
      });
    }, 2000);
  },

  // 以下注释：未实现的卡片滑动动画
  // // 开始按下的位置
  // touchstart: function (e) {
  //   let event = e.touches[0].clientX;
  //   let start = Math.ceil(event);
  //   this.setData({
  //     touchS: start,
  //   })
  // },

  // // 移动中变化的位置
  // touchmove: function (e) {
  //   let event = e.touches[0].clientX
  //   let move = Math.ceil(event);
  //   this.setData({
  //     touchE: move
  //   })

  // },

  // // 手指抬起结束移动的位置
  // touchend: function () {

  // },

  // // 动画  未实现
  // newInfo() {
  //   var animation = wx.createAnimation({
  //     // delay: 0,
  //     duration: 200,
  //     timingFunction: "linear",
  //     // transformOrigin: 'transformOrigin',
  //   });

  //   this.animation = animation
  //   animation.translateX(-75).step()
  //   this.setData({
  //     aniData: animation.export()
  //   })
  // },


  onClick: function (e) {
    // this.setData({
    //   editCard: true,
    // });
    // this.newInfo();

    // 获取当前点击按钮对应标签的index，通过index参数查询本地缓存数据
    let index = e.currentTarget.dataset.index;
    a.index = index;
    a.edit = true;
    try {
      var curr = wx.getStorageSync(`${index}`);
      a.globalData = curr
    } catch (e) {
      this.toastShow(iconImg, '读取数据失败');
    }
  },


  addData: function () {
    // 获取表单内容并存储
    try {

      // 获取本地存储的所有缓存数据
      const cardD = wx.getStorageInfoSync();

      // 获取缓存中卡的数据
      var cardA = cardD.keys;
      var cardDl = cardA.length;

    } catch (e) {
      this.toastShow(iconImg, '读取本地缓存失败');
    }

    for (let i = 0; i < cardDl; i++) {
      try {
        let temp = wx.getStorageSync(cardA[i])
        this.data.cardList.push(temp);
      } catch (e) {
        this.toastShow(iconImg, '读取缓存数据失败');
      }
    }
    let cl = this.data.cardList;
    this.setData({
      cardList: cl,
    });

  },

  add: function () {
    a.edit = false;
  },

  // 重置内存数据
  clearCardList: function () {
    this.data.cardList = [];
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.clearCardList();
    that.addData();

    // 获取计算总额度
    let rmb = function () {
      let _rmb = that.data.cardList;
      let rmb = _rmb.map(function (e) {
        let nRMB = Number(e.RMB)
        return nRMB
      });
      let RMB = 0;
      for (let i = 0; i < rmb.length; i++) {
        RMB += rmb[i];
      }
      return RMB
    };
    that.setData({
      RMB: rmb(),
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    this.onLoad();

    // 计算账单日和还款日
    try {
      let allCard = wx.getStorageInfoSync().keys;
      let billD = allCard.map(function (e) {
        let cardInfo = wx.getStorageSync(e);
        let billDay = cardInfo.billDay;
        let year = new Date().getFullYear();
        let month1 = new Date().getMonth() + 1;
        let billDate = util.calDate(year, month1, billDay);

        // let ifMon = billDate.month;
        // if(ifMon == 1)
        let bD = {
          id: cardInfo.id,
          billD: billDate,
        };
        return bD
      });
      let repD = allCard.map(function (e) {
        let cardInfo = wx.getStorageSync(e);
        let repDay = cardInfo.repDay;
        let year = new Date().getFullYear();
        let month1 = new Date().getMonth() + 1;
        let repDate = util.calDate(year, month1, repDay);
        let rD = {
          id: cardInfo.id,
          repD: repDate,
        };
        return rD
      });

      that.setData({
        billDate: billD,
        repDate: repD,
      });

    } catch (error) {

    }
    console.log(that.data)
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

  }
})