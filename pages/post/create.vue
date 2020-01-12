<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="4" style="width:770px">
        <div>
          <createmian :sondata="sondata" />
        </div>
      </el-col>
      <el-col :span="5" style="width: 200px">
        <creataside @cl="hand" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import createmian from "../../components/post/creatmain.vue"
import creataside from "../../components/post/createaside.vue"
export default {
  data () {
    return {
     sondata:[]
    }
  },
methods: {
  hand(item){
    this.sondata=item
    // console.log(this.sondata);
    
  }
},



  components:{
    createmian,
    creataside
    
  }
   

}
</script>


<style scoped lang="less">
/deep/.ql-editor{
  height:400px
  
}

</style>