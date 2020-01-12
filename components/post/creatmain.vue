<template>
  <div class="main">
    <h4>发表新攻略</h4>
    <span style="font-size:13px;padding-bottom:10px">分享你的个人游记，让更多人看到哦！</span>
    <!-- 标题框 -->
    <div>
      <el-input type="textarea" :rows="1" placeholder="请输入标题" v-model="textarea"></el-input>
    </div>
    <!-- 富文本框 -->
    <div>
      <VueEditor :config="config" ref="vueEditor" />
    </div>
    <!-- 选择城市 -->
    <div class="city">
      <span>选择城市</span>

      <el-autocomplete
        v-model="state"
        :fetch-suggestions="handcity"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>
    </div>

    <!-- 发布或者存草稿 -->
    <div class="send">
      <el-button type="primary" size="mini" @click="fabu">发布</el-button>&nbsp;&nbsp;或者
      <span style="color:#ffa500;cursor: pointer;" @click="savedraft">存到草稿</span>
    </div>
  </div>
</template>
<script>
import "quill/dist/quill.snow.css"
let VueEditor;

if (process.browser) {
    VueEditor = require('vue-word-editor').default
}
export default {
 props: ['sondata'],
  
 
  components:{
    VueEditor
  },
  
  watch: {
    // 监听草稿箱的数据，赋值给富文本框
   sondata(){
      this.textarea=this.sondata.textarea,
      this.$refs.vueEditor.editor.root.innerHTML=this.sondata.content
   

    }
  },
  methods: {
    // 存到草稿
    savedraft(){

this.$store.commit('post/draftdata',{textarea:this.textarea,
                                    content:this.$refs.vueEditor.editor.root.innerHTML})
    },

// 点击发布
fabu(){
  this.$axios({
    url:'/posts',
    method:'post',
    headers:{
Authorization:'Bearer '+ this.$store.state.user.userinfo.token 
    },
    data:{
   content:this.$refs.vueEditor.editor.root.innerHTML,
   title:this.textarea,
    city:this.citys
    }
  }).then(res=>{
    console.log(res);
    
  })
},
// 选择城市触发
    handcity(value,cb){
      if(value===''){
        cb([])
      }
      if(value){ 
    this.$axios({
      url:'/cities',
      params:{
        name:value
      }     
    }).then(res=>{
      // console.log(res);
  this.citydata=res.data.data.map(v=>{
                 v.value=v.name
                 return v
      })  
       cb(this.citydata)
    })
      }
    
    },
    // 点击选择城市
    handleSelect(item){
      // console.log(item); 
      this.citys=item.name
    }
  },   
    data () {
        return {
          // 选择城市
          citys:'',
          citydata:[],

// 下拉选择城市
            restaurants: [],
            state: '',
            textarea:'',
             config: {
      // 上传图片的配置
      uploadImage: {
        url: "http://127.0.0.1:1337/upload",
        name: "files",
        // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
        uploadSuccess(res, insert){    
        console.log(res);  

         
          insert("http://127.0.0.1:1337" + res.data[0].url)
          console.log(res.data[0].url);
          
        }
      },
  	 
      // 上传视频的配置
      uploadVideo: {
        url: "http://127.0.0.1:1337/upload",
        name: "files",
        uploadSuccess(res, insert){
          insert("http://127.0.0.1:1337" + res.data.url)
        }
      }
    }          
            }
    }}
</script>

<style  scoped lang='less'>
.send{
  padding: 20px;

}
.city{
  padding: 20px 20px;
}

.el-textarea{
    margin: 10px 0
}
h4{
    font-size: 20px
}
</style>