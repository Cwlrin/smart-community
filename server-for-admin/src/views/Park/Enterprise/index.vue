<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input v-model="params.name" class="search-main" clearable placeholder="请输入内容" @clear="clearSearch" />
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/addEnterprise')">添加企业</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="enterpriseList" :index="indexMethod" style="width: 100%">
        <el-table-column label="序号" type="index" />
        <el-table-column label="企业名称" prop="name" width="320" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column
          label="联系电话"
          prop="contactNumber"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" type="text">添加合同</el-button>
            <el-button size="mini" type="text">查看</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        :page-size="params.pageSize"
        :total="total"
        layout="total, prev, pager, next"
        @current-change="handleChange"
      />
    </div>
  </div>
</template>

<script>
import { getEnterpriseListAPI } from '@/api/enterprise'

export default {
  name: 'EnterPrise',
  data() {
    return {
      params: {
        name: '',
        page: 1,
        pageSize: 10
      },
      enterpriseList: [],
      total: 0
    }
  },
  mounted() {
    this.getEnterpriseList()
  },
  methods: {
    clearSearch() {
      this.params.name = ''
      this.getEnterpriseList()
    },
    search() {
      this.params.page = 1
      this.getEnterpriseList()
    },
    indexMethod(index) {
      return (this.params.page - 1) * this.params.pageSize + index + 1
    },
    handleChange(val) {
      this.params.page = val
      this.getEnterpriseList()
    },
    async getEnterpriseList() {
      const res = await getEnterpriseListAPI(this.params)
      this.enterpriseList = res.data.rows
      this.total = res.data.total
    }
  }
}
</script>

<style lang="scss" scoped>
.department-container {
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);;
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
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
