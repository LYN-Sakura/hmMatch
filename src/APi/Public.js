// import axios from "axios";

// const api = "http://tpcoupon.me/";
// const api = "http://overlord.hongbao19.net/";
const api = "http://xsbwk.hongbao19.net/";
// const api = "http://card.hongbao19.net/";

const myAxios = axios.create({
  //定义公用请求
  baseURL: api,
  timeout: 30 * 1000,
  contentType: "application/x-www-form-urlencoded;charset=UTF-8"
});
export {api,myAxios}
