<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilters :data="newdatalist" @setarr="setarr" />

        <!-- 航班头部布局 -->
        <flightsListHead />
        <!-- 航班信息 -->
        <flightsItem v-for="(item,index) in pagedata" :key="index" :data="item" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <flightsAside />
      </div>
    </el-row>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageindex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </section>
</template>

<script>
// 航班头部
import flightsListHead from "@/components/air/flightsListHead.vue"
// 航班列表
import flightsItem from "@/components/air/flightsItem.vue"
// 头部筛选
import flightsFilters from "@/components/air/flightsFilters.vue"
// 侧边栏历史记录
import flightsAside from "@/components/air/flightsAside.vue"

export default {
    components:{
        // 头部
flightsListHead,
// 列表
flightsItem,
// 筛选
flightsFilters,
// 侧边栏历史记录
flightsAside
    },
    data(){
        return {
            // 航班列表信息
            // datalist:[],
            // 总数据
            alldatalist:{
                info:{},
                 options: {},
                     flights: []
                      
            },
            newdatalist:{
                  info:{},
                 options: {},                 
                     flights: []
            }

            ,
            // 手动切割分页存放的数据
            // pagedata:[],
            total:0,
            pageindex:1,
            pagesize:5
            
        }
    },
    // 航班列表渲染------------------------------------>
    mounted(){
        this.$axios({
            url:'/airs',
            params: this.$route.query
           }).then(res=>{
               console.log(res);
            //    this.datalist=res.data
               this.alldatalist=res.data    
               this.newdatalist={...res.data }   
               this.total=res.data.total 
                // this.pagedata= this.datalist.flights.slice(0,5)
           })
    
    },
    computed:{
        pagedata(){
            if(!this.alldatalist.flights) return [];
         return     this.alldatalist.flights.slice(
                (this.pageindex-1)*this.pagesize,
                this.pageindex*this.pagesize
              )
        },
        
       
    },
    // 点击历史记录页面发生变化，通过watch监听$route的url
    watch: {
        $route(){
 this.$axios({
            url:'/airs',
            params: this.$route.query
           }).then(res=>{
               console.log(res);
            //    this.datalist=res.data
               this.alldatalist=res.data    
               this.newdatalist={...res.data }   
               this.total=res.data.total 
                // this.pagedata= this.datalist.flights.slice(0,5)
                 this.pageindex=1
           })
        }
    },
    methods:{
        // 切换分页条数
        handleSizeChange(value){
            this.pagesize=value
     
            // this.pagedata=this.datalist.flights.slice(
            //     (this.pageindex-1)*this.pagesize,
            //     this.pageindex*this.pagesize
            // )
            
        },
        // 手动切割换页数
        handleCurrentChange(value){
            this.pageindex=value
            // this.pagedata=this.datalist.flights.slice(
            //     (this.pageindex-1)*this.pagesize,
            //     this.pageindex*this.pagesize
            // )

        },
        setarr(arr){
             this.alldatalist.flights=arr
            // console.log(arr);
             this.total = arr.length;
            
        }
    }

}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>