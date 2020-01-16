<template>
  <div class="ccia">
    <div class="add_top">
      <router-link to="/active">
        <div class="add_topBtn">
          <el-button type="primary"><i class="el-icon-arrow-left"></i>返回列表</el-button>
        </div>
      </router-link>
    </div>
    <div class="add_con">
      <el-form ref="info" :model="info">
        <el-form-item label="选择地区">
          <el-select v-model="info.province" clearable placeholder="请选择" @change="changepro">
            <el-option v-for="(proItem,index) in prolist" :key="index" :label="proItem.name" :value="proItem.code">
            </el-option>
          </el-select>
          <el-select v-model="info.city" clearable placeholder="请选择" @change="changecity">
            <el-option v-for="(cityItem,index) in citylist" :key="index" :label="cityItem.name" :value="cityItem.code">
            </el-option>
          </el-select>
          <el-select v-model="info.area" clearable placeholder="请选择" @change="changeArea">
            <el-option v-for="(areaItem,index) in arealist" :key="index" :label="areaItem.name" :value="areaItem.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排名" class="add_conInp">
          <el-input type="text" v-model="info.displayorder"></el-input>
          <p style="margin-top: -10px;">数字越大，排名越靠前</p>
        </el-form-item>
        <el-form-item label="标题" class="add_conInp">
          <el-input type="text" v-model="info.title"></el-input>
        </el-form-item>
        <el-form-item label="简介" class="add_conInp">
          <el-input type="text" v-model="info.subtitle"></el-input>
        </el-form-item>

        <el-form-item label='首页头部图' class="add_conInp" >
          <el-input placeholder="上传单张图片" disabled>
              <template slot="append">
                  <el-button @click="choose(1)">选择图片</el-button>
              </template>
          </el-input>
          <p>首页头部图(可传多张)</p>
          <ul class="nowphoto">
              <li v-for="(item,index) in fincheckarr" :key="index">
                  <img :src="item.url">
                  <i @click="deleteSYimg(item)"></i>
					        <el-button @click="choImgShop(item)">选择跳转链接</el-button>
              </li>
          </ul>
        </el-form-item>

        <el-form-item label='首页尾部图' class="add_conInp">
          <el-input placeholder="上传单张图片" disabled>
              <template slot="append">
                  <el-button @click="choose(2)">选择图片</el-button>
              </template>
          </el-input>
          <p>首页活动尾部宣传图(可传多张)</p>
          <ul class="nowphoto">
              <li v-for="(item,index) in fincheckarr1" :key="index">
                  <img :src="item.url">
                  <i @click="deleteWYimg(item)"></i>
                  <el-button @click="choImgShop(item)">选择跳转链接</el-button>
              </li>
          </ul>
        </el-form-item>

        <el-form-item label="活动主图" class="add_conInp">
          <el-upload :action="baseurl+'admin/index/imgbase64'" list-type="picture-card"
            :on-preview="handlePictureCardPreview1" :before-remove="beforeRemove1" :on-remove="handleRemove1"
            :file-list="imglist1" :on-success="uploadSuccess1" :before-upload="beforeAvatarUpload1" :limit="1"
            :on-exceed="onexceed1">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible1">
            <img width="100%" :src="dialogImageUrl1" alt="">
          </el-dialog>
          <p style="color:#666666">推荐尺寸: (375X434)</p>
        </el-form-item>
        <el-form-item label="门店地址" class="content_top map">
          <div>
            <el-input v-model="address" style="width:100%;" placeholder="请在搜索框中搜索或地图上选取位置"></el-input>
            <div class="content_map">
              <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult">
              </el-amap-search-box>
              <el-amap vid="amapDemo" :amap-manager="amapManager" class="amap-demo" :zoom="zoom" :events="events"
                :center="center">
                <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index"
                  :icon="marker.icon" :events="marker.events" :title="marker.title" :vid="index">
                </el-amap-marker>
              </el-amap>
            </div>
          </div>
          <span style="margin-top:50px;font-size:12px;color:white;">经度：{{ lng }}, 纬度：{{ lat }} 地址:{{address}} </span>
        </el-form-item>
        <el-form-item label="详情" class="add_conTextarea">
          <!-- <el-input
                type="textarea"
                v-model="info.content"
                ></el-input> -->
          <Editor v-model="info.content" :t_value="info.content" class="editorclass"> </Editor>
        </el-form-item>
        <el-form-item label="活动预热时间">
          <el-col :span="23">
            <el-date-picker v-model="info.preselltime" type="datetime" placeholder="选择日期时间" style="width: 100%;"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-col>
          <!-- <el-col class="line" :span="2" style="width: 5%!important;margin-left:15px;">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="info.preheatendtime" type="datetime" placeholder="选择日期时间" style="width: 100%;"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-col> -->
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker v-model="info.starttime" type="datetime" placeholder="选择日期时间" style="width: 100%;"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="width: 5%!important;margin-left:15px;">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="info.endtime" type="datetime" placeholder="选择日期时间" style="width: 100%;"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <!-- 背景音乐注释开始 -->
        <!-- <el-form-item label="背景音乐" class="add_conBackmusic">
          <el-upload :action="baseurl+`admin/index/upload_file`" :show-file-list="false"
            :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo" :on-progress="uploadVideoProcess">
            <el-input placeholder="上传背景音乐">
              <template slot="append">
                <el-button size="small" type="primary">上传音乐</el-button>
              </template>
            </el-input> -->
              <!-- <el-progress type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress> 不解开注释-->
          <!-- </el-upload>
          <audio v-if="info.audio_url !='' " class="avatar" controls="controls" :src="info.audio_url">您的浏览器不支持播放</audio> -->
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> 不解开注释-->    
        <!-- </el-form-item> -->
        <!-- 背景音乐注释结束 -->
        <el-form-item label="分享海报背景图" class="add_conInp">
          <el-upload :action="baseurl+'admin/index/imgbase64'" list-type="picture-card"
            :on-preview="handlePictureCardPreview2" :before-remove="beforeRemove2" :on-remove="handleRemove2"
            :file-list="imglist2" :on-success="uploadSuccess2" :before-upload="beforeAvatarUpload2" :limit="1"
            :on-exceed="onexceed2">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible2">
            <img width="100%" :src="dialogImageUrl2" alt="">
          </el-dialog>
          <p style="color:#666666">推荐尺寸: (375X667)</p>
        </el-form-item>
        <!-- 活动列表展示风格注释开始 -->
        <!-- <el-form-item label="活动列表展示风格"> -->
          <!-- <el-input type="text" v-model="actPeoNum"></el-input> 不解开注释-->
          <!-- <el-radio-group v-model="info.style" class="activeStyle">
            <el-radio label="1">
              <div>
                <p>活动列表风格1</p>
                <img src="../../../../static/images/actStyle1.png" alt="">
              </div>
            </el-radio>
            <el-radio label="2">
              <div>
                <p>活动列表风格2</p>
                <img src="../../../../static/images/actStyle2.png" alt="">
              </div>
            </el-radio>
            <el-radio label="3">
              <div>
                <p>活动列表风格3</p>
                <img src="../../../../static/images/actStyle3.png" alt="">
              </div>
            </el-radio>
            <el-radio label="4">
              <div>
                <p>活动列表风格4</p>
                <img src="../../../../static/images/actStyle4.png" alt="">
              </div>
            </el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- 活动列表展示风格注释结束 -->
        <el-form-item label="参与商家" class="add_conInp">
          <el-input placeholder="参与商家" disabled>
            <template slot="append">
              <el-button @click="choShop">选择商家</el-button>
            </template>
          </el-input>
          <p>提示：请选择活动关联商家</p>
          <ul class="choShopName" v-if="checkShopList.length>0">
            <li v-for="(item,index) in checkShopList" :key="index">
              <p style="margin-left:10px">{{item.title}}
                <i class="el-icon-circle-close-outline" @click="deleteShop(item)"></i>
              </p>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="设置免单卡" class="add_conInp">
          <el-input placeholder="设置免单卡" disabled>
            <template slot="append">
              <el-button @click="choCard">选择免单卡</el-button>
            </template>
          </el-input>
          <p>提示：请选择活动关联商家</p>
          <div class="choCardImg" v-if='info.ctitle'>
            <p style="margin-left:10px">{{info.ctitle}}<i class="el-icon-circle-close-outline" @click="deleteImg"></i>
            </p>
          </div>
          <!-- <ul class="choCardImg" >
                <li
                    v-for="(item,index) in checkCardList"
                    :key="index"
                >
                    <img :src="item.thumb">
                    <i
                    class="el-icon-circle-close-outline"
                    @click="deleteImg(item)"
                    ></i>
                </li>
                </ul> -->
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="info.status">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="primaryBtn">提交</el-button>
          <el-button @click="goback">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 选择商家弹出框-->
    <el-dialog title="选择参与商家" :visible.sync="dialogVisibleS" width="60%">
      <el-input v-model="keyword">
        <el-button slot="append" icon="el-icon-search" @click="searchShop"></el-button>
      </el-input>
      <el-table :data="choShopList">
        <el-table-column label="商家" width="250">
          <template slot-scope="scope">
            <img style="width:80px;height:50px;" :src="scope.row.thumb">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" property="name" width="250"></el-table-column>
        <el-table-column label="电话" property="mobile"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="chooseShop(scope.row)" type="text" size="small">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <el-pagination background @current-change="handleCurrentChangeS" :current-page="pageS" :page-size="limit"
          layout="total,prev,pager,next,jumper" :total="totalS">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 选择免单卡 -->
    <el-dialog title="选择免单卡" :visible.sync="dialogVisibleC" width="60%">
      <el-input v-model="keywordC">
        <el-button slot="append" icon="el-icon-search" @click="searchCard"></el-button>
      </el-input>
      <el-table :data="choCardList">
        <el-table-column label="免单卡" width="250" prop="title"></el-table-column>
        <el-table-column label="图片" width="250">
          <template slot-scope="scope" class="dialogCImg">
            <img :src="scope.row.thumb">
          </template>
        </el-table-column>
        <el-table-column label="活动名称" property="active"></el-table-column>
        <el-table-column label="价钱" property="price"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="chooseCard(scope.row)" type="text" size="small">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <el-pagination background @current-change="handleCurrentChangeC" :current-page="pageC" :page-size="limit"
          layout="total,prev,pager,next,jumper" :total="totalC">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelC">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加图片弹出层 -->
      <div class="tg_box">
          <el-dialog class="tg_chooseimg" title="选择图片" :visible.sync="dialogVisibleI">
              <div class="photoTop clearfix">
                  <div style="float:left">平台图片</div>
                  <div style="float:right">
                      <el-upload class="upload-demo" :action="baseurl+'admin/index/imgbase64'" multiple :file-list="fileList1" :before-upload="beforeAvatarUploadI">
                          <el-button size="small" type="primary">点击上传</el-button>
                          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                      </el-upload>
                  </div>
              </div>
              <ul class="photoBox clearfix">
                  <li v-for="(item,index) in imgarr" :key="index" :class="item.check?'checkclass':''" @click="checkok(item)">
                      <img :src="item.url">
                  </li>
              </ul>
              <el-pagination background layout="total,prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :total="imgtotal">
              </el-pagination>
              <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="putindex(val)">确 定</el-button>
                  <el-button @click="closeDig">取 消</el-button>
              </div>
          </el-dialog>
          <!-- <div>
              <ul class="nowphoto">
                  <li v-for="(item,index) in fincheckarr" :key="index">
                      <img :src="item.url_show">
                      <i @click="deleteimg(item)"></i>
                  </li>
              </ul>
          </div> -->
      </div>
      <!-- 选择商家弹出框-->
    <el-dialog title="选择参与商家" :visible.sync="dialogVisibleSYImgS" width="60%">
      <el-input v-model="keyword">
        <el-button slot="append" icon="el-icon-search" @click="searchShop"></el-button>
      </el-input>
      <el-table :data="choShopList">
        <el-table-column label="商家" width="250">
          <template slot-scope="scope">
            <img style="width:80px;height:50px;" :src="scope.row.thumb">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" property="name" width="250"></el-table-column>
        <el-table-column label="电话" property="mobile"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="chooseImgShop(scope.row)" type="text" size="small">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <el-pagination background @current-change="handleCurrentChangeS" :current-page="pageS" :page-size="limit"
          layout="total,prev,pager,next,jumper" :total="totalS">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Api
  } from "../../../APi/WEBPC/index";
  import VueAMap from 'vue-amap'; //地图
  import Editor from "../editor"

  let amapManager = new VueAMap.AMapManager();
  export default {
    data() {
      let self = this;
      return {
        mid: this.$route.params.id, // 判断新增还是修改字段
        prolist: [], //省
        citylist: [], //市
        arealist: [], //区
        info: {
          area: "", //区编号
          audio: "", //音频
          cid: "",
          city: "", //市编号
          content: "", //详情
          createtime: "",
          cthumb: "",
          ctitle: "",
          displayorder: "", //排序，数字越大越靠前
          endtime: "", //结束时间
          goodsid: "", //会员卡id
          id: "",
          ishot: "",
          merch: [],
          merchids: "", //商家ids
          pic: "", //	海报背景
          province: "", //省编号
          preselltime: '',  //预热开始时间
          starttime: "", //开始时间
          status: "", //是否通过审核
          status_text: "",
          style: "", //活动列表展示风格
          subtitle: "", //简介
          thumb: "", //图片
          title: "", //标题
          total: "",
          uniacid: "",
          views: "", //浏览量
          img_list: [], // 图片上传文件夹
          upload_img: "", // 图片显示地址
          upload_img1: "", // 图片显示地址
          img_list2: [], // 图片上传文件夹
          upload_img2: "", // 图片显示地址
          upload_img2: "", // 图片显示地址
          lng: '',
          lat: '',
          province_name: '',  //城市名称
          city_name:'',   //市级名称
          area_name: '',  //区级名称
          smalladdress: '',  //街道地址
          province_map: '',   //格式湖北省
          city_map: '',   //格式武汉市
          area_map: '',   //格式洪山区
        },
        // code:0,//省份状态码
        // codeC:'',//城市状态码

        audioUploadPercent: '', // 音频大小
        audioFlag: '', //  上传进度
        audioForm: { // 音频对象
          Audio: "", // 音频地址
        },

        baseurl: "",
        imglist1: [], //上传图片文件夹
        dialogVisible1: false,
        dialogImageUrl1: "",
        imglist2: [], //上传图片文件夹
        dialogVisible2: false,
        dialogImageUrl2: "",

        limit: 5,
        pageS: 1,
        dialogVisibleS: false, //选择商家及免单卡弹框
        choShopList: [],
        totalS: "",
        checkShopList: [],
        keyword: "",

        dialogVisibleC: false,
        choCardList: [],
        pageC: 1,
        totalC: "",
        keywordC: "",

        dialogVisibleSYImgS:false,
        dialogVisibleI: false,//选择首页头部图
        fileList1: [],
        currentPage: 1,
        imgtotal: 0,
        imgarr: [],//数据库所有的图片
        imgshowarr: [],
        nowcheckarr: [],//弹框选中时选中的图片
        fincheckarr: [],//选中的图片
        fincheckarr1:[],
        xzSHIMG:"",
        xzSHIMGval:'',

        // checkCardList: [],
        //   地图字段
        amapManager,
        zoom: 12,
        address: '',
        inputaddress: '',
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
            console.log('ok大ok')
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
                  self.info.province_map = result.regeocode.addressComponent.province
                  self.info.city_map = result.regeocode.addressComponent.city
                  self.info.area_map = result.regeocode.addressComponent.district
                  let indexs = result.regeocode.formattedAddress.indexOf('区');
                  self.info.smalladdress = result.regeocode.formattedAddress.slice(indexs+1);
                  // console.log('高德地图',result.regeocode)
                  // console.log('addresslnglat', self.info.smalladdress)
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
      //地图页面函数开始
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
              console.log(result.regeocode,'地洛索洛芬')
              that.$nextTick();
            }
          }
        });
      },
      onSubmit() {
        console.log(this.info.status);
        let imgbmp1 = [];
        let imgbmp2 = [];
        // let head_image = [];
        // let foot_image = [];
        this.imglist1.forEach(item => {
          imgbmp1.push(item.imgurl);
        });
        this.imglist2.forEach(item => {
          imgbmp2.push(item.imgurl);
        });
        this.info.thumb = imgbmp1.join(",");
        this.info.pic = imgbmp2.join(",");
        this.info.head_image=this.fincheckarr
        this.info.foot_image=this.fincheckarr1
        this.info.lng = this.lng;
        this.info.lat = this.lat;
        //console.log(this.info)
        if (this.mid != "" && !isNaN(this.mid)) {
          // console.log(222)
          //提交修改活动
          this.$http.post("/admin/active/update", this.info).then(res => {
            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
              this.goback()
            } else {
              this.$Message.error(res.data.message);
            }
          }).catch(err => {
            this.$Message.error(err.data.message);
          });
        } else {
          //提交活动
          this.$http.post("/admin/active/save", this.info).then(res => {

            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
              this.goback()
            } else {
              this.$Message.error(res.data.message);
            }

          }).catch(err => {
            this.$Message.error(err.data.message);
          });
        }
      },
      //活动信息
      getActive() {
        // if (this.mid != "" && !isNaN(this.mid)) {
        this.$http
          .post("/admin/active/edit", {
            id: this.mid
          })
          .then(res => {
            console.log("获取信息", res);
            if (res.data.status == 1) {
              this.info = res.data.result.info;
              this.imglist1 = [{
                name: "图片",
                url: this.info.thumb_url,
                imgurl: this.info.thumb
              }];
              this.imglist2 = [{
                name: "图片",
                url: this.info.pic_url,
                imgurl: this.info.pic
              }];
              this.getsheng(1, 0)
              this.getsheng(2, this.info.province)
              this.getsheng(3, this.info.city)
              // this.getsheng(2,0)
              this.info.merch.forEach((item, index) => {
                this.checkShopList.push(item);
              });
               let position=[res.data.result.info.lng,res.data.result.info.lat];
                this.center=position;
                 this.lng=res.data.result.info.lng;
                this.lat=res.data.result.info.lat;
              this.markers = [{
                position: position
              }];
              if(this.info.head_image==""){
                this.fincheckarr=[]
              }else{
                this.fincheckarr=this.info.head_image
              }
              if(this.info.foot_image==""){
                this.fincheckarr1=[]
              }else{
                this.fincheckarr1=this.info.foot_image
              }
              // this.checkCardList.push(this.info.cthumb)
            }
          });
        // }
      },
      getsheng(type, code) {
        this.$http.post("/admin/index/get_lower_address", {
            code: code
          })
          .then(res => {
            // console.log(res,'getsheng');
            if (type == 1) {
              // console.log('省列表')
              this.prolist = res.data.result.list
            } else if (type == 2) {
              // console.log('市列表')
              this.citylist = res.data.result.list
            } else if (type == 3) {
              // console.log('区列表')
              this.arealist = res.data.result.list
            }
          });
      },
      //编号转换区域名
      searchName(type,code){
        if(type == 1) {
          // console.log(this.prolist,'1',code);
          this.handleSearch(this.prolist,code,type)
        }else if(type == 2) {
          // console.log(this.citylist,'2',code);
          this.handleSearch(this.citylist,code,type)
        }else if(type == 3) {
          // console.log(this.arealist,'3',code);
          this.handleSearch(this.arealist,code,type)
        }
      },
      //编号转化名称处理
      handleSearch(val,code,type){
        var that = this;
        val.map(function(item){
          if(item.code == code) {
            if(type == 1) {
              that.info.province_name = item.name
            }else if(type == 2) {
              that.info.city_name = item.name
            }else if(type == 3) {
              that.info.area_name = item.name
            }
          }
        })
      },
      //触发区级编号转换名称
      changeArea(val){
        this.searchName(3,val)
      },
      //获取省市列表集合
      changepro(val) {
        // 省级获取数据
        console.log("省", val);
        this.info.province = val
        this.getsheng(2, val)
        this.searchName(1,val)
      },
      changecity(val) {
        this.info.city = val
        this.getsheng(3, val)
        this.searchName(2,val)
      },
      //选择商家
      choShop() {
        this.$http
          .post("/admin/merch/index1", {
            status: 1,
            keyword: this.keyword,
            limit: this.limit,
            page: this.pageS,
          })
          .then(res => {
            this.dialogVisibleS = true;
            //console.log(res)
            if (res.data.status == 1) {
              console.log("123", res)
              this.choShopList = res.data.result.list;
              this.totalS = +res.data.result.total;
            }
          });
      },
      searchShop() {
        this.choShop();
      },
      chooseShop(row) {
        let c = 0;
        this.info.merch.forEach(element => {
          if (element.id == row.id) {
            this.$Message.info("您已选中！");
            c = 1
          }
        });
        if (c == 0) {
          this.info.merch.push(row)
          let checkShopIdList = [];
          this.info.merch.forEach(element => {
            checkShopIdList.push(element.id);
          });
          this.info.merchids = checkShopIdList.join(",");
          this.checkShopList = this.info.merch;
          console.log(this.info.merchids);
          console.log(this.info.merch);
        }
      },
      deleteShop(item) {
        this.info.merch.splice(
          this.info.merch.findIndex(it =>
            it.id == item.id ? item.id : item.index
          ),
          1
        );
        let checkShopIdList = [];
        for (let itemId of this.info.merch) {
          checkShopIdList.push(itemId.id);
        }
        this.info.merchids = checkShopIdList.join(",");
        console.log(this.info.merchids);
      },
      cancel() {
        this.keyword = "";
        this.dialogVisibleS = false;
      },
      handleCurrentChangeS(val) {
        this.pageS = val;
        this.choShop();
      },

      //设置免单卡
      choCard() {
        this.$http.post("/admin/card/index", {
          status: 1,
          keyword: this.keywordC,
          limit: this.limit,
          page: this.pageC,
        }).then(res => {
          this.dialogVisibleC = true;
          if (res.data.status == 1) {
            this.choCardList = res.data.result.list;
            this.totalC = +res.data.result.total;
            console.log(this.choCardList);
          }
        });
      },
      chooseCard(row) {
        this.info.goodsid = row.id;
        this.info.ctitle = row.title;
        // console.log(this.info.cid);
        // console.log(this.info.ctitle);

      },
      searchCard() {
        this.choCard()
      },
      deleteImg() {
        this.info.cid = '';
        this.info.ctitle = '';
      },
      cancelC() {
        this.keywordC = "";
        this.dialogVisibleC = false;
      },
      handleCurrentChangeC(val) {
        this.pageC = val;
        this.choCard();
      },
      // 上传音视频之前的钩子
      beforeUploadVideo(file) {
        let that = this;
        const isLt10M = file.size / 1024 / 1024 < 10;
        if ([
            "audio/mp3",
            "audio/wav",
            "video/mp4",
            "video/ogg",
            "video/flv",
            "video/avi",
            "video/wav",
            "video/wmv",
            "video/rmvb"
          ].indexOf(file.type) != -1) {
          let formData = new FormData(); //formData里面存储的数据是以健值对的形式存在的，key是唯一的，一个key可能对应多个value。
          formData.append('media', file)
          // console.log(formData);
          this.$http.post(this.baseurl + `admin/index/upload_file`, formData).then(res => {
            console.log("音乐", res)
            console.log("音乐1", res.data.result.url)
            console.log("音乐2", res.data.result.path)
            this.info.audio_url = res.data.result.url
            this.info.audio = res.data.result.path
            // console.log("音乐1234",this.audioForm.Audio);
          }).catch(err => {

          })
        } else {
          this.$Message.error("请上传正确的音频格式");
          return false;
        }
        if (!isLt10M) {
          this.$Message.error("上传音频大小不能超过10MB哦!");
          return false;
        }
        return false;
      },
      // 视频上传成功的钩子
      handleVideoSuccess(res, file) {
        // this.videoFlag = false;
        // this.videoUploadPercent = 0;
        if (res.status == 200) {
          console.log("上传成功", res);
          this.audioForm.Audio = res.data.uploadUrl;
        } else {
          this.$Message.error('视频上传失败，请重新上传！');
        }
      },
      // 上传进度钩子
      uploadVideoProcess(event, file, fileList) {
        // this.audioFlag = true;
        // this.audioUploadPercent = file.percentage.toFixed(0);
      },
      //图片
      // 删除文件钩子
      handleRemove1(file, fileList) {
        this.imglist1 = fileList;

      },
      handleRemove2(file, fileList) {
        this.imglist2 = fileList;
      },
      // 点击上传的文件的钩子
      handlePictureCardPreview1(file) {
        this.dialogImageUrl1 = file.url;
        this.dialogVisible1 = true;
      },
      handlePictureCardPreview2(file) {
        this.dialogImageUrl2 = file.url;
        this.dialogVisible2 = true;
      },
      beforeRemove1(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      beforeRemove2(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      onexceed1(files, fileList) {
        this.$message.warning("只能上传一张图片!");
      },
      onexceed2(files, fileList) {
        this.$message.warning("只能上传一张图片!");
      },
      // 上传成功
      uploadSuccess1(response, file, fileList) {
        this.$message.success("上传成功");
      },
      uploadSuccess2(response, file, fileList) {
        this.$message.success("上传成功");
      },
      // 上传之前
      beforeAvatarUpload1(file) {
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
                console.log("5555555555555555", res)
                if (res.data.status == 1) {
                  that.imglist1.push({
                    name: file.name,
                    url: res.data.result.url,
                    imgurl: res.data.result.path
                  });
                  that.$message.success(res.data.message);
                } else if (res.data.status == 0) {
                  this.$message.error(res.data.result.message);
                }
              })
              .catch(error => {});
          };
        }
      },
      beforeAvatarUpload2(file) {
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
                  that.imglist2.push({
                    name: file.name,
                    url: res.data.result.url,
                    imgurl: res.data.result.path
                  });
                  that.$message.success(res.data.message);
                } else if (res.data.status == 0) {
                  this.$message.error(res.data.result.message);
                }
              })
              .catch(error => {});
          };
        }
      },
      goback() {
        this.$router.go(-1)
      },

      // 上传图片
      checkok(item) {
        console.log("item",item)
        // console.log(!item.check)
        if (!item.check) {
          if(this.nowcheckarr.length > 8){
            return ;
          }
          item.check = true;
          this.imgarr[this.imgarr.findIndex(it => it.id == item.id)].check = true;
          this.imgarr = Object.assign([], this.imgarr);
          this.nowcheckarr.push(item);
          console.log("this.nowcheckarr",this.nowcheckarr.length)
          console.log("this.nowcheckarrcheckok",typeof(this.nowcheckarr))   //object
        } else {
          if(this.nowcheckarr.length > 9){
            return ;
          }
          item.check = false;
          this.imgarr[
            this.imgarr.findIndex(it => it.id == item.id)
          ].check = false;
          this.imgarr = Object.assign([], this.imgarr);
          this.nowcheckarr.splice(
            this.nowcheckarr.findIndex(ele => ele.id == item.id),
            1
          );
          console.log("this.nowcheckarr",this.nowcheckarr.length)
        }
      },
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
          reader.onload = function(e) {
            image_base64 = this.result.split(",")[1];
            article_image = image_base64;
            var params = {
              imgdata: article_image
            };
            // console.log(params)
            that.$http
              .post(that.api + "admin/index/imgbase64", params)
              .then(res => {
              //   console.log(res);
                if (res.data.status == 1) {
                  that.$message.success(res.data.message);
                  // console.log(that.val)
                  that.choose(that.val);
                } else if (res.data.status == 0) {
                  that.$message.error(res.data.message);
                }
              })
              .catch(error => {});
          };
        }
      },
      choose(val) {
        this.val = val
        this.nowcheckarr = [];
        this.dialogVisibleI = true;
        this.$http
          .post(this.api + "admin/active/image", {
            page: this.currentPage,
            limit: 10
          })
          .then(res => {
          //   console.log(res);
            if (res.data.status == 1) {
              this.imgarr = res.data.result.list;
              this.imgarr.forEach(item => {
                item.check = false;
                item.value = val 
              });
              // console.log(this.imgarr);
              this.imgtotal = +res.data.result.total;
            }
          });
      },
      choImgShop(item){
        this.xzSHIMG=item
        this.xzSHIMGval=item.value
        console.log("this.xzSHIMG.id",this.xzSHIMG.id)
        console.log("this.xzSHIMG.value",this.xzSHIMG.value)
        this.$http
          .post("/admin/merch/index1", {
            status: 1,
            keyword: this.keyword,
            limit: this.limit,
            page: this.pageS,
          })
          .then(res => {
            this.dialogVisibleSYImgS = true;
            //console.log(res)
            if (res.data.status == 1) {
              // console.log("123", res)
              this.choShopList = res.data.result.list;
              this.totalS = +res.data.result.total;
            }
          });
      },
      chooseImgShop(row) {
        // console.log("row.val",row)
          if(this.xzSHIMGval == 1){
            // console.log("row.val1",this.xzSHIMGval)
            this.fincheckarr.forEach(el=>{
              // console.log("123")
              // console.log("el.id",el.id)
              // console.log("this.xzSHIMG.id",this.xzSHIMG.id)
              if(el.id==this.xzSHIMG.id){
                // console.log("456")
                this.$set(el,'shopId',row.id)
                // console.log("this.fincheckarr",this.fincheckarr)
              }
            })
          }else if(this.xzSHIMGval == 2){
              this.fincheckarr1.forEach(el=>{
              // console.log("123")
              // console.log("el.id",el.id)
              // console.log("this.xzSHIMG.id",this.xzSHIMG.id)
              if(el.id==this.xzSHIMG.id){
                // console.log("456")
                this.$set(el,'shopId',row.id)
                // console.log("this.fincheckarr",this.fincheckarr)
              }
            })
          }
      },
      closeDig() {
        this.nowcheckarr = [];
        this.dialogVisibleI = false;
      },
      putindex(val) {
        let that=this
        console.log("点击选择图片之后",val)
        if(val == 1){
            this.dialogVisibleI = false;
            // console.log('this.fincheckarrputindexlength',this.fincheckarr.length)
            if(this.fincheckarr.length==0){
              // console.log(typeof(this.nowcheckarr))  //object
              // console.log(typeof(this.fincheckarr))   //string
              this.nowcheckarr.forEach(el=>{
                // console.log("el",el)
                this.fincheckarr.push(el)
                // console.log('this.fincheckarrput',this.fincheckarr)
                // console.log(typeof(this.fincheckarr.join('')))  //object
              })
              // console.log('this.fincheckarrputindex',this.fincheckarr)
            }else{
              this.fincheckarr = this.fincheckarr.concat(this.nowcheckarr);
            }
            // this.fincheckarr = this.fincheckarr.concat(this.nowcheckarr);
            
            // this.addFoodInfo.goods_defaultimg = this.fincheckarr[0].url
            // console.log(this.fincheckarr)
            // console.log(this.addFoodInfo.goods_defaultimg,'单图')
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
      deleteSYimg(item) {
        this.fincheckarr.splice(
          this.fincheckarr.findIndex(it => it.id == item.id),1
        );
        console.log("删除掉的",this.fincheckarr)
      },
      deleteWYimg(item) {
        this.fincheckarr1.splice(
            this.fincheckarr1.findIndex(it => it.id == item.id),1
        );
        console,log("删除掉的",this.fincheckarr1)
        // let delimgList = []
        // for(let item of this.fincheckarr1) {
        //     delimgList.push(item.url)
        // }
        // this.addFoodInfo.imgs = delimgList.join(',')
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.choose(this.val);
      }
    },

    computed: {},

    created() {
      console.log("我进来了")
      if (this.mid) {
        this.getActive();
        console.log("我进来了修改")
        console.log("1111",typeof(this.fincheckarr)) 
      } else {
        this.getsheng(1, 0)
        console.log("我进来了添加")
      }
      this.baseurl = Api.url;

    },
    mounted() {},

    watch: {}
  };

</script>
<style lang='less' scoped>
  .ccia {
    padding: 0 10px 39px 0;

    .add_top {
      padding: 20px 0;
      border-bottom: 1px solid #edecec;

      .add_topBtn {
        text-align: left;
        padding-left: 41px;

        /deep/ .el-button {
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;

          i {
            margin-right: 3px;
          }
        }
      }
    }

    .add_con {
      padding-top: 42px;
      width: 100%;

      /deep/ .el-form-item__label {
        width: 200px;
        font-size: 16px;
        color: #000000;
        padding: 0 20px 0 0;
      }

      /deep/ .el-form-item__content {
        margin-left: 0;
        float: left;

        .el-input__inner {
          //width: 300px;
          height: 40px;
          line-height: 40px;
        }
      }

      .primaryBtn {
        margin-left: 200px;
      }

      .add_conInp {
        width: 100%;

        /deep/ .el-input__inner {
          float: left;
          width: 1100px;
        }

        p {
          text-align: left;
          color: #666666;
          font-size: 12px;
        }
        .nowphoto {
          width: 100%;
          li {
            background-color: #fff;
            width: 120px;
            // height: 120px;
            // overflow: hidden;
            margin: 10px;
            text-align: center;
            // padding: 5px;
            // border: 3px solid #fff;
            float: left;
            position: relative;
            img {
              width:120px;
              height: 120px;
              // float: left;
            }
            i {
              position: absolute;
              top: -0px;
              right: -0px;
              width: 16px;
              height: 16px;
              cursor: pointer;
              background: url("../../../../static/images/cha.png") #fff no-repeat
                center;
              background-size: 16px 16px;
            }
            p{
              width: 120px;
              overflow: hidden;
              position: relative;
              i{
                position: absolute;
                top: -0px;
                right: -0px;
                width: 16px;
                height: 16px;
                cursor: pointer;
                background: url("../../../../static/images/cha.png") #fff no-repeat
                  center;
                background-size: 16px 16px;
              }
            }
          }
        }
      }

      .map {
        min-height: 500px;
        height: auto;
        margin-bottom: 0;

        >div {
          height: 500px;
          position: relative;

          .content_map {
            // padding-left: 150px;
            width: 1000px;
            height: 400px;

            .search-box {
              height: 40px;
            }

            .amap-demo {
              width: 100%;
              height: 380px;
            }
          }

          span {
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 1rem
          }
        }

      }

      .add_conTextarea {
        width: 100%;
        //   /deep/ .el-textarea__inner {
        //     width: 1100px;
        //     min-height: 140px !important;
        //   }
        height: 570px;

        /deep/ .el-form-item__label {
          float: left;
          line-height: 400px;
        }

        .editorclass {
          width: 1150px;
          // min-height: 140px !important; 
        }
      }

      .add_conBackmusic {
        width: 100%;

        /deep/ .el-input__inner {
          width: 1100px;
        }
      }

      .activeStyle {
        width: 1100px;

        /deep/ .el-radio {
          width: 25%;
          float: left;
          margin-left: 0;

          div {
            width: 100%;

            img {
              width: 100%;
            }
          }
        }
      }

      .choShopName {
        width: 100%;
        //   height: 40px;
        overflow: hidden;

        li {
          float: left;

          p {
            color: rgb(216, 189, 99);
            font-size: 16px;
          }

          i {
            width: 16px;
            height: 16px;
            cursor: pointer;
          }
        }
      }

      .choCardImg {
        width: 100%;
        height: 40px;
        overflow: hidden;

        p {
          color: rgb(216, 189, 99);
          font-size: 16px;
        }

        i {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
    }

    .cell {
      img {
        width: 60px;
        height: 60px;
      }
    }
    .tg_box {
    .tg_chooseimg {
      .el-dialog__body {
        overflow: auto;
        padding: 20px 20px;
        border-top: 1px solid #eee;
      }
      .checkclass {
        border: 3px solid #28b7a3 !important;
      }
      .photoTop {
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        line-height: 32px;
      }

      .photoBox {
        li {
          background-color: #eee;
          width: 165px;
          height: 165px;
          cursor: pointer;
          overflow: hidden;
          margin: 15px;
          text-align: center;
          padding: 5px;
          border: 3px solid #fff;
          float: left;
          &:hover {
            border: 3px solid #28b7a3;
          }
          img {
            width: 120px;
            height: 120px;
            // float: left;
          }
        }
      }
      /deep/ .el-dialog {
        width: 1018px;
      }
      .el-upload-list {
        display: none;
      }
      .el-pagination {
        float: right;
      }
    }
    
  }
  }

</style>
