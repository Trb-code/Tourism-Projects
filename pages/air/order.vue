<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <orderform :data="infodata" />

      <!-- 侧边栏 -->

      <orderAside :data="infodata" />
    </el-row>
  </div>
</template>

<script>
import orderform from "@/components/air/orderForm.vue"
import orderAside from "@/components/air/orderAside.vue"
export default {
    data () {
        return {
            infodata:{
                seat_infos: {}
            }
        }
    },
    
   
    components:{
        orderform,
        orderAside
    },
    mounted(){
        this.$axios({
            url:`/airs/${this.$route.query.id}`,
            params:{
                seat_xid:this.$route.query.seat_xid
            }
        }).then(res=>{
            console.log(res);
       this.infodata = res.data
            
        })
        // console.log(this.$route);
       
    }
    
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>