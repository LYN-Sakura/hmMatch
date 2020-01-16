import { api, myAxios } from "../Public";
import qs from "qs";

export const Api = {
  // 状态码"status":-100/-101/0/1-----对应-----"message":未登录/无权限/操作失败/操作成功,
  url: api,
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {非必填参数limit:每页显示记录数--默认15条，page：页数，keyword：模糊检索标题，ishot：是否热门活动，starttime：开始时间，endtime：结束时间,province:省份编码，city：城市编码，status：状态}
   * @return:
   */
  Activelist: params => {
    // 显示活动列表
    return myAxios.post(api + `admin/active/index`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {必填参数merchids：商家ids，title：标题，pic：海报背景，thumb：图片，status：是否通过审核，goodsid：关联商品id，非必填参数subtitle：简介，content：详情，views：浏览量，starttime：开始时间，endtime：结束时间，displayorder：排序，数字越大越靠前，audio：音频，province，city，area（省、市、区）}
   * @return:
   */
  Addactive: params => {
    // 新增活动
    return myAxios.post(api + `admin/active/save`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {id：必填}
   * @return:
   */
  Show_assign_active: params => {
    // 显示指定活动
    return myAxios.post(api + `admin/active/read`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {id：必填}
   * @return:
   */
  Show_editor_active: params => {
    // 显示编辑指定活动
    return myAxios.post(api + `admin/active/edit`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {必填参数id:ID,merchids：商家ids，title：标题，pic：海报背景，thumb：图片，status：是否通过审核，非必填参数subtitle：简介，content：详情，views：浏览量，starttime：开始时间，endtime：结束时间，displayorder：排序，数字越大越靠前，audio：音频，province，city，area（省、市、区）}
   * @return:
   */
  Save_update_active: params => {
    // 保存更新指定的活动
    return myAxios.post(api + `admin/active/update`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {id：必填}
   * @return:
   */
  Del_assign_active: params => {
    // 删除指定的活动
    return myAxios.post(api + `admin/active/delete`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {必填mid:用户id,非必填keyword:模糊检索标题}
   * @return:
   */
  Find_active: params => {
    // 查询活动
    return myAxios.post(api + `admin/merch/searchActive`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {必填mid:用户id}
   * @return:
   */
  Set_hot_active: params => {
    // 设置热门活动
    return myAxios.post(api + `admin/active/sethot`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {activeid：必填}
   * @return:
   */
  Del_hot_active: params => {
    // 删除热门活动
    return myAxios.post(api + `admin/active/deletehot`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {必填id:string||array类型,status:当前状态}
   * @return:
   */
  Update_hot_active: params => {
    // 修改热门活动
    return myAxios.post(api + `admin/active/setstatus`, params).then();
  },
  //   商家管理
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {非必填参数limit：每页显示记录数，page：当前页数，keyword：模糊检索标题，isbig：是否大牌商户，starttime：开始时间，endtime：结束时间,province:省份编码,city:城市编码，enabled：启用状态，status：审核状态}
   * @return:
   */
  Show_merchant_list: params => {
    // 显示商户列表
    return myAxios.post(api + `admin/merch/index`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {必填参数mid：用户id，title：标题，status：是否通过审核，cate：类型，displayorder：排序，数字越大越靠前，非必填参数displayorder：排序，数字越大越靠前，subtitle：简介，content：详情，thumb：多图第一张作为首图，thumbs：多图，name：联系人，mobile：电话，address：地址，views：浏览量，address：详细地址，lng：经度，lat：纬度，video：视频，ids：核销人，province，city，area(省、市、区)}
   * @return:
   */
  Add_merchant: params => {
    // 新增商户
    return myAxios.post(api + `admin/merch/save`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {id：必填}
   * @return:
   */
  Show_assign_merchant: params => {
    // 显示指定的商户
    return myAxios.post(api + `admin/merch/read`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {id：必填}
   * @return:
   */
  Show_editor_merchant: params => {
    // 显示编辑指定商户
    return myAxios.post(api + `admin/merch/edit`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {必填参数id：ID,mid:用户id,title:标题,status:是否通过审核,cate：类型，，displayorder：排序，数字越大越靠前,非必填参数subtitle：简介，content：详情，thumb：多图第一张作为首图，thumbs：多图，name：联系人，mobile：电话，address：地址，views：浏览量，address：详细地址，lng：经度，lat：纬度，video：视频，ids：核销人，province，city，area(省、市、区)}
   * @return:
   */
  Save_update_merchant: params => {
    // 保存更新指定的商户
    return myAxios.post(api + `admin/merch/update`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {id：必填}
   * @return:
   */
  Del_merchant: params => {
    // 删除指定的商户
    return myAxios.post(api + `admin/merch/delete`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {必填mid：用户id，非必填keyword：模糊检索标题}
   * @return:
   */
  Find_merchant: params => {
    // 查询商户
    return myAxios.post(api + `admin/merch/searchMerch`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {mid：用户id}
   * @return:
   */
  Set_merchant: params => {
    // 设置大牌商户
    return myAxios.post(api + `admin/merch/setbig`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {merchid：必填}
   * @return:
   */
  Del_big_merchant: params => {
    // 删除大牌商家
    return myAxios.post(api + `admin/merch/deletebig`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {必填：merchid=>int|array(商户id数组),enabled=>商户当前状态}
   * @return:
   */
  Update_big_merchant: params => {
    // 修改商户显示状态
    return myAxios.post(api + `admin/merch/enabled`, params).then();
  },
  // 免单卡列表
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {非必填参数limit:每页显示记录数，page:当前页数,keyword:模糊检索标题,starttime:开始时间,endtime:结束时间}
   * @return:
   */
  Vip_card_list: params => {
    // 免单卡列表
    return myAxios.post(api + `admin/card/index`, params).then();
  },
  Add_vip_card: params => {
    // 新增免单卡
    return myAxios.post(api + `admin/card/save`, params).then();
  },
  Show_assign_card: params => {
    // 显示指定会员卡
    return myAxios.post(api + `admin/card/read`, params).then();
  },
  Editor_assign_card: params => {
    // 编辑指定的会员卡
    return myAxios.post(api + `admin/card/edit`, params).then();
  },
  Save_update_card: params => {
    // 保存更新指定的会员卡
    return myAxios.post(api + `admin/card/update`, params).then();
  },
  Del_assign_card: params => {
    //  删除指定的会员卡
    return myAxios.post(api + `admin/card/delete`, params).then();
  },
  // 幻灯片
  Slide_list: params => {
    //  显示幻灯片列表
    return myAxios.post(api + `admin/adv/index`, params).then();
  },
  Add_slide: params => {
    //  新增幻灯片
    return myAxios.post(api + `admin/adv/save`, params).then();
  },
  Show_assign_slide: params => {
    //  显示指定的幻灯片
    return myAxios.post(api + `admin/adv/read`, params).then();
  },
  /**
   * @name: qw
   * @test:
   * @msg:
   * @param {id:必填}
   * @return:
   */
  Show_editor_slide: params => {
    //  显示编辑指定幻灯片
    return myAxios.post(api + `admin/adv/edit`, params).then();
  },
  Save_pdate_slide: params => {
    //  保存更新指定幻灯片
    return myAxios.post(api + `admin/adv/update`, params).then();
  },
  Del_assign_slide: params => {
    //  删除指定幻灯片
    return myAxios.post(api + `admin/adv/delete`, params).then();
  },
  Is_use_slide: params => {
    //  是否启用幻灯片
    return myAxios.post(api + `admin/adv/ishsow`, params).then();
  },
  Show_vip_list: params => {
    //  显示会员列表
    return myAxios.post(api + `admin/member/index`, params).then();
  },
  Buy_card_record: params => {
    //  购卡记录
    return myAxios.post(api + `admin/card_log/index`, params).then();
  },
  Sub_class: params => {
    //  显示商户分类列表
    return myAxios.post(api + `admin/merch_cate/index`, params).then();
  },
  Add_sub_class: params => {
    //  新增商户分类
    return myAxios.post(api + `admin/merch_cate/save`, params).then();
  },
  Show_assign_class: params => {
    //  显示指定的商户分类
    return myAxios.post(api + `admin/merch_cate/read`, params).then();
  },
  Show_editor_class: params => {
    //  显示编辑指定商户分类
    return myAxios.post(api + `admin/merch_cate/edit`, params).then();
  },
  Save_update_class: params => {
    //  保存更新指定商户分类
    return myAxios.post(api + `admin/merch_cate/update`, params).then();
  },
  Del_assign_class: params => {
    //  删除指定的商户分类
    return myAxios.post(api + `admin/merch_cate/delete`, params).then();
  },
  Update_assign_class: params => {
    //  修改分类状态
    return myAxios.post(api + `admin/merch_cate/setstatus`, params).then();
  },
  Pay_set_list: params => {
    //  支付列表
    return myAxios.post(api + `admin/payset/paylist`, params).then();
  },
  Get_pay_info: params => {
    //  获取支付配置信息
    return myAxios.post(api + `admin/payset/getPaySet`, params).then();
  },
  Pay_info_update: params => {
    //  支付配置信息添加/修改
    return myAxios.post(api + `admin/payset/add`, params).then();
  },
  Pay_info_del: params => {
    //  支付配置信息删除
    return myAxios.post(api + `admin/payset/delete`, params).then();
  },
};
