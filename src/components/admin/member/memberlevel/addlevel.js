import {
  Api
} from "../../../../APi/WEBPC/index";
import VueAMap from 'vue-amap'; //地图
import Editor from "../../editor";

let amapManager = new VueAMap.AMapManager();
export default {
  data() {
	let self = this;
	return {
    imglist1: [], //上传图片文件夹
    dialogVisible1: false,  //活动主题判断
		dialogImageUrl1: '',  //活动主题文件
    fincheckarr: [],  //头部选中的图片
    fincheckarr1:[],  //尾部选中的图片
		fileList1: [],  //上传头部图文件的列表
		imgtotal: 0,  //库存图片总数
		imgarr: [],   //数据库所有图片
		currentPage: 1,  //获取上传图片页数
		dialogVisibleI: false,  //选择首页头部图
		nowcheckarr: [],  //弹框选中时选中的图片
		province:'',    //省
		city: '',   //市
		area: '',   //区
		smalladdress: '',   //街道
	  centerDialogVisible: false, // 核销人遮罩
	  forms: {
		// 遮罩表单
		name: "",
		date1: "", // 模糊检索
		date2: "",
		type: []
	  },
	  suboraudit: true, // 判断遮罩title值是归属商家还是核销用户
	  add_audit_list: [], // 核销人数组
	  By_audit: [], // 选定核销人数组
	  audit_people: [], // 核销人列表展示数组
	  flag: false, // 新增热门活动数组为空时的判断字符
	  Submanage: "", // 商家管理员名称
	  Submanagearr: [], // 商家管理员数组展示
	  sub_cate: [], // 商家类型数组
	  cates: '', // 类型描述
	  form: {
		pid: "", // 商家管理员id
		sortrank: "", // 排序
		title: "", // 标题
		intro: "", // 简介
		upload_img: "", // 图片显示地址
		upload_img1: "", // 图片显示地址
		img_list: [], // 图片上传文件夹
		linkman: "", // 联系人
		sub_phone: "", // 商家电话
		Storeaddress: "", // 门店地址
		detail: "", // 详情
		cate: [], // 类型数组
		cateId: '', // 类型ID
		Insertvideo: "", // 插入视频
		cancel: '', //选择核销人
		radio: '', //是否审核
		enabled: '' //是否启用
	  },
	  audPeoIds: '',
	  uid: "", // 修改或是新增判断变量
	  baseurl: "", // 图片上传地址

	  videoUploadPercent: "", // 视频大小
	  videoFlag: "", //  上传进度
	  videoForm: {
		// 视频对象
		Video: "" // 视频地址
	  },

	  //   地图字段
	  amapManager,
	  zoom: 12,
	  address: '',
	  inputaddress: '',
	  // center: [114.305208, 30.592921],
	  // lng: 114.305208,
	  // lat: 30.592921,
	  // markers: [{
	  //   position: [114.305208, 30.592921]
	  // }],
	  center: [114.305208, 30.592921],
	  lng: 114.305208,
	  lat: 30.592921,
	  markers: [{
		position: [114.305208, 30.592921]
	  }],
	  searchOption: {
		city: '',
		citylimit: false
	  },
	  events: {
		click(e) {
		  let {
			lng,
			lat
		  } = e.lnglat;
		  self.lng = lng;
		  self.lat = lat;
		  self.center = [self.lng, self.lat]

		  self.markers = [{
			position: [self.lng, self.lat],
			icon: '',
			title: '',
			events: {
			  click(o) {
				// console.log(o)
			  }
			}
		  }]
		  // 这里通过高德 SDK 完成。
		  var geocoder = new AMap.Geocoder({
			radius: 1000,
			extensions: "all"
		  });
		  // console.log(geocoder)
		  geocoder.getAddress([lng, lat], function (status, result) {
			// console.log(result)
			if (status === 'complete' && result.info === 'OK') {
			  if (result && result.regeocode) {
				self.address = result.regeocode.formattedAddress;
				self.province = result.regeocode.addressComponent.province;
				self.city = result.regeocode.addressComponent.city;
				self.area = result.regeocode.addressComponent.district;
				self.smalladdress=result.regeocode.formattedAddress.slice(result.regeocode.formattedAddress.indexOf('区')+1)
				console.log(self.smalladdress,'addresslnglat', result.regeocode)
				self.$nextTick();
			  }
			}
		  });
		}

	  },
	  marker: {
		position: [121.5273285, 31.21515044],
		events: {
		  click: (e) => {
			console.log(e)
		  },
		  marker: {
			position: [121.5273285, 31.21515044],
			events: {
			  click: (e) => {
				console.log(e)
			  },
			  dragend: (e) => {
				this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
			  }
			},
			visible: true,
			draggable: false
		  }
		}
	  },
	  options1: [],
	  options2: [],
	  options3: [],
	  province: '',
	  city: '',
	  area: '',
	};
  },
  components: {
	Editor
  },
  methods: {
	//   地图页面函数开始
	onSearchResult(pois) {
	  let latSum = 0;
	  let lngSum = 0;
	  console.log('1', pois)
	  if (pois.length > 0) {
		pois.forEach(poi => {
		  let {
			lng,
			lat
		  } = poi;
		  lngSum += lng;
		  latSum += lat;
		  this.markers[0].position = [poi.lng, poi.lat];
		});
		let center = {
		  lng: lngSum / pois.length,
		  lat: latSum / pois.length
		};
		this.center = [center.lng, center.lat];
		this.lng = center.lng
		this.lat = center.lat
	  }
	  let that = this
	  var geocoder = new AMap.Geocoder({
		radius: 1000,
		extensions: "all"
	  });
	  // console.log(geocoder)
	  geocoder.getAddress(that.center, function (status, result) {
		// console.log(result)
		if (status === 'complete' && result.info === 'OK') {
		  if (result && result.regeocode) {
			that.address = result.regeocode.formattedAddress;
			that.$nextTick();
		  }
		}
	  });

	},
	// 打开遮罩
	centerDialog(sub) {
	  if (sub == "sub") {
		// 打开的是商家遮罩
		this.suboraudit = true;
	  } else {
		this.suboraudit = false;
	  }
	  this.centerDialogVisible = true;
	},
	// 添加核销人
	active_find_add() {
	  if (this.forms.date1.indexOf(" ") != -1) {
		this.$message.info("您的检索条件含有空格！！");
		return;
	  }
	  this.forms.date1.replace(/\s/g, ""); // 清除字符串空格
	  this.page = 1;
	  this.flag = true;
	  Api.Show_vip_list({
		  keyword: this.forms.date1
		})
		.then(res => {
		  console.log("this.add_audit_list", res)
		  if (res.data.status == 1) {
			if (res.data.result.list != "") {
			  this.add_audit_list = res.data.result.list;
			}
		  } else {
			this.$Message.error(res.data.message)
		  }

		})
	},
	// 选择遮罩展示数据
	addsub(id) {
	  if (this.suboraudit) {
		// 选择商家
		if (this.Submanagearr != "") {
		  if (this.Submanagearr[0].id == id) {
			this.$message.success("您已选择该项!");
			return;
		  } else {
			this.Submanagearr.splice(0, 1);
			this.add_audit_list.forEach(ele => {
			  if (ele.id == id) {
				this.Submanagearr.push(ele);
				// this.form.pid=id
			  }

			});
			return;
		  }
		} else {
		  this.add_audit_list.forEach(ele => {
			if (ele.id == id) {
			  this.Submanagearr.push(ele);
			  // this.form.pid=id
			  // console.log('商家展示数组',this.Submanagearr)
			  // console.log('商家展示数组id',this.form.pid)

			}
		  });
		}
	  } else {
		let key = 0;
		// 选择核销人
		if (this.By_audit != "") {
		  this.By_audit.forEach(els => {
			if (els.id == id) {
			  key = 1;
			}
		  });
		  if (key == 1) {
			this.$message.success("您已选择该项!");
			return;
		  } else {
			this.add_audit_list.forEach(ele => {
			  if (ele.id == id) {
				this.By_audit.push(ele);
			  }
			});
			return;
		  }
		} else {
		  this.add_audit_list.forEach(ele => {
			if (ele.id == id) {
			  this.By_audit.push(ele);
			}
		  });
		}
	  }
	},
	// 删除遮罩以及核销人展示数组单项数据
	del(id) {
	  this.By_audit.forEach(el => {
		if (el.id == id) {
		  this.By_audit.splice(this.By_audit.indexOf(el), 1);
		}
	  });
	  this.Save_audit()
	},
	// 遮罩保存
	Save_audit() {
	  if (this.suboraudit) {
		// 选择商家
		this.Submanage = this.Submanagearr[0].nickname;
		this.form.pid = this.Submanagearr[0].id;
	  } else {
		// 选择核销人
		// this.By_audit.forEach(el=>{
		//   this.audit_people.push(el.id)
		// })
		// this.form.cancel=this.audit_people.join(',')
		let list = []
		this.audit_people = this.By_audit;
		console.log("核销用户shuzu", this.audit_people)
		this.audit_people.forEach(el => {
		  list.push(el.id);
		  console.log("核销用户", this.form.cancel)
		});
		this.form.cancel = list.join(',')
	  }
	  this.centerDialogVisible = false;
	},
	// 上传图片之前
	beforeAvatarUploadI(file) {
	  var that = this;
	  // 判断类型是不是图片
	  if (!/image\/\w+/.test(file.type)) {
		that.$message("请确保文件为图像类型");
		return false;
	  } else {
		var article_image, image_base64;
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function (e) {
		  image_base64 = this.result.split(",")[1];
		  article_image = image_base64;
		  var params = {
			  imgdata: article_image
		  }
		  that.$http
			.post(that.baseurl + "admin/index/imgbase64", params)
			.then(res => {
			  if (res.data.status == 1) {
				that.$message.success(res.data.message);
				// that.form.img_list.push({
				//   name: file.name,
				//   url: res.data.result.url,
				//   imgurl: res.data.result.path
				// });
				that.choose(that.val);
			  } else if (res.data.status == 0) {
				this.$message.error(res.data.result.message);
			  }
			})
			.catch(error => {});
		};
	  }
	  return false;
	},
	// 删除图片文件钩子
	handleRemove(file, fileList) {
	  this.form.img_list = fileList;
	},
	// 文件超出个数限制时的钩子
	onexceed(files, fileList) {
	  this.$message.warning("只能上传一张图片!");
	},
	// 上传音视频之前的钩子
	beforeUploadVideo(file) {
	  const isLt10M = file.size / 1024 / 1024 < 10;
	  if (
		[
		  "audio/mp3",
		  "audio/wav",
		  "video/mp4",
		  "video/ogg",
		  "video/flv",
		  "video/avi",
		  "video/wav",
		  "video/wmv",
		  "video/rmvb"
		].indexOf(file.type) != -1
	  ) {
		let formData = new FormData();
		formData.append("media", file);
		this.$http
		  .post(this.baseurl + `admin/index/upload_file`, formData)
		  .then(res => {
			this.videoForm.Video = res.data.result.url;
			this.form.video = res.data.result.path;
		  })
		  .catch(err => {
			console.log(err.data);
		  });
	  } else {
		this.$Message.error("请上传正确的视频格式");
		return false;
	  }
	  if (!isLt10M) {
		this.$Message.error("上传视频大小不能超过10MB哦!");
		return false;
	  }
	  return false;
	},
	// 视频上传成功的钩子
	handleVideoSuccess(res, file) {
	  this.videoFlag = false;
	  this.videoUploadPercent = 0;
	  if (res.status == 200) {
		this.videoForm.Video = res.data.uploadUrl;
	  } else {
		this.$Message.error("视频上传失败，请重新上传！");
	  }
	},
	// 上传进度钩子
	uploadVideoProcess(event, file, fileList) {
	  this.videoFlag = true;
	  this.videoUploadPercent = parseInt(file.percentage).toFixed(0);
	},
	// 返回
	goback() {
	  this.$router.go(-1);
	},
	// 商家类型数据请求
	Sub_class() {
	  Api.Sub_class({}).then(res => {
		if (res.data.status == 1) {
		  this.sub_cate = res.data.result.list;
		}
	  });
	},
	updatetype(cates) {
	  this.sub_cate.forEach(el => {
		if (el.cate_name == cates) {
		  this.form.cateId = el.id;
		}
	  });
	},
	// 提交
	submit() {
	  let imgbmp = [];
	  console.log("图片", this.form.img_list);
	  if (this.form.img_list.length >= 1) {
		this.form.upload_img = this.form.img_list.shift().imgurl;
	  }
	  console.log("upload_img", this.form.upload_img);
	  // return false;
	  this.form.img_list.forEach(item => {
		imgbmp.push(item.imgurl);
	  });
	  imgbmp = imgbmp.join(",");
	  this.form.upload_img1 = imgbmp
	  console.log("upload_img1", this.form.upload_img1);
	  let params = {};
	  if (this.uid) {
		// 是否接收到uid，判断修改还是新增
		//对地址进行处理
		if(!this.province || !this.city || !this.area || !this.smalladdress){
			if(this.address.indexOf('省') > 0){
				this.province = this.address.slice(0,this.address.indexOf('省'))
				var citys = this.address.slice(this.address.indexOf('省')+1)
			}
			if(citys){
				console.log(citys,'装逼吗？')
				this.city = citys.slice(0,citys.indexOf('市'))
				var areas = citys.slice(citys.indexOf('市')+1)
			}else{
				this.city = this.address.slice(0,this.address.indexOf('市'))
				var areas = this.address.slice(this.address.indexOf('市')+1)
			}
			if(areas){
				this.area = areas.slice(0,areas.indexOf('区'))
				var jd = areas.slice(areas.indexOf('区')+1)
			}else {
				this.area = this.address.slice(0,this.address.indexOf('区'))
				var jd = this.address.slice(this.address.indexOf('区')+1)
			}
			if(jd){
				console.log(jd,'装逼吗？')
				this.smalladdress = jd
			}else{
				this.smalladdress = this.address
			}
		}
		//上传图片
		let imgbmp1 = [];
		this.imglist1.forEach(item => {
			imgbmp1.push(item.imgurl);
		})
		// this.imgbmp1 = this.imgbmp1.join(",");
		params = {
		  id: this.uid,
		  mid: this.form.pid,
		  title: this.form.title,
		  present: this.form.intro,
		  displayorder: this.form.sortrank,
		  content: this.form.detail,
		  // thumb: this.form.upload_img,
			// thumbs: [this.form.upload_img1],
			//上传图片
			thumb: imgbmp1,
			thumbs: this.fincheckarr1,
		  name: this.form.linkman,
		  mobile: this.form.sub_phone,
		  address: this.address,
		  lng: this.lng,
		  lat: this.lat,
		  cate: this.form.cateId,
		  status: this.form.radio,
		  enabled: this.form.enabled,
		  video: this.form.video,
		  ids: this.form.cancel,
		  province: this.province,
		  city: this.city,
		  area: this.area,
			smalladdress: this.smalladdress,
			//上传图片

		};
		Api.Save_update_merchant(params)
		  .then(res => {
			if (res.data.status == 1) {
			  this.$message.success(res.data.message);
			  this.$router.push("/shop");
			} else {
			  this.$message.error(res.data.message);
			}
		  })
		  .catch(err => {
			this.$message.error(err.data.message);
		  });
	  } else {
		// {必填参数mid：用户id，title：标题，status：是否通过审核，cate：类型，displayorder：排序，数字越大越靠前，非必填参数displayorder：排序，数字越大越靠前，subtitle：简介，content：详情，thumb：多图第一张作为首图，thumbs：多图，name：联系人，mobile：电话，address：地址，views：浏览量，address：详细地址，lng：经度，lat：纬度，video：视频，ids：核销人，province，city，area(省、市、区)}
		let imgbmp1 = [];
		this.imglist1.forEach(item => {
			imgbmp1.push(item.imgurl);
		})
		// this.imgbmp1 = this.imgbmp1.join(",");
		params = {
		  mid: this.form.pid,
		  title: this.form.title,
		  present: this.form.intro,
		  displayorder: this.form.sortrank,
		  content: this.form.detail,
		  // thumb: this.form.upload_img,
		  // thumbs: [this.form.upload_img1],
			//上传图片
			thumb: imgbmp1,
			thumbs: this.fincheckarr1,
		  name: this.form.linkman,
		  mobile: this.form.sub_phone,
		  address: this.address,
		  lng: this.lng,
		  lat: this.lat,
		  cate: this.form.cateId,
		  status: this.form.radio,
		  enabled: this.form.enabled,
		  video: this.form.video,
		  ids: this.form.cancel,
		  province: this.province,
		  city: this.city,
		  area: this.area,
		  smalladdress: this.smalladdress,
		};
		Api.Add_merchant(params)
		  .then(res => {
			if (res.data.status == 1) {
			  this.$message.success(res.data.message);
			  this.$router.push("/shop");
			} else {
			  this.$message.error(res.data.message);
			}
		  })
		  .catch(err => {
			this.$message.error(err.data.message);
		  });
	  }
	},
	// 获取数据
	getinfo() {
	  this.form.img_list = [];
	  let that = this;
	  Api.Show_editor_merchant({
		id: this.uid
	  }).then(res => {
			console.log(res.data.result.info,'装逼第一步，装B')
		if (res.data.status == 1) {
		  this.address = res.data.result.info.alladdress;
		  this.form.pid = res.data.result.info.mid;
		  this.form.title = res.data.result.info.title;
		  this.form.intro = res.data.result.info.present;
		  this.form.sortrank = res.data.result.info.displayorder;
		  this.form.detail = res.data.result.info.content;
		  this.form.upload_img = res.data.result.info.thumb;
		  console.log("商家信息upload_img", this.form.upload_img);
		  this.form.upload_img1 = res.data.result.info.thumbs;
		  console.log("商家信息upload_img1", this.form.upload_img1);
		  this.form.linkman = res.data.result.info.name;
		  this.form.sub_phone = res.data.result.info.mobile;
		  this.address = res.data.result.info.alladdress;
		  this.form.cateId = res.data.result.info.cate;
		  this.form.enabled = parseInt(res.data.result.info.enabled);
		  this.form.cancel = res.data.result.info.ids
		  // center: [114.305208, 30.592921],
		  // lng: 114.305208,
		  // lat: 30.592921,
		  // markers: [{
		  //   position: [114.305208, 30.592921]
		  // }],
		  let position = [res.data.result.info.lng, res.data.result.info.lat];
		  this.center = position;
		  this.lng = res.data.result.info.lng;
		  this.lat = res.data.result.info.lat;
		  this.markers = [{
			position: position
		  }];
		  console.log(this.sub_cate,'装逼的第二步，不怕')
		//   this.sub_cate.forEach(el => {
		//     if (el.id == res.data.result.info.cate) {
		//       this.cates = el.cate_name;
		//     }
		//   });
		  this.form.radio = parseInt(res.data.result.info.status);
		  this.form.video = res.data.result.info.video;
		  if (res.data.result.info.id_user) {
			this.audit_people = res.data.result.info.id_user;
		  }
		  this.Submanage = res.data.result.info.id_user[0].nickname;

		}
	  });
	}
	,
	choose(val){   //点击上传，弹出上传框
		this.val = val;
        this.nowcheckarr = [];
		this.dialogVisibleI = true;
		this.$http.post(this.api+'admin/active/image',{
			page: this.currentPage,
			limit: 10
		}).then(res => {
			if(res.data.status == 1) {
				this.imgarr = res.data.result.list;				
				this.imgarr.forEach(item =>  {
					item.check = false;
					item.value = val;
				});
				this.imgtotal = +res.data.result.total;
			}
		})
	},
	handleCurrentChange(val) {   //翻页按钮
		this.currentPage = val;
		this.choose(this.currentPage);
	},
	checkok(item){   //选中图片库的图片
		if(!item.check){
			item.check = true;
			this.imgarr[this.imgarr.findIndex(it => it.id == item.id)].check = true;
			this.imgarr = Object.assign([],this.imgarr);
			this.nowcheckarr.push(item);
		}else {
			item.check = false;
			this.imgarr[
				this.imgarr.findIndex(it => it.id == item.id)
			].check = false;
			this.imgarr = Object.assign([], this.imgarr);
			this.nowcheckarr.splice(
			  this.nowcheckarr.findIndex(ele => ele.id == item.id),
			  
			);

		}
	},
	putindex(val) {    //将图片从图片导出来
		let that = this;
		if(val == 1) {
			this.dialogVisibleI = false;
			if(this.fincheckarr.length == 0){
				this.nowcheckarr.forEach(el=>{					
					this.fincheckarr.push(el)
				})
			}else{			
				this.fincheckarr = this.fincheckarr.concat(this.nowcheckarr);
			}
		}else if(val == 2){
            this.dialogVisibleI = false;
            if(this.fincheckarr1.length==0){
              this.nowcheckarr.forEach(el=>{
                this.fincheckarr1.push(el)
              })
            }else{
              this.fincheckarr1 = this.fincheckarr1.concat(this.nowcheckarr);
            }
		}

	},
	closeDig(){   //取消导入图片
        this.nowcheckarr = [];
        this.dialogVisibleI = false;
	},
	deleteSYimg(item){   //删除头部导入照片
		
        this.fincheckarr.splice(
			this.fincheckarr.findIndex(it => it.id == item.id),1
		  );
	},
	deleteWYimg(item) {  //删除尾部导入照片
	  this.fincheckarr1.splice(
		  this.fincheckarr1.findIndex(it => it.id == item.id),1
	  );
	},
	handlePictureCardPreview1(file){  //点击上传文件的钩子
        this.dialogImageUrl1 = file.url;
        this.dialogVisible1 = true;
	},
	beforeRemove1(file, fileList) {  //移出文件
	  return this.$confirm(`确定移除 ${file.name}？`);
	},
	handleRemove1(file, fileList) {
	  this.imglist1 = fileList;
	},
	uploadSuccess1(response, file, fileList) {  // 上传成功
	  this.$message.success("上传成功");
	},
	beforeAvatarUpload1(file){
		var that = this;
        // 判断类型是不是图片
        if (!/image\/\w+/.test(file.type)) {
          that.$message("请确保文件为图像类型");
          return false;
        } else {
			var article_image, image_base64;
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function (e) {
			  image_base64 = this.result.split(",")[1];
			  article_image = image_base64;
			  that.$http
				.post(that.baseurl + "admin/index/imgbase64", {
				  imgdata: article_image
				})
				.then(res => {
					if (res.data.status == 1) {
					  that.imglist1.push({
						name: file.name,
						url: res.data.result.url,
						imgurl: res.data.result.path
					  });
					  that.$message.success(res.data.message);
					}else if (res.data.status == 0) {
						this.$message.error(res.data.result.message);
					}
				}).catch(error => {});
			}
		}
	},
  },
  created() {
	this.Sub_class();
	this.baseurl = Api.url;
	this.uid = this.$route.query.pid;
	if (this.uid) {
	  // 商家类型数组列表请求回数据再请求所有数据
	  console.log('都让开，开始装个逼，准备拿数据了')
	  setTimeout(this.getinfo(this.uid), 500);
	}
  }
};
