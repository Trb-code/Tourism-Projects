<template>
  <div class="hotel">
    <!-- 面包屑 -->
    <div class="crumbs">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">南京市酒店预订</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 目的地日期选择 -->
    <div class="destdata">
      <!-- 目的地 -->
      <span>
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="handfetch"
          placeholder="目的地"
          @select="handleSelect"
        ></el-autocomplete>
      </span>
      <!-- 日期 -->
      <span>
        <el-date-picker
          v-model="value"
          type="daterange"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </span>
      <!-- 人数 -->
      <el-autocomplete class="inline-input" placeholder="人数未定" @select="Selectpeople"></el-autocomplete>
      <el-button type="primary">查看价格</el-button>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            state:'',
            value:''            


        }
    },
    methods: {
       handfetch(){

       } ,
       handleSelect(){

       },
    //    人数选择
    Selectpeople(){

    }
    }

}
</script>

<style scoped lang='less'>
.el-breadcrumb{
    font-size: 14px;
    padding: 20px 0;
}



</style>