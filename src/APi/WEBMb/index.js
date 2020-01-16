import { api, myAxios } from "../Public";

export const Api = {
  baseurl: api,
  //   移动登录
  Mobile_login: params => {
    return myAxios.post(api + `mobile/index/mobilelogin`, params).then();
  },
  //   注册账号
  Mobile_register: params => {
    return myAxios.post(api + `mobile/index/register`, params).then();
  },
  //   验证码验证
  Mobile_verification: params => {
    return myAxios.post(api + `mobile/index/checkcode`, params).then();
  },
  //   忘记密码
  Mobile_forgetpass: params => {
    return myAxios.post(api + `mobile/index/changepassword`, params).then();
  },
  //   得到短信验证码
  Mobile_verify: params => {
    return myAxios.post(api + `mobile/index/getmobileyzm`, params).then();
  },
  // 用户信息
  // 个人中心
  Mobile_Soncenter: params => {
    return myAxios.post(api + `mobile/member/person`, params).then();
  },
  // 修改个人信息
  Mobile_Son_info: params => {
    return myAxios.post(api + `mobile/member/setinfo`, params).then();
  },
  // 佣金中心
  Mobile_Com_center: params => {
    return myAxios.post(api + `mobile/member/bonus`, params).then();
  },
  //   佣金记录接口
  Mobile_Com_award: params => {
    return myAxios.post(api + `mobile/order/commissionlog`, params).then();
  },
  // 获取下级信息
  Mobile_Com_Down: params => {
    return myAxios.post(api + `mobile/member/getDown`, params).then();
  },
  // 推荐奖励
  Mobile_Com_award: params => {
    return myAxios.post(api + `mobile/member/getbonus`, params).then();
  },
  // 提现
  Mobile_Draw_info: params => {
    return myAxios.post(api + `mobile/withdraw/index`, params).then();
  },
  // 提现明细
  Mobile_Draw_Detail: params => {
    return myAxios.post(api + `mobile/withdraw/log`, params).then();
  },
  // 提现申请
  Mobile_Draw_submit: params => {
    return myAxios.post(api + `mobile/withdraw/submit`, params).then();
  },
  // 核销记录
  Mobile_record: params => {
    return myAxios.post(api + `mobile/checklog/mylog`, params).then();
  },
  // 商家加盟
  Mobile_Sublink: params => {
    return myAxios.post(api + `mobile/merch/apply`, params).then();
  },

  // 商户分类列表
  Mobile_classify_list: params => {
    return myAxios.post(api + `mobile/merchcate/getlist`, params).then();
  },
  // 优惠券列表
  Mobile_favo_list: params => {
    return myAxios.post(api + `mobile/coupon/getlist`, params).then();
  },
  // 优惠券详情
  Mobile_favo_detail: params => {
    return myAxios.post(api + `mobile/coupon/details`, params).then();
  },
  //核销优惠券详情
  Mobile_cancel_detail: params => {
    return myAxios.post(api + `mobile/couponlog/details`, params).then();
  },
  // 订单创建
  Mobile_Order_create: params => {
    return myAxios.post(api + `mobile/order/create`, params).then();
  },
  // 订单支付
  Mobile_Order_pay: params => {
    return myAxios.post(api + `mobile/order/pay`, params).then();
  },
  // 订单查询
  Mobile_Order_choice: params => {
    return myAxios.post(api + `mobile/order/query`, params).then();
  },
  // 下单商品详情
  Mobile_Sub_detail: params => {
    return myAxios.post(api + `mobile/order/goodsdetails`, params).then();
  },
  //获取分销海报二维码
  Mobile_Ind_qrcode: params =>{
    return myAxios.post(api + `mobile/index/getqrcode`, params).then();
  },
};
