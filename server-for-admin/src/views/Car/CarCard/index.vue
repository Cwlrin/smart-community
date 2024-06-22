<template>
  <div class="card-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <span class="search-label">车牌号码：</span>
      <el-input v-model="params.carNumber" class="search-main" clearable placeholder="请输入内容" />
      <span class="search-label">车主姓名：</span>
      <el-input v-model="params.personName" class="search-main" clearable placeholder="请输入内容" />
      <span class="search-label">状态：</span>
      <el-select v-model="params.cardStatus">
        <el-option v-for="item in statusList" :key="item.value" :label="item.text" :value="item.value" />
      </el-select>
      <el-button class="search-btn" type="primary" @click="search">查询</el-button>
    </div>
    <!-- 新增删除操作区域 -->
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/car/addMonthCard')">添加月卡</el-button>
      <el-button>批量删除</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="list" style="width: 100%">
        <el-table-column :index="indexMethod" label="序号" type="index" />
        <el-table-column label="车主名称" prop="personName" />
        <el-table-column label="联系方式" prop="phoneNumber" />
        <el-table-column label="车牌号码" prop="carNumber" />
        <el-table-column label="车辆品牌" prop="carBrand" />
        <el-table-column label="剩余有效天数" prop="totalEffectiveDate" />
        <el-table-column :formatter="formatStatus" label="状态" prop="cardStatues" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button size="mini" type="text">续费</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        :current-page="params.page"
        :page-size="params.pageSize"
        :page-sizes="[10,20,30,40]"
        :total="total"
        layout="total, size,prev, pager, next,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 添加楼宇 -->
    <el-dialog
      title="添加楼宇"
      width="580px"
    >
      <!-- 表单接口 -->
      <div class="form-container">
        <!-- <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="楼宇名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="楼宇层数" prop="floors">
            <el-input v-model="addForm.floors" />
          </el-form-item>
          <el-form-item label="在管面积" prop="area">
            <el-input v-model="addForm.area" />
          </el-form-item>
          <el-form-item label="物业费" prop="propertyFeePrice">
            <el-input v-model="addForm.propertyFeePrice" />
          </el-form-item>
        </el-form> -->
      </div>
      <template #footer>
        <el-button size="mini">取 消</el-button>
        <el-button size="mini" type="primary">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCardListAPI } from '@/api/card'

export default {
  name: 'Card',
  data() {
    return {
      params: {
        page: 1,
        pageSize: 10,
        carNumber: '',
        personName: '',
        cardStatus: null
      },
      total: 0,
      list: [],
      statusList: [{
        text: '全部',
        value: null
      }, {
        text: '可用',
        value: 0
      }, {
        text: '不可用',
        value: 1
      }]
    }
  },
  created() {
    this.getCardList()
  },
  methods: {
    search() {
      this.params.page = 1
      this.getCardList()
    },
    indexMethod(index) {
      return (this.params.page - 1) * this.params.pageSize + index + 1
    },
    formatStatus(row, column, cellValue, index) {
      const MAP = {
        0: '可用',
        1: '不可用'
      }
      return MAP[cellValue]
    },
    async getCardList() {
      const res = await getCardListAPI(this.params)
      this.list = res.data.rows
      this.total = res.data.total
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getCardList()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getCardList()
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;

  .search-main {
    width: 220px;
    margin-right: 10px;
  }

  .search-btn {
    margin-left: 20px;
  }
}

.create-container {
  margin: 10px 0;
}

.page-container {
  padding: 4px 0;
  text-align: right;
}

.form-container {
  padding: 0 80px;
}
</style>
