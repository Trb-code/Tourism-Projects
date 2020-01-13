<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="4" style="width: 770px">
        <postmian />
      </el-col>
      <el-col :span="5">
        <detailaside />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import postmian from '../../components/post/detailmain'
import detailaside from '../../components/post/detailaside'
export default {
    components:{
        postmian,
        detailaside
    }
}
</script>

<style scoped lang='less'>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>