<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="4" style="width:700px">
        <div>
          <createmian />
        </div>
      </el-col>
      <el-col :span="5" style="width: 200px">7777</el-col>
    </el-row>
  </div>
</template>

<script>
import createmian from "../../components/post/creatmain.vue"
export default {
  components:{
    createmian
  }
   

}
</script>


<style scoped lang="less">
/deep/.ql-editor{
  height:400px
  
}

</style>