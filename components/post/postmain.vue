<template>
  <!-- 旅游攻略主体部分 -->
  <div class="main">
    <!-- 头部---------------------- -->
    <div class="head">
      <input type="text" placeholder="输入你想去的地方，比如'广州'" ref="headinput" />
      <span style="color: #ffa500">
        <!-- <i class="el-icon-search"></i> -->
      </span>
      <div class="strategyplace">
        <span>推荐:</span>
        <span
          v-for="(item,index) in ['广州','上海','北京']"
          :key="index"
          @click="recommend(item)"
        >{{item}}</span>
      </div>
    </div>
    <!-- 推荐攻略--------------------- -->
    <div class="strategy">
      <!-- 推荐攻略头部--------------------- -->
      <div class="strategyhead">
        <span style="font-size:20px;color:#ffa500;">推荐攻略</span>
        <span>
          <el-button type="primary" icon="el-icon-edit" @click="create">写游记</el-button>
        </span>
      </div>
      <!-- 攻略列表------------------------------------ -->
      <div class="postlist" v-for="(item,index) in pagedata" :key="index">
        <div @click="postcontent(item.id)">
          <!-- 标题 -->
          <div class="title">{{item.title}}</div>
          <!-- 内容 -->
          <div class="content">{{item.summary}}</div>
          <!-- 图片-- -->
          <div class="img" v-if="item.images.length===1">
            <img style="width:220px;height:150px" :src="item.images" />
          </div>
          <div
            style="width:770px;"
            class="img"
            v-else-if="item.images.length>1"
            v-for="(imgs,index) in item.images"
            :key="index"
          >
            <img style="width:220px;height:150px;display:block" :src="imgs" />
          </div>
        </div>
        <!-- 底部 --------------->
        <div class="bottom">
          <div class="left" style="font-size:12px;color:#999999">
            <i class="el-icon-delete-location">{{item.cityName}}</i>
            by
            <!-- 底部头像 -->
            <img
              style="width:16px;height:16px"
              src="http://157.122.54.189:9095/assets/images/avatar.jpg"
              alt
            />
            <!-- 博主 -->
            <span style="color:#ffa500">地球发动机</span>

            <!-- 阅读数量 -->
            <i class="el-icon-view">{{item.watch}}</i>
          </div>
          <div class="right" style="color: #ffa500;">
            <span>74赞</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页--------------------------------- -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageindex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
    data () {
        return {
            // 文章列表数据
            alldata:[],
            pagesize:2,
            pageindex:1,
            total:0,
            
        }
    },    
    watch: {
      // 监听路由的变化，刷新加载不同的内容
      $route(){
      this.urlchangge()    
      }     
    },
methods: {

// 点击写游记跳转
create(){
this.$router.push({path:'/post/create'})
},

  // 封装文章列表的数据
  urlchangge(){
  this.$axios({
            url:'/posts',
            params:{
              city:this.$route.query.city
            }        
        }).then(res=>{
            console.log(res);
          this.alldata=res.data.data      
          this.total=res.data.total
          // 切割分页
          // this.pagedata= res.data.data.slice(0,2)                 
        })
  },
// 点击推荐的地方
recommend(data){
  this.$refs.headinput.value=data
  this.$axios({
            url:'/posts',
            params:{
              city:data
            }        
        }).then(res=>{
            console.log(res);
          this.alldata=res.data.data 
          // 分页数据刷新后总数定在第一页 
          //  this.pageindex=1    
        })
},
// 分页
      handleSizeChange(value){
        this.pagesize=value
          // this.alldata.slice(
          // (this.pageindex-1)*this.pagesize,
          // this.pageindex*this.pagesize
          // )
        },
        handleCurrentChange(value){
          this.pageindex=value
  
        },
        // 点击文章跳转
        postcontent(id){
          // this.$router.push({path:`/post/detail?id=${id}`
           this.$router.push({path:'/post/detail',
           query:{id}
        
          
          })
        }
},
computed: {
  // 监听页数的变化，实现更新
  pagedata(){
    if(!this.alldata) return []
    return this.alldata.slice(
          (this.pageindex-1)*this.pagesize,
          this.pageindex*this.pagesize
          )
  }
},
    mounted(){
      // 一进去加载页面数据
      this.urlchangge()          
    }
}
</script>
<style scoped lang='less'>
.main{ 
   width: 700px !important;
  //  height: 100%;
   margin-top:22px;
   margin-left:50px;
   .strategyplace{ 
       margin-top: 12px;
       margin-bottom: 14px;
       font-size: 12px;
       >span{
          padding-right: 5px;
           &:hover{
               text-decoration:underline;
               cursor: pointer;             
           }
       }
   }  
   .strategyhead{
       >span:nth-child(1){
           border-bottom: 2px solid #ffa500;
         padding-bottom: 15px;
       }   
       display: flex;
       justify-content: space-between;
       border-bottom: 1px solid #ddd;    
   } 
   .bottom{
       display: flex;
       justify-content: space-between;
   }
}
.head{
   width: 770px;  
    input{       
        border: 3px solid #ffa500;
        width: 100%;
        height: 38px;
          outline:medium;
          text-indent:2em
    }
  //  .el-icon-search{
        
  //       height: 400px !important;
  //       position: relative;
  //       top:35px;
  //       right: 310px;
  //   }
}
.postlist{
 
   width: 770px;
    cursor: pointer;
    .title{
        font-size: 20px;
        font-weight: 500;
        padding:15px 0px;
        &:hover{
  color: #ffa500
}
    }.content{
        font-size: 14px;
        color:#666666;
        padding-bottom: 20px;
        //多行超出长度隐藏
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;//向显示多少行就给多大值
-webkit-box-orient: vertical;

    }
}
</style>