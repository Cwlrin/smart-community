<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header content="id?'增加月卡':'增加月卡'" @back="$router.back()" />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <el-form ref="carInfoForm" :model="carInfoForm" :rules="carInfoRules" label-width="100px">
            <el-form-item label="车主姓名" prop="personName">
              <el-input v-model="carInfoForm.personName" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="carInfoForm.phoneNumber" />
            </el-form-item>
            <el-form-item label="车辆号码" prop="carNumber">
              <el-input v-model="carInfoForm.carNumber" />
            </el-form-item>
            <el-form-item label="车辆品牌" prop="carBrand">
              <el-input v-model="carInfoForm.carBrand" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <div class="form">
          <el-form :model="feeInfoForm" :rules="feeFormRules" label-width="100px">
            <el-form-item label="有效日期">
              <el-date-picker
                v-model="feeInfoForm.payTime"
                end-placeholder="结束日期"
                format="yyyy/MM/dd"
                range-separator="至"
                start-placeholder="开始日期"
                type="daterange"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="支付金额">
              <el-input v-model="feeInfoForm.paymentAmount" />
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="feeInfoForm.paymentMethod">
                <el-option
                  v-for="item in payMethodList"
                  :key="item.id"
                  ref="feeInfoForm"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { addCardAPI } from '@/api/card'

export default {
  name: 'AddMonthCard',
  data() {
    return {
      carInfoForm: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: ''
      },
      carInfoRules: {
        personName: [{ required: true, message: '请输入车主姓名', trigger: 'blur' }],
        phoneNumber: [{ required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }],
        carNumber: [{ required: true, message: '请输入车辆号码', trigger: 'blur' },
          { validator: this.validatorCarNumber, trigger: 'blur' }],
        carBrand: [{ required: true, message: '请输入车辆品牌', trigger: 'blur' }]
      },
      feeInfoForm: {
        payTime: [],
        paymentAmount: '',
        paymentMethod: ''
      },
      feeFormRules: {
        payTime: [{ required: true, message: '有效日期不可为空' }],
        paymentAmount: [{ required: true, message: '支付金额不可为空', trigger: 'blur' }],
        paymentMethod: [{ required: true, message: '支付方式不可为空', trigger: 'change' }]
      },
      payMethodList: [
        { id: 'Alipay', name: '支付宝' },
        { id: 'WeChat', name: '微信' },
        { id: 'Cash', name: '线下' }
      ]
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    if (id) {
      this.getCardDetail()
    }
  },
  methods: {
    async getCardDetail() {
      const { data } = await getCardDetailAPI(this.id)
      const { personName, phoneNumber, carNumber, carBrand, carInfoId } = data
      this.carInfoForm = { personName, phoneNumber, carNumber, carBrand, carInfoId }
      const { cardStartDate, cardEndDate, paymentAmount, paymentMethod, rechargeId } = data
      this.feeInfoForm = {
        paymentAmount,
        paymentMethod,
        rechargeId,
        payTime: [cardStartDate, cardEndDate]
      }
    },
    resetForm() {
      this.$refs.carInfoForm.resetFields()
      this.$refs.feeInfoForm.resetFields()
    },
    confirmAdd() {
      this.$refs.carInfoForm.validate((flag) => {
        if (!flag) return
        this.$refs.feeInfoForm.validate(async(flag) => {
          if (!flag) return
          const requestData = {
            ...this.carInfoForm,
            ...this.feeInfoForm,
            cardStartDate: this.feeInfoForm.payTime[0],
            cardEndDate: this.feeInfoForm.payTime[1]
          }
          delete requestData.payTime
          if (this.id) {
            await editCardAPI(requestData)
            this.$message.success('月卡修改成功')
          } else {
            await addCardAPI(requestData)
            this.$message.success('月卡添加成功')
          }
          this.$router.back()
        })
      })
    },
    validatorCarNumber(rule, value, callback) {
      const plateNumberRegex = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/
      if (plateNumberRegex.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的车牌号'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-card {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }

      .arrow {
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;

      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }

      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;

        .el-form {
          display: flex;
          flex-wrap: wrap;

          .el-form-item {
            width: 50%;
          }
        }
      }
    }

    .preview {
      img {
        width: 100px;
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
  }
}
</style>
