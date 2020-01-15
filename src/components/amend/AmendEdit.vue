<template>
  <div class="main">
    <crumbs nav1="订单管理" nav2="修正单管理"></crumbs>
    <el-card class="query">
      <el-form size="mini" :model="form" ref="formDataRef" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label-width="90px" label="修正单类型">
              <el-select v-model="form.leixin" placeholder="请选择修正单类型">
                <el-option label="拒收修正" value="拒收修正"></el-option>
                <el-option label="缺货修正" value="缺货修正"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="90px" label="修正单状态">
              <el-select v-model="form.status" placeholder="请选择修正单状态">
                <el-option label="审核不通过" value="审核不通过"></el-option>
                <el-option label="审核通过" value="审核通过"></el-option>
                <el-option label="待审核" value="待审核"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="5">
            <!-- 编号 -->
            <el-form-item label-width="90px" label="修正单编号">
              <!-- v-model="formInline.user" -->
              <el-input v-model="form.bianhao1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="5">
            <el-form-item label-width="90px" label="配送单编号"><el-input v-model="form.bianhao2"></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <!-- 创建日期 -->
            <el-form-item label="创建日期">
              <el-col :span="11"><el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="11">
            <el-form-item>
              <!-- @click="onSubmit" 未绑定按钮事件 -->
              <el-button type="primary" @click="search">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="card2">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="bianhao1" label="修正单编号" width="180"></el-table-column>
        <el-table-column prop="leixin" label="修正单类型"></el-table-column>
        <el-table-column prop="name" label="修正数量" width="180"></el-table-column>
        <el-table-column prop="mendian" label="门店"></el-table-column>
        <el-table-column prop="status" label="修正单状态"></el-table-column>
        <el-table-column prop="date" label="创建日期 "></el-table-column>
        <el-table-column prop="bianhao2" label="配送单编号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="chakan(scope.row)" size="mini" icon="el-icon-search">查看</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.bianhao)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          bianhao1: '21377813123',
          name: '王小虎',
          mendian: '岳家嘴地铁路',
          leixin: '拒收修正',
          status: '待审核',
          date: '2018-03-14',
          bianhao2: '190237816412322'
        },
        {
          bianhao1: '21377813109',
          name: '王小虎',
          mendian: '汉江步行街店',
          leixin: '缺货修正',
          status: '审核通过',
          date: '2018-03-04',
          bianhao2: '190237816412321'
        },
        {
          bianhao1: '21377813131',
          name: '王小虎',
          mendian: '青龙小镇',
          leixin: '拒收修正',
          status: '审核不通过',
          date: '2018-03-15',
          bianhao2: '190237816413321'
        }
      ],
      form: {
        leixin: '',
        status: '',
        date: '',
        bianhao1: '',
        bianhao2: ''
      }
    }
  },
  methods: {
    chakan(row) {
      if (row.status === '待审核') {
        this.$router.push('audit')
      } else if (row.status === '审核通过') {
        this.$router.push('pass')
      } else {
        this.$router.push('noPass')
      }
    },
    del(bianhao) {
      if (confirm('确认删除吗？')) {
        const index = this.tableData.findIndex(item => item.bianhao === bianhao)
        this.tableData.splice(index, 1)
        this.$message.success('删除成功')
        window.sessionStorage.setItem('xiuzhengdanxinxi', JSON.stringify(this.tableData))
      } else {
        this.$message.info('取消成功')
      }
    },
    getshuju() {
      const shuju = JSON.parse(window.sessionStorage.getItem('xiuzhengdanxinxi'))
      if (shuju && shuju.length !== 0) {
        this.tableData = shuju
      } else {
        this.tableData = [
          {
            bianhao1: '21377813123',
            name: '王小虎',
            mendian: '岳家嘴地铁路',
            leixin: '拒收修正',
            status: '待审核',
            date: '2018-03-14',
            bianhao2: '190237816412322'
          },
          {
            bianhao1: '21377813109',
            name: '王小虎',
            mendian: '汉江步行街店',
            leixin: '缺货修正',
            status: '审核通过',
            date: '2018-03-04',
            bianhao2: '190237816412321'
          },
          {
            bianhao1: '21377813131',
            name: '王小虎',
            mendian: '青龙小镇',
            leixin: '拒收修正',
            status: '审核不通过',
            date: '2018-03-15',
            bianhao2: '190237816413321'
          }
        ]
      }
    },
    reset() {
      this.form = {
        leixin: '',
        status: '',
        date: '',
        bianhao1: '',
        bianhao2: ''
      }
      this.getshuju()
    },
    search() {
      this.getshuju()
      if (this.form.leixin.trim() !== '') {
        this.tableData = this.tableData.filter(val => val.leixin === this.form.leixin)
      }
      if (this.form.status.trim() !== '') {
        this.tableData = this.tableData.filter(val => val.status === this.form.status)
      }
      if (this.form.bianhao1.trim() !== '') {
        this.tableData = this.tableData.filter(val => val.bianhao1 === this.form.bianhao1)
      }
      if (this.form.bianhao2.trim() !== '') {
        this.tableData = this.tableData.filter(val => val.bianhao2 === this.form.bianhao2)
      }
      if (this.form.date !== '') {
        const y = (this.form.date.getFullYear() + '').padStart(2, '0')
        const m = (this.form.date.getMonth() + 1 + '').padStart(2, '0')
        const d = (this.form.date.getDate() + '').padStart(2, '0')
        const ymd = `${y}-${m}-${d}`
        this.tableData = this.tableData.filter(val => val.date === ymd)
      }
    }
  },
  created() {
    this.getshuju()
  }
}
</script>

<style lang="less" scoped>
.main {
  padding-top: 17px;
  padding-left: 40px;
}
.query {
  margin-top: 40px;
  height: 150px;
}
.el-form-item .el-button {
  width: 100px;
  height: 30px;
  border-radius: 15px;
}
.el-form-item .el-button:first-of-type {
  background-color: #47bac2;
}
.card2 {
  margin-top: 40px;
}
</style>
