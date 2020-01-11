<template>
  <div class="main">
    <!-- 面包屑导航 ------------------------------->
    <div class="crumbs">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="post" v-for="(item,index) in postlist" :key="index">
      <div class="title">{{item.title}}</div>
      <div class="times">
        <span>攻略：2019-05-22 10:57</span>
        <span>阅读：12947</span>
      </div>
      <!-- 文章内容----------------------------------------- -->
      <div class="plays">
        <div class="samlltitle" v-html="item.content"></div>
      </div>
    </div>
    <!-- 图标-------------------------------------- -->
    <div class="icon">
      <div>
        <i class="el-icon-edit-outline"></i>
        <p>评论(100)</p>
      </div>

      <div>
        <i class="el-icon-star-off" @click="collect"></i>
        <p>收藏</p>
      </div>
      <div>
        <i class="el-icon-share"></i>
        <p>分享</p>
      </div>
      <div>
        <i class="el-icon-thumb" @click="like"></i>
        <p>点赞(74)</p>
      </div>
    </div>
    <!-- 评论---------------------------------------------- -->

    <div class="comment">
      <p>评论</p>
      <!-- 评论提交框 -->
      <el-input type="textarea" :rows="2" placeholder="说点什么吧" v-model="textarea" ref="inp"></el-input>
      <!-- 提交按钮 -->
      <el-button type="primary" @click="sendcomment">提交</el-button>
      <!-- 图片上传 -->
      <el-upload
        action="http://127.0.0.1:1337/upload"
        name="files"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="uplodesuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <!-- 评论列表 -->
      <div class="commentlist" v-for="(item,index) in allcomment" :key="index">
        <div class="commenthead">
          <div class="left">
            <img :src="item.account.defaultAvatar" style="width:14px;height:14px" />
            <span>{{item.account.nickname}}</span>
            <span>{{item.created_at | datatime}}</span>
            <div class="imgs">
              <img
                style="width:200px;heigth:200px"
                :src="`http://127.0.0.1:1337${it.url}`"
                v-for="(it,index) in item.pics"
                :key="index"
              />
            </div>
          </div>
          <div>{{item.account.id}}</div>
        </div>
        <!-- 评论多层组件 -->
        <comment_item v-if="item.parent" :facomment="item.parent" />
        <span class="huifu" @click="huifu(allcomment)">回复</span>
        <div class="commentcontent">{{item.content}}</div>
      </div>
    </div>
    <!-- 分页--------------------------------------------- -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageindex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
// 过滤器
import {datatime} from "../../components/filter/filter.js"
import moment from 'moment';
import comment_item from "../../components/post/detailcomment_item"
export default {
  // 过滤器注册
  filters:{
    datatime
  },
     data () {
        return {
            // 文章数据
            postlist:[],
            textarea:'',
            // 评论总数据
            allcomment:[],
            // 评论时间
            // times:'',
            isfalse:false,
            
            pics:[],                   
        dialogImageUrl: '',
        dialogVisible: false,
        total:0,
        pageindex:1,
        pagesize:5     
    }
        },
  components:{
comment_item
  },
// 监听分页变化--------------------------------------------
watch: {
  pageindex(){
        this.$axios({
          url:'/posts/comments',
          params:{
            post:this.$route.query.id,          
            _limit:this.pagesize,
            _start:this.pageindex*2
          }
        }).then(res=>{
          console.log(res);
       this.total=res.data.total
    this.allcomment=res.data.data.map(v=>{
      v.account.defaultAvatar="http://127.0.0.1:1337"+v.account.defaultAvatar     
      return v
    })          
        })  
      
  },
  pagesize(){
         this.$axios({
          url:'/posts/comments',
          params:{
            post:this.$route.query.id,          
            _limit:this.pagesize,  
            _start:this.pageindex
            
          }
        }).then(res=>{
          console.log(res);
       this.total=res.data.total
    this.allcomment=res.data.data.map(v=>{
      v.account.defaultAvatar="http://127.0.0.1:1337"+v.account.defaultAvatar     
      return v
    })          
        }) 
  }
},
// -------------------------------------------------

    methods: {  
      // 点击回复，获取焦点  
      huifu(allcomment){
        this.$refs.inp.focus()},
     leave(){
        this.isfalse=false
      },
      enter(){
  this.isfalse=true
      },
      // 分页------------------------>
          handleSizeChange(val) {
      this.pagesize=val
      },
      handleCurrentChange(val) {
       this.pageindex=val
      },

// 评论图片上传成功
uplodesuccess(response){
  console.log(response);
  this.pics.push(...response)  
},
// 封装token
settoken(){
  let token=this.$store.state.user.userinfo.token
  return{  
    Authorization:'Bearer '+ token 
  }
},
      // 封装评论列表
      commentlist(){
    // 获取文章评论
        this.$axios({
          url:'/posts/comments',
          params:{
            post:this.$route.query.id,          
            _limit:this.pagesize,
            _start:this.pageindex
          }
        }).then(res=>{
          console.log(res);
       this.total=res.data.total
    this.allcomment=res.data.data.map(v=>{
      v.account.defaultAvatar="http://127.0.0.1:1337"+v.account.defaultAvatar      
      return v
    })         
        })   
      },
// 图片上传
 handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file);
   
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(this.dialogImageUrl);        
      },
// 点击提交评论--------------------------
sendcomment(){
if(this.textarea===''){
  this.$message.warning("请输入内容")
  return false
}else{
  this.$axios({
    url:'/comments',
    method:'post',
    headers:{
      'Content-Type':'application/json',
Authorization:'Bearer '+ this.$store.state.user.userinfo.token 
    },
    data:{
      content:this.textarea,
      pics:this.pics,
      post:this.$route.query.id,
    }     
    }).then(res=>{
      console.log(res);
      if(res.data.status===0){
        this.$message.success(res.data.message)
      this.textarea=''
        // 刷新评论数据
     this.commentlist() 
      }   
  })
  
}
},
// ----------------------------------------------------

    //   收藏文章
    collect(){   
            this.$axios({
            url:'/posts/star',
              headers:{
                Authorization:'Bearer '+ this.$store.state.user.userinfo.token              
            },                      
            params:{
                id:this.$route.query.id
            }
        }).then(res=>{
            // console.log(res);
            if(res.data.status===0){
                this.$message.success(res.data.message)
            }                     
        })          
    },

    // 点赞
    like(){
          this.$axios({
            url:'/posts/like',
              headers:{
                Authorization:'Bearer '+ this.$store.state.user.userinfo.token              
            },                      
            params:{
                id:this.$route.query.id
            }
        }).then(res=>{
            // console.log(res);
            if(res.data.status===0){
                this.$message.success(res.data.message)
            }                     
        })          
    }


    },
  
    mounted(){
     
    
        // 获取文章数据
        this.$axios({
            url:'/posts',
            params:{
                id:this.$route.query.id
            }
        }).then(res=>{
            console.log(res);
            this.postlist=res.data.data            
        })
  // 评论数据  
    this.commentlist()  
    }
}
</script>
<style scoped lang='less'>
.huifu{
   cursor: pointer;
  position: relative;
  top: 18px;
  left: 708px;
  font-size: 12px;
  color: #007acc;
}
.imgs{
  margin-top: 25px;
  margin-right: 12px;
}
.commentlist{
  .commentcontent{
    padding-left: 40px;
  }
  margin-top: 18px;
  border: 1px solid #eee;
  .commenthead{
    padding: 10px;
    display: flex;
    justify-content: space-between
  }
}
 .comment{
.el-button{
margin-left: 680px;
border-radius: 20%;
&:hover{
    border-radius: 40%;
    color: #ffa500
}
 }
 }
.main{ 
.post{
    .title{
        font-size: 35px;
        font-weight: 600;
        border-bottom: 1px solid #dddddd;
        padding:20px 0;
    }    
}
.times{
        // padding-right: 0px !important;
          margin-left: 450px;
          padding: 20px 0;     
    }
.crumbs{
    margin-top: 15px
}
}
.icon {
    >div:nth-child(1){
        p{
            margin-left: -10px;
        }
    }  
     div{
         margin-left: 20px;
     }
    margin: 30px 0px;
   
    display: flex;
    justify-content: center;
    align-items: center;
    .el-icon-edit-outline{
        font-size: 34px;
         color: #ffa500;
         &:hover{
             cursor: pointer;
         }
    }
    .el-icon-star-off{
         font-size: 34px;
          color: #ffa500;
           &:hover{
             cursor: pointer;
         }
       

    }
    .el-icon-share{
        font-size: 34px;
         color: #ffa500;
          &:hover{
             cursor: pointer;
         }      
    }
    .el-icon-thumb{
         font-size: 34px;
          color: #ffa500;
           &:hover{
             cursor: pointer;
         }       
    }   
}
.comment{
    input{
        width: 100%;
        height: 54px}         
}

</style>