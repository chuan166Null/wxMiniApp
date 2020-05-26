Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: [],
    slideX: 0,
    touchS: [],
    touchE: [],
  },

  // event: function (e) {
  //   console.log(e)
    
  //   // this.touchstart();
  //   // this.touchmove();
  // },

  touchstart: function (e) {
    let event = e.touches[0].clientX;
    let start = Math.ceil(event);
    this.setData({
      touchS: start,
    })
  },

  touchmove: function (e) {
    let event = e.touches[0].clientX
    let move = Math.ceil(event);
    this.setData({
      touchE: move
    })
    
  },

  touchend: function () {
    console.log(this.data.touchS);
    console.log(this.data.touchE)
  },

  onclick: function(){
    console.log('1')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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