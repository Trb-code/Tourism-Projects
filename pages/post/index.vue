<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" :offset="4">
        <!-- <div class="grid-content bg-purple"> -->
        <postaside />
        <!-- </div> -->
        <!-- 主体部分--------------- -->
      </el-col>
      <el-col :span="12">
        <!-- <div class="grid-content bg-purple">右边内容</div> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import postaside from '../../components/post/postaside'
export default {
  components:{
    postaside
  }

}
</script>

<style  scoped lang='less'>
//  .el-row {
//     margin-bottom: 20px;
//     &:last-child {
//       margin-bottom: 0;
//     }
//   }
//   .el-col {
//     border-radius: 4px;
//   }
//   .bg-purple-dark {
//     background: #99a9bf;
//   }
//   .bg-purple {
//     background: #d3dce6;
//   }
//   .bg-purple-light {
//     background: #e5e9f2;
//   }
//   .grid-content {
//     border-radius: 4px;
//     min-height: 36px;
//   }
//   .row-bg {
//     padding: 10px 0;
//     background-color: #f9fafc;
//   }

</style>