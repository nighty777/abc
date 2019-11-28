<template>
  <div>
      <div style="font-size:30px" align="center" >个人任务管理</div>
     <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
     <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
       <!-- 未完成界面 -->
    <!-- 任务操作按钮 -->
    <el-tab-pane label="未完成" name="first">
                  <el-col :span="12">
                     <el-input v-model="input_search" placeholder="请输入关键字进行查询" clearable></el-input>
                 </el-col>
      <el-button type="primary" round @click="formDialogShowMethod">添加任务</el-button>
      <el-button type="success" round @click="sortByTask_level">任务等级排序</el-button>
      <el-button type="success" round @click="sortByCompletion_status">任务完成度排序</el-button>
    
    <!-- 未完成任务表格 -->
    <div class="">
    <el-table
      :data="searchFromKeyWords(input_search)"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="100">
      <template slot-scope="scope">
      <span>{{ scope.$index + 1 }}</span>
      </template>        
      </el-table-column>
      <el-table-column
        label="任务名称"
        width="180">
       <template slot-scope="scope">
        <span>{{scope.row.task_name}}</span>
        </template> 
      </el-table-column>
      <!-- 开始时间 -->
        <el-table-column
        label="起始时间"
        width="250">
       <template slot-scope="scope">
        <span>{{scope.row.start_time | dateFormat}}</span>
        <span>{{scope.row.start_time1 | dateFormat2 }}</span>
        </template> 
      </el-table-column>
      <!-- 结束时间 -->
      <el-table-column
        label="预计结束时间"
        width="250">
       <template slot-scope="scope">
        <span>{{scope.row.end_time | dateFormat}} </span>
        <span>{{scope.row.end_time2 | dateFormat2}} </span>

        </template> 
      </el-table-column>
      <el-table-column
        label="任务类型"
        width="180">
       <template slot-scope="scope">
        <span>{{scope.row.type | jugementTypeLevel}}</span>
        </template>  
      </el-table-column>      
      <el-table-column
        label="任务等级"
        width="180">
      <template slot-scope="scope">
       <span>{{scope.row.task_level | jugementTaskLevel }}</span>
      </template>   
      </el-table-column>
      <el-table-column
        label="任务完成情况">
        <template slot-scope="scope">
      {{scope.row.completion_status }}  
      
        <el-button type="text" size="small"
          @click="ChangePercentage(scope.row.completion_status)">
           显示当前任务进度条
          </el-button>        
        </template>
      </el-table-column>
      <el-table-column
        prop="caozuo"
        label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-search" circle  @click="detailDialogShowMethod2(scope.row.task_details,scope.row.tixing,scope.row.completion_status)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="detailDialogEditMethod(scope.$index,scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" circle @click="finishTask(scope.$index,scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteTask(scope.$index,scope.row)"></el-button>
        </template>
      </el-table-column>      
    </el-table> 
    </div> 
  </el-tab-pane>

 <!-- 任务已经完成表格 -->
             <el-tab-pane label="已完成" name="second">
                  <el-col :span="12">
                     <el-input v-model="input_search" placeholder="请输入关键字进行查询" clearable></el-input>
                 </el-col>
                 <el-table :data="searchFromKeyWords2(input_search)" style="width: 100%">
                     <el-table-column label="序号" width="180">
                         <template slot-scope="scope">
                             <span>{{ scope.$index + 1 }}</span>
                         </template>
                     </el-table-column>
                     <el-table-column label="任务名称" width="180">
                         <template slot-scope="scope">
                             <span>{{scope.row.task_name}}</span>
                         </template>
                     </el-table-column>
                     <el-table-column label="起始时间" width="180">
                         <template slot-scope="scope">
                             <span>{{scope.row.start_time | dateFormat}}</span>
                             <span>{{scope.row.start_time1 | dateFormat2}}</span>
                         </template>
                     </el-table-column>
                     <el-table-column label="预计结束时间">
                         <template slot-scope="scope">
                             <span>{{scope.row.end_time | dateFormat}}</span>
                             <span>{{scope.row.end_time2 | dateFormat2}}</span>
                         </template>
                     </el-table-column>
                     <el-table-column label="实际完成时间">
                         <template slot-scope="scope">
                             <span>{{scope.row.finished_time | dateFormat}} {{scope.row.finished_time | dateFormat2}}</span>
                         </template>
                     </el-table-column>
                     <el-table-column label="任务类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.type | jugementTypeLevel }}</span>
                        </template>
                    </el-table-column>
                     <el-table-column prop="options" label="操作">
                         <template slot-scope="scope">
                           <el-button type="danger" icon="el-icon-delete" circle @click="deletedFromFinishTaskList(scope.$index,scope.row)"></el-button>
                         </template>
                     </el-table-column>
                 </el-table>
             </el-tab-pane>


    <el-tab-pane label="帮助" name="third" align="center">
      <div  align="center">
        <el-link type="primary"  style="font-size:30px" href="https://github.com/nighty777/Vue-PersonalTaskManagenment">更多内容请关注我的github</el-link>
  <span class="demonstration"></span>
  <el-rate v-model="ratevalue1" @click="isRate()"></el-rate>
  </div>
    </el-tab-pane>
  </el-tabs>



<!-- 查看任务详情对话框 -->
<el-dialog title="任务的详细信息" :visible.sync="dialogFormVisibleunfinish" width="50%" :before-close="handleClose">
  <el-form :model="formunfinish">
    <el-form-item label="任务内容" :label-width="formLabelWidthunfinish">
      <el-input v-model="formunfinish.detail" autocomplete="off" disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="是否提醒" :label-width="formLabelWidthunfinish">
    <el-switch
     v-model="formunfinish.tixingunfinish"
     active-text="是"
     inactive-text="否" disabled="false">
    </el-switch>
    </el-form-item>
    <el-form-item label="任务进度条" :label-width="formLabelWidthunfinish">
    <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :disabled="true"></el-progress>
    </el-form-item>
  </el-form>
</el-dialog>

   <!-- 任务添加对话框 -->
<el-dialog
  title="任务编辑"
  :visible.sync="dialogFormVisible"
  width="50%"
  :before-close="handleClose">
   <!-- 表单 -->
     <el-form ref="form" :model="addForm" label-width="80px">
  <el-form-item label="任务名称">
    <el-input v-model="addForm.task_name"></el-input>
  </el-form-item>
  <el-form-item label="任务程度">
    <el-select v-model="addForm.task_level" placeholder="请选择任务程度">
      <el-option label="一般" value="0"></el-option>
      <el-option label="重要" value="1"></el-option>
      <el-option label="紧急" value="2"></el-option>
    </el-select>
  </el-form-item>
  <!-- 预计起始时间 -->
  <el-form-item label="开始时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="addForm.start_time" style="width: 100%;" format="yyyy 年 MM 月 dd 日"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker type="time" placeholder="选择时间" v-model="addForm.start_time1" style="width: 100%;" format="HH 时 mm 分 ss 秒"></el-time-picker>
    </el-col>
  </el-form-item>
  <!-- 预计结束时间 -->
    <el-form-item label="结束时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="addForm.end_time" style="width: 100%;" format="yyyy 年 MM 月 dd 日"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" type="time"  v-model="addForm.end_time2" style="width: 100%;" format="HH 时 mm 分 ss 秒"></el-time-picker>
    </el-col>
  </el-form-item>
  <!-- 提醒 -->
  <el-form-item label="是否提醒">
    <el-switch v-model="addForm.tixing"></el-switch>
  </el-form-item>
  <!-- 任务类型 -->
  <el-form-item label="任务类型">
    <el-select v-model="addForm.type" placeholder="请选择任务类型">
      <el-option label="日常生活" value="3"></el-option>
      <el-option label="工作学习" value="4"></el-option>
      <el-option label="其他类型" value="5"></el-option>
    </el-select>
  </el-form-item>
  <!-- 完成程度 -->
   <el-form-item label="完成度">
  <el-slider
      v-model="addForm.completion_status"
      :step="10"
      show-stops>
    </el-slider>
      </el-form-item>
  <!-- 任务内容 -->
  <el-form-item label="任务内容">
    <el-input type="textarea" v-model="addForm.task_details"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addTask">确定</el-button>
  </el-form-item>
</el-form>
  <!-- -->
</el-dialog>

<el-dialog
  title="Hello"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>感谢您的支持！</span>
</el-dialog>

  </div>
</template>




<script>
export default {
  data(){
    return{
      dialogVisible : false,
      ratevalue1 : 3,
      dialogFormVisibleunfinish: false,
        formunfinish: {
          detail : '',
          name: '',
          completion_statusunfinish : 0,
          tixingunfinish : false,
        },
        formLabelWidthunfinish: '120px',
      //进度条百分比默认值
       percentage: 10,
       completion_status1: 20,
       //是否是插入添加
       isAdd : false,
       input_search: '',
       //
       activeName: 'first',
        // 任务详情对话框具体内容
        detailcompletion_status : 0,
        detailDialogText: '测试',
        detailstart_time: '',
        detailtixing: '',
        // 任务详情对话框是否可显示
        dialogDetailsVisible: false,
        //添加任务对话框是否显示
        dialogFormVisible: false,
        //当前编辑事件的索引
        editIndex: 0,
        //添加事件form对象
        addForm: {
          //任务名称
          task_name: '',
          //任务等级
          task_level: 0,
          //起始时间
          start_time: '',//年月日
          start_time1: '',//小时分钟
          //结束时间
          end_time: '',//年月日
          end_time2: '',
          //是否提醒
          tixing: false,
          //任务类型
          type: 3,
          //滑块默认值
          completion_status : 0,
          //任务内容
          task_details: '',
         //现在进行的是添加操作
        },
        //默认未完成事件的form
                 unfinishTaskList: [{
                         task_name: "健身",
                         task_details: "举哑铃、深蹲",
                         task_level: 0,
                         start_time : "2019-11-7",
                         start_time1 : "2019-11-7 14:34:34",
                         end_time : "2019-11-8",
                         end_time2 : "2019-11-8 00:00:00",
                         type : 3,
                         tixing : false,
                         completion_status: 20

                     },
                     {
                         task_name: "写交互式实验报告2",
                         task_details: "注意实验报告的格式！",
                         start_time : "2019-9-20",
                         start_time1 : "2019-9-20 00:30:38",
                         end_time : "2019-10-8",
                         end_time2 : "2019-10-8 15:00:00",
                         task_level: 1,
                         tixing : true,
                         type :4,
                         completion_status: 60

                     },
                     {
                         task_name: "计网实验 配置IP地址 ",
                         task_details: "记得带电脑！",
                         start_time : "2019-12-13",
                         start_time1 : "2019-12-13 13:30:00",
                         end_time : "2019-12-13",
                         end_time2 : "2019-12-13 16:30:00",
                         task_level: 1,
                         tixing : true,
                         type :4,
                         completion_status: 0
                     }
                 ],
                 //默认已完成事件list
                 finishTaskList: [{
                     task_name: "安卓实验",
                     task_details: "安卓播放器单词本的实验报告",
                     start_time: '2019-9-22',
                     start_time1 : '2019-9-22 00:30:25',                   
                     end_time: '2019-10-9',
                     end_time2: '2019-10-9 18:00:00',
                     deleted_time: 'null',
                     finished_time: new Date(),
                     task_level: 2,
                     type: 4,
                     completion_status: 100
                 },
                 {
                     task_name: "操作系统内存管理实验",
                     task_details: "操作系统内存管理实验的实验报告",
                     start_time: '2019-7-22',
                     start_time1 : '2019-7-22 05:30:25',                   
                     end_time: '2019-7-24',
                     end_time2: '2019-7-24 22:00:00',
                     deleted_time: 'null',
                     finished_time: new Date(),
                     task_level: 2,
                     type: 4,
                     completion_status: 100
                 }
                 
                 
                 ],
    }
  },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //
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
      },
      //显示添加任务显示框
             formDialogShowMethod() {
                 //清空addForm
                 this.addForm.task_name = ""
                 this.addForm.task_details = ""
                 this.addForm.start_time = null
                 this.addForm.start_time1 = null
                 this.addForm.end_time = null
                 this.addForm.end_time2 = null
                 this.addForm.task_level = 0
                 this.addForm.completion_status = 0
                  this.addForm.type = 3
                this.addForm.tixing = false
                 //添加任务对话框可见
                 this.dialogFormVisible = true
                 //现在进行的是添加操作
                 this.isAdd = true
             },
       //添加任务
             addTask() {
                 //判断是否为空，是否是添加需求,添加则是push
                 if (this.isAdd) {
                     var resmble = JSON.parse(JSON.stringify(this.addForm))
                     this.unfinishTaskList.push(resmble)
                     this.isAdd = false
                 } else if (!this.isAdd) {
                     //否则是splice
                     //进行替换
                     this.unfinishTaskList.splice(this.editIndex, 1, JSON.parse(JSON.stringify(this.addForm)))
                     this.editIndex = 0
                 }
                 //清空addForm
                 this.addForm.task_name = ""
                 this.addForm.task_details = ""
                 this.addForm.start_time = null
                 this.addForm.start_time1 = null
                 this.addForm.end_time = null
                 this.addForm.end_time2 = null
                 this.addForm.task_level = 0
                 this.addForm.completion_status = 0
                this.addForm.type = 3
                this.addForm.tixing= false
                 this.dialogFormVisible = false

             },
              //编辑对话框
             detailDialogEditMethod(index, item) {
                 this.dialogFormVisible = true
                 this.isAdd = false
                 this.editIndex = index
                 //将传入的对象渲染表单对象
                 this.addForm = JSON.parse(JSON.stringify(item))
             },
             //显示任务详情对话框方法
             detailDialogShowMethod(task_details,tixing,completion_status) {
                 //对话框进行双向绑定的显示文本等于当前传入文本
                 this.detailDialogText = task_details
                 if(tixing==false)
                 {this.detailtixing = '不需要提醒'}
                 else{this.detailtixing = '需要提醒'}
                 this.detailcompletion_status = completion_status
                 //对话框可见
                 this.dialogDetailsVisible = true
             },
            detailDialogShowMethod2(task_details,tixing,completion_status){
              this.dialogFormVisibleunfinish = true
              this.formunfinish.detail = task_details
              this.formunfinish.tixingunfinish = tixing
              this.formunfinish.completion_statusunfinish = completion_status
            },
            //设置进度条进度
            ChangePercentage(completion_status){
               this.percentage = completion_status
             },
             //根据输入筛选符合要求的列表，用于未完成
             searchFromKeyWords(keywords) {
                 //定义一个空数组，返回用
                 var newList = []
                 //循环遍历数组
                 this.unfinishTaskList.forEach(item => {
                     //如果包含
                     if (item.task_name.indexOf(keywords) != -1) {
                         //push进入新数组
                         newList.push(item)
                     }
                 })
                 return newList
             },
            //根据输入筛选符合要求的列表,用于已完成
             searchFromKeyWords2(keywords) {
                 //定义一个空数组，返回用
                 var newList = []
                 //循环遍历数组
                 this.finishTaskList.forEach(item => {
                     //如果包含
                     if (item.task_name.indexOf(keywords) != -1) {
                         //push进入新数组
                         newList.push(item)
                     }
                 })
                 return newList
             },
              //根据任务重要程度排序
             sortByTask_level() {
                 this.unfinishTaskList.sort(this.listElementsCompare('task_level'))
             },
             //根据任务完成度排序
             sortByCompletion_status() {
                 this.unfinishTaskList.sort(this.listElementsCompare('completion_status'))
             },
             //对象元素比较函数,上面两个排序函数的基础
             //第二个参数是一个布尔值，true或者不填都表示升序排序，false表示降序排序
             listElementsCompare(property) {
                 return function (a, b) {
                     var value1 = a[property]
                     var value2 = b[property]

                     return value2 - value1
                 }
             },
              //删除任务
             deleteTask(index, item) {
                 //把任务从未完成列表中彻底删除
                 this.unfinishTaskList.splice(index, 1)
             },
             //完成任务
             finishTask(index, item) {
                 //设置完成时间为当前操作时间
                 item.finished_time = new Date()
                 //添加到已完成列表中去
                 this.finishTaskList.push(JSON.parse(JSON.stringify(item)))
                 //从未完成中删除
                 this.unfinishTaskList.splice(index, 1)

             },
            //从已完成列表中彻底删除
             deletedFromFinishTaskList(index, item) {
                 this.finishTaskList.splice(index, 1)
             },
            isRate(){
              if(this.ratevalue1 >= 3)
              {
              dialogVisible = true
              }
            },
    },





//过滤器
     filters:{
           //格式化日期
             dateFormat: function (datestr) {
                 var dt = new Date(datestr)
                 var year = dt.getFullYear()
                 var month = dt.getMonth() + 1
                 var day = dt.getDate()

                 return `${year}-${month}-${day}`
             },
             //格式化时间
             dateFormat2: function (datestr) {
                 var dt2 = new Date(datestr)
                 var hour = dt2.getHours()
                 var minute = dt2.getMinutes()
                 var second = dt2.getSeconds()

                 return `${hour}:${minute}:${second}`
             },
          //任务情况：数字和汉字的转换
             jugementTaskLevel: function (num) {
                 if (num == 0 || num == '0') {
                     return '一般'
                 }
                 if (num == 1 || num == '1') {
                     return '重要'
                 }
                 if (num == 2 || num == '2') {
                     return '紧急'
                 }
             },
            //任务类型 数字和汉字的转换
             jugementTypeLevel: function (num) {
                 if (num == 3 || num == '3') {
                     return '日常生活'
                 }
                 if (num == 4 || num == '4') {
                     return '工作学习'
                 }
                 if (num == 5 || num == '5') {
                     return '特殊'
                 }
             },
    }
}

</script>
