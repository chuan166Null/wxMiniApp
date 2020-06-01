// pages/add/add.js
var a = getApp();

// 弹窗提示显示图片
var iconImg = '../../icofont/war.png';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardDcuS: 0,
        cardDliS: 0,
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
        remindDay: ['不提示', '当天', '提前1天', '提前2天', '提前3天'],
        coIndex: 0,
        coArray: [
            {
                id: 0,
                symbol: '🅰',
                str: '次',
            },
            {
                id: 1,
                symbol: '🅱',
                str: '元',
            }
        ],
        isShow: false,
        txt: '发生错误',
        cardData: {
            id: 0,
            befor: '',
            after: '',
            bank: '',
            billDay: null,
            repDay: null,
            reDay: null,
            deDay: null,
            kind: '',
            setName: '',
            RMB: '',
            yearFee: '',
            num: '',
            note: '',
        },
        edit: false,
    },

    // 还款日模式切换
    clickTabChangeDay: function (e) {
        let opIndex = e.currentTarget.dataset.index;
        let opArrayId = this.data.opArray[opIndex].id;
        if (opIndex == 0) {
            opArrayId++;
            this.setData({
                opIndex: opArrayId,
            });
        } else if (opIndex == 1) {
            opArrayId--;
            this.setData({
                opIndex: opArrayId,
            });
        };
    },

    // 出账提醒
    dePickerChange: function (e) {
        this.setData({
            dePickerIndex: e.detail.value,
        })
    },

    // 还款提醒
    rePickerChange: function (e) {
        this.setData({
            rePickerIndex: e.detail.value,
        })
    },

    // 年费模式切换
    clickTabChangeCost: function (e) {
        let coIndex = e.currentTarget.dataset.index;
        let coArrayId = this.data.coArray[coIndex].id;
        if (coIndex == 0) {
            coArrayId++;
            this.setData({
                coIndex: coArrayId,
            });
        } else if (coIndex == 1) {
            coArrayId--;
            this.setData({
                coIndex: coArrayId,
            });
        }
    },

    // 表单提交
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

    // 获取本地缓存数据
    getStoData: function (obj, objKey, objId) {
        try {
            // 获取本地存储的所有缓存数据
            const cardD = wx.getStorageInfoSync();

            // 获取缓存中卡的数据
            var cardA = cardD.keys;
            var cardDl = cardA.length + 1;

            // 获取存储数据所用空间
            var cardDcu = cardD.currentSize;

            // 获取存储数据空间总数
            var cardDli = cardD.limitSize;
            this.setData({
                cardDcuS: cardDcu,
                cardDliS: cardDli,
            });

        } catch (e) {
            this.toastShow(iconImg, '读取本地缓存失败');
        };

        // 为数据添加id
        obj['id'] = objId ? objId : cardDl;

        // 为存储的数据设置key
        let key = objKey ? objKey : String(cardDl);

        // 缓存数据到本地
        wx.setStorage({
            data: obj,
            key: key,
        });
    },

    back: function () {
        wx.switchTab({
            url: '../index/index',
        });
    },
    

    // 提交/保存按钮事件
    addSubmit: function (e) {

        // 获取还款日和年费的切换索引
        let op = this.data.opIndex;
        let co = this.data.coIndex;

        // 判断是否从编辑按钮进入
        if (a.edit) {
            var cardKey = String(a.index);
            var cardId = parseInt(cardKey);
        } else {
            cardKey = false;
            cardId = false;
        }

        // 获取表单内的内容
        let cardObj = e.detail.value;
        cardObj['opIndex'] = op;
        cardObj['coIndex'] = co;

        // 判断必填内容是否为空
        if (cardObj.befor == '') {
            this.toastShow(iconImg, '请填写\n卡号前6位');
            return;
        } else if (cardObj.after == '') {
            this.toastShow(iconImg, '请填写\n卡号后4位');
            return;
        } else if (cardObj.bank == '') {
            this.toastShow(iconImg, '请填写\n发卡银行或机构');
            return;
        } else if (cardObj.billDay == '') {
            this.toastShow(iconImg, '请填写\n账单日');
            return;
        } else if (cardObj.repDay == '') {
            this.toastShow(iconImg, '请填写\n还款日');
            return;
        };

        // 获取表单内容并存储
        this.getStoData(cardObj, cardKey, cardId);

        wx.switchTab({
            url: '../index/index',
        });

    },

    // 删除卡片按钮
    removeStorageSync: function () {
        let that = this;
        let qqL = wx.getStorageInfoSync().keys.length;

        // 获取卡片的index，用于判断修改的目标
        let strA = String(a.index);
        wx.showModal({
            content: '是否删除此卡片',
            showCancel: true,
            confirmColor: '#f03a17',
            success: function (res) {
                if (res.confirm) {
                    wx.removeStorage({
                        key: strA,
                        success: function (res) {

                            // test，重新整理本地数据
                            try {
                                let qq = wx.getStorageInfoSync().keys;
                                qq.forEach(function (e) {
                                    if (parseInt(e) > parseInt(strA)) {
                                        try {
                                            let cardObj = wx.getStorageSync(e);
                                            let strE = e - 1;
                                            let cardKey = String(strE);
                                            let cardId = strE;

                                            that.getStoData(cardObj, cardKey, cardId);

                                        } catch (e) {
                                            that.toastShow(iconImg, '数据重新整理失败');
                                        };
                                    };
                                });

                                // 重新获取本地数据的长度
                                let qL = wx.getStorageInfoSync().keys.length;
                                if (qL = qqL) {
                                    wx.removeStorage({
                                        key: String(qqL),
                                    });
                                }

                                wx.switchTab({
                                    url: '../index/index',
                                });
                            } catch (e) {

                            }

                        },
                    });
                } else if (res.cancel) {
                    this.toastShow(iconImg, '删除失败');
                    return false
                }
            },
        });

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;

        // 同步编辑卡片按钮状态
        that.setData({
            edit: a.edit,
        });

        // 获取并显示缓存空间
        try {
            const cardD = wx.getStorageInfoSync();

            // 获取存储数据所用空间
            var cardDcu = cardD.currentSize;

            // 获取存储数据空间总数
            var cardDli = cardD.limitSize;
            this.setData({
                cardDcuS: cardDcu,
                cardDliS: cardDli,
            });
        } catch (e) {
            this.toastShow(iconImg, '读取缓存空间失败');
        };

        // 判断入口按钮，回显表单数据
        let ec = that.data.edit;
        if (ec) {
            let cardIndex = String(a.index);
            try {
                let card = wx.getStorageSync(cardIndex);
                let cardInfo = {
                    id: card.id,
                    befor: card.befor,
                    after: card.after,
                    bank: card.bank,
                    billDay: card.billDay,
                    repDay: card.repDay,
                    reDay: card.reDay,
                    deDay: card.deDay,
                    kind: card.kind,
                    setName: card.setName,
                    RMB: card.RMB,
                    yearFee: card.yearFee,
                    num: card.num,
                    note: card.note,
                };
                that.setData({
                    cardData: cardInfo,
                    rePickerIndex: card.reDay,
                    dePickerIndex: card.deDay,
                    opIndex: card.opIndex,
                    coIndex: card.coIndex,
                });
            } catch (error) {

            }
        }
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