<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20" :offset="4" style="width:1000px">
        <hotelhead />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import hotelhead from "../../components/hotel/hotelhead"
export default {
  components:{
    hotelhead
  }

}
</script>

<style scoped lang='less'>
 

</style>