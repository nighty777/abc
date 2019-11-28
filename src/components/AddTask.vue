<template>
  <div class="addtask">
    <!-- 弹出对话框 -->
    <el-button type="primary" round @click="dialogVisible = true">添加新建任务</el-button>
    <!-- 任务添加对话框 -->
<el-dialog
  title="任务编辑"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
   <!-- 表单 -->
     <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="任务名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="任务程度">
    <el-select v-model="form.region" placeholder="请选择重要程度">
      <el-option label="紧急" value="1"></el-option>
      <el-option label="重要" value="2"></el-option>
      <el-option label="一般" value="3"></el-option>
    </el-select>
  </el-form-item>
  <!-- 预计起始时间 -->
  <el-form-item label="开始时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <!-- 预计结束时间 -->
    <el-form-item label="结束时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date3" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date4" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <!-- 提醒 -->
  <el-form-item label="是否提醒">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
  <!-- 任务类型 -->
  <el-form-item label="任务类型">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="日常生活" name="type"></el-checkbox>
      <el-checkbox label="工作学习" name="type"></el-checkbox>
      <el-checkbox label="特殊" name="type"></el-checkbox>
      <el-checkbox label="其他类型" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <!-- 完成程度 -->
   <el-form-item label="完成度">
  <el-slider
      v-model="value"
      :step="10"
      show-stops>
    </el-slider>
      </el-form-item>
  <!-- 任务内容 -->
  <el-form-item label="任务内容">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  <!-- -->
</el-dialog>
  </div>
</template>
<script>
export default {
name: 'addtask',
data() {
      return {
        //滑块默认值
        value: 0,
        dialogVisible: false,
        form: {
          name: '',
          region: '',
          //起始时间
          date1: '',
          date2: '',
          //结束时间
          date3: '',
          date4: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
      ,
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }   
    }
}

</script>

