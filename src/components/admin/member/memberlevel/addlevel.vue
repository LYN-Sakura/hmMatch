<template>
  <div class="ccia">
	<div class="ccia_top">
	  <button @click="goback">返回列表</button>
	</div>
	<div class="ccia_contentbox">
	  <el-form :model="form" class="ccia_content" @submit.native.prevent>
		<div class="content_top" cont="排序">
		  <span>排序</span>
		  <div>
			<el-input v-model="form.sortrank" placeholder="请输入排序内容"></el-input>
		  </div>
		  <span>数字越大，排名越靠前</span>
		</div>
		<div class="content_top" cont="标题">
		  <span>标题</span>
		  <div>
			<el-input v-model="form.title" placeholder="请输入标题内容" hide-required-asterisk="true"></el-input>
		  </div>
		</div>
		<div class="content_top" cont="简介">
		  <span>简介</span>
		  <div>
			<el-input v-model="form.intro" placeholder="请输入简介内容"></el-input>
		  </div>
		</div>
		<!-- 图片注释 -->
		<!-- <div class="content_top" cont="图片">
		  <span>图片</span>
		  <div class="content_top_img">
			<el-upload class="upload-demo" :action="baseurl+`admin/index/imgbase64`" :before-upload="beforeAvatarUpload"
			  :on-remove="handleRemove" :on-exceed="onexceed" :limit="5" :file-list="form.img_list" list-type="picture">
			  <el-input disabled placeholder="请选择图片"></el-input>
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">
				第一张为商城展示缩略图(最多上传5张)，建议为正方形图片，其它为详情页面图片，尺寸建议宽度为640，并保持图片大小一致，且大小在500kb一下</div>
			</el-upload>
		  </div>
		</div> -->
		<!-- 首页图片 -->
		<!-- <div class="content_top" cont="首页头部图" style="width:100%;">
		  <span>首页头部图</span>
		  <div style="line-height:32px;display:flex;flex-direction: column;">
			  <el-input placeholder="上传单张图片" disabled style="width:50%;">
				  <template slot="append">
					  <el-button @click="choose(1)">选择图片</el-button>
				  </template>
			  </el-input>
			  <div>首页活动头部宣传图(可传多张)</div>
			  <ul class="nowphoto">
				  <li v-for="(item,index) in fincheckarr" :key="index">
					  <img :src="item.url">
					  <i @click="deleteSYimg(item)"></i>
					  <el-button @click="choImgShop(item)">选择跳转链接</el-button>
				  </li>
			  </ul>
		  </div>
		</div> -->

		
		<div class="content_top" cont="商家详情图"  style="width:100%;height:auto;">
		  <span>商家详情图</span>
		  <div style="line-height:32px;display:flex;flex-direction: column;">     
			<el-input placeholder="上传单张图片" disabled style="width:50%;">
				<template slot="append">
					<el-button @click="choose(2)">选择图片</el-button>
				</template>
			</el-input>
			<div>商家详情图图(可传9张)</div>
			<ul class="nowphoto">
				<li v-for="(item,index) in fincheckarr1" :key="index">
					<img :src="item.url">
					<i @click="deleteWYimg(item)"></i>
				</li>
			</ul>
		  </div>
		</div>

		<div class="content_top" cont="活动主图"  style="width:100%;height:auto;">
		  <span>活动主图</span>
		  <div style="line-height:32px;display:flex;flex-direction: column;">
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

		  </div>
		</div>
		<!-- 首页图片结束 -->


		<div class="content_top" cont="联系人" style="margin-top: 10px;">
		  <span>联系人</span>
		  <div>
			<el-input v-model="form.linkman" placeholder="请输入联系人名称"></el-input>
		  </div>
		</div>
		<div class="content_top" cont="商家电话">
		  <span>商家电话</span>
		  <div>
			<el-input v-model="form.sub_phone" placeholder="请输入内容">
			</el-input>
		  </div>
		</div>
		<div class="content_top map" cont="门店地址">
		  <span>门店地址</span>
		  <div>
			<el-input v-model="address" placeholder="请在搜索框中搜索或地图上选取位置"></el-input>
			<div class="content_map" style="padding-left:0;">
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
		  <span style="margin-top:50px">经度：{{ lng }}, 纬度：{{ lat }} 地址:{{address}} </span>
		</div>
		<!-- 详情页注释开始 -->
		<!-- <div class="content_top detail" cont="详情">
		  <span>详情</span>
		  <div> -->
		<!-- <el-input
			  v-model="form.detail"
			  placeholder="请输入内容"
			  
			></el-input> -->
		<!-- <Editor v-model="form.detail" :t_value="form.detail" class="editorclass" > </Editor>
		  </div>
		</div> -->
		<!-- 详情页注释结束 -->
		<!-- <div class="content_top" cont="类型">
		  <span>类型</span>
		  <div>
			<el-select v-model="cates" placeholder="请选择类型" @change="updatetype(cates)">
			  <el-option
				v-for="item in sub_cate"
				:key="item.id"
				:label="item.cate_name"
				:value="item.cate_name"
			  ></el-option>
			</el-select>
		  </div>
		</div> -->
		<!-- 插入视频注释开始 -->
		<!-- <div class="content_top insert_video" cont="插入视频">
		  <span>插入视频</span>
		  <div>
			<button>
			  <el-form-item prop="Video" style="width:100%"> -->
		<!-- class="upload-demo"
				action="https://jsonplaceholder.typicode.com/posts/"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:file-list="fileList2"
				list-type="picture">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> 不解开注释-->
		<!-- <el-upload
				  :action="baseurl+`admin/index/upload_file`"
				  :show-file-list="false"
				  :on-success="handleVideoSuccess"
				  :before-upload="beforeUploadVideo"
				  :on-progress="uploadVideoProcess"
				>
				  <div style="display:flex;width:100%;">
					<input type="text" disabled placeholder="请插入视频">
					<i
					  class="avatar-uploader-icon"
					  style="width: 97px;display: block;height: 40px;line-height: 40px;border:1px solid #ccc;border-left: 0px;"
					>视频上传</i>
					<el-progress
					  v-if="videoFlag == true"
					  type="circle"
					  :percentage="videoUploadPercent"
					  style="margin-top:30px;"
					></el-progress>
				  </div>
				</el-upload>
			  </el-form-item>
			</button>
			<video
			  v-if="videoForm.Video !='' && videoFlag == false"
			  class="avatar"
			  controls="controls"
			  :src="videoForm.Video"
			>您的浏览器不支持播放</video>
			<p class="text">请保证视频格式正确，且不超过10M</p>
		  </div>
		</div> -->
		<!-- 插入视频注释结束 -->
		<div class="content_top" cont="选择商家管理员">
		  <span>选择商家管理员</span>
		  <div>
			<el-input v-model="Submanage" placeholder="请输入商家ID值" disabled oninput="value=value.replace(/[^\d]/g,'')">
			</el-input>
			<button @click.stop="centerDialog('sub')" style="height:32px;line-height:32px;border-radius:0 4px 4px 0;">选择商家</button>
		  </div>
		</div>
		<div class="content_top" cont="核销用户">
		  <span>核销用户</span>
		  <div>
			<el-input placeholder="请输入内容" oninput="value=value.replace(/[^\d]/g,'')" disabled></el-input>
			<button @click.stop="centerDialog()" style="height:32px;line-height:32px;border-radius:0 4px 4px 0;">选择核销人</button>
		  </div>
		  <span class="clearfix">商家核销员(可多人)</span>
		</div>
		<div class="content_top auditList clearfix" cont="核销用户列表" v-if="audit_people.length!=0">
		  <span></span>
		  <div>
			<ul>
			  <li v-for="(item,index) in audit_people" :key="index">
				<el-tooltip class="item" effect="dark" content="删除此项" placement="top">
				  <el-button @click="del(item.id)">{{item.nickname}}</el-button>
				</el-tooltip>
			  </li>
			</ul>
		  </div>
		</div>
		<el-dialog :title="suboraudit?'选择商家':'选择核销人'" :visible.sync="centerDialogVisible">
		  <el-form :model="forms" @submit.native.prevent>
			<el-form-item>
			  <el-input style="margin:30px auto 0px;float:unset;" placeholder="请输入核销人用户名" v-model="forms.date1"
				autocomplete="off" :rules="[
				  { required: true, message: '检索条件不能为空'},
				]" @keyup.native="active_find_add">
				<el-button slot="append" @click="active_find_add">+</el-button>
			  </el-input>
			  <transition>
				<div v-if="flag" class="addproarr">
				  <ul>
					<li v-for="(item,index) in add_audit_list" :key="index">
					  <!-- 核销人用户名  -->
					  <div>{{item.nickname}}/{{item.mobile}}/{{item.realname}}</div>
					  <!-- 选择 -->
					  <div @click.stop="addsub(item.id)">选择</div>
					</li>
				  </ul>
				</div>
			  </transition>
			</el-form-item>
			<el-form-item>
			  <!-- 管理员数组展示 -->
			  <ul v-show="suboraudit" class="show_hot_list">
				<li v-for="(item,index) in Submanagearr" :key="index">
				  <div>
					<span>{{item.nickname}}</span>
				  </div>
				  <button @click="del(item.id)">删除</button>
				</li>
			  </ul>
			  <!-- 核销人数组展示 -->
			  <ul v-show="!suboraudit" class="show_hot_list">
				<li v-for="(item,index) in By_audit" :key="index">
				  <div>
					<span>{{item.nickname}}</span>
				  </div>
				  <button @click="del(item.id)">删除</button>
				</li>
			  </ul>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="Save_audit()">保存</el-button>
			<el-button @click="centerDialogVisible  = false">关闭</el-button>
		  </div>
		</el-dialog>
		<div class="content_top" cont="是否审核">
		  <span>是否审核</span>
		  <el-radio-group v-model="form.radio" style="line-height:50px;">
			<el-radio :label="1">通过</el-radio>
			<el-radio :label="0">驳回</el-radio>
		  </el-radio-group>
		</div>
		<div class="content_top" cont="是否启用">
		  <span>是否启用</span>
		  <el-radio-group v-model="form.enabled" style="line-height:50px;">
			<el-radio :label="1">启用</el-radio>
			<el-radio :label="0">禁用</el-radio>
		  </el-radio-group>
		</div>
		<div class="submitbox clearfix">
		  <input value="提交" type="submit" @click="submit">
		  <button @click.stop="goback()">返回列表</button>
		</div>
	  </el-form>
	</div>
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
	  </div>
  </div>
</template>
<script>
  import addlevel from "./addlevel.js";
  export default addlevel;

</script>
<style lang="less" scoped>
  @import url("./addlevel.less");

</style>
