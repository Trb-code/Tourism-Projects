<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" :offset="4" style=" width: 260px">
        <postaside />

        <!-- 主体部分--------------- -->
      </el-col>
      <el-col :span="12" style=" width: 260px">
        <postmian />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import postaside from '../../components/post/postaside'
import postmian from '../../components/post/postmain'
export default {
  components:{
    postaside,
    postmian
  }

}
</script>

<style  scoped lang='less'>


</style>