// pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        opIndex: 0,
        opArray: [
            {
                id: 0,
                name: '🅰 每月固定',
            },
            {
                id: 1,
                name: '🅱 账单日之后',
            }
        ],
        rePickerIndex: 2,
        dePickerIndex: 2,
        remindDay: ['不提示','当天','提前1天','提前2天','提前3天'],
    },

    clickPickerChange: function(e){
        let opIndex = e.currentTarget.dataset.index;
        let opArrayId = this.data.opArray[opIndex].id;
        if(opIndex == 0){
            opArrayId ++;
            this.setData({
                opIndex: opArrayId,
            });
        }else if(opIndex == 1){
            opArrayId --;
            this.setData({
                opIndex: opArrayId,
            });
        };
    },

    // 出账提醒
    dePickerChange: function (e) {
        console.log(e)
        this.setData({
            dePickerIndex: e.detail.value,
        })
    },

    // 还款提醒
    rePickerChange: function (e) {
        console.log(e)
        this.setData({
            rePickerIndex: e.detail.value,
        })
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