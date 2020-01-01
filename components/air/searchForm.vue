<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          @blur="handdepar"
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          @blur="handdest"
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          :picker-options="pickerOptions"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// var moment = require('moment')
import moment from 'moment'
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            // 机票搜索框数据
         form:{
            departCity:'',
            departCode:'',
            destCity:'',
            destCode:'',
            departDate:''
         },
        //  出发目的地下拉数据
         godata:[],
         destdata:[],

        //  日期范围选择
         pickerOptions: {
          disabledDate(time) {
            return time.getTime()+ 3600 * 1000 * 24 < Date.now()
          },


         }
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            
        },
        // 默认帮客户选中第一个出发的城市
        handdepar(){
          if(this.destdata.length>0){
            this.form.destCity=this.destdata[0].value
            this.form.destCode=this.destdata[0].sort
          }
        },
           // 默认帮客户选中第一个达到的城市
        handdest(){
            if(this.godata.length>0){
            this.form.departCity=this.godata[0].value
            this.form.departCode=this.godata[0].sort
          }
        },
        
        // 出发城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDepartSearch(value, cb){
          if(value===''){
            cb([])
          }
          if(value!==''){
             this.$axios({
            url:'/airs/city',
          params:{
            name:value
          }
          }).then(res=>{
            console.log(res);
           
            // 下拉表单只能用value
        this.godata= res.data.data.map(v=>{
              v.value=v.name.replace('市','')
              return v
              
            })
             cb(this.godata)                                   
          })
          }                              
        },

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){
            if(value===''){
            cb([])
          }
          // console.log(value);
          if(value!==''){
  this.$axios({
            url:'/airs/city',
          params:{
            name:value
          }
          }).then(res=>{
            // console.log(res);
            this.destdata=res.data.data.map(v=>{
              v.value=v.name.replace('市','')
              return v
            })
           cb(this.destdata)
          })          
          }   
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
          // console.log(item);      
            this.form.departCity=item.name
          this.form.departCode=item.sort       
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity=item.name
          this.form.destCode=item.sort
            
        },

        // 确认选择日期时触发
        handleDate(value){
            // console.log(moment(value).format('YYYY-MM-D'));
    this.form.departDate = moment(value).format('YYYY-MM-D')
     
        },

        // 触发和目标城市切换时触发
        handleReverse(){
        const{ departCity, departCode, destCity, destCode, departDate} = this.form
               this.form.departCity=destCity
               this.form.departCode=destCode
               this.form.destCity=departCity
               this.form.destCode=departCode         
        },

        // 提交表单是触发
        handleSubmit(){
          this.$axios({
            url:'/airs',
            params:this.form
          }).then(res=>{
            console.log(res);
            
          })
           
        },
     
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
