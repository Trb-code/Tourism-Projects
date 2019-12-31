<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkpass">
      <el-input placeholder="确认密码" type="password" v-model="form.checkpass"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>                            
<script>
export default {
    data(){
       // 校验手机号码
          var validatePass = (rule, value, callback) => {   
             const reg=/^1[3-9]\d{9}$/
          if (reg.test(value)==false) {
            callback(new Error('请输入合法手机号码'));
          return false
          } else {
           console.log(111);
            callback();         
        }
        };
        // 输入密码
         var validatePass3 = (rule, value, callback) => {             
          if (value==='') {
            callback(new Error('请输入密码'));
          return false
          } else {                 
              callback();   
        }};
        // 密码校验
          var validatePass4 = (rule, value, callback) => {             
          if (value!==this.form.password||value==='') {
            callback(new Error('两次输入的密码不一致'));
          return false
          } else {
            callback()
          }
        };

                              

        // 昵称检验
        var validatePass2 = (rule, value, callback) => {             
          if (value==='') {
            callback(new Error('请输入昵称'));
          return false
          } else {
         
          
              callback();   
        }                        
        }

        return {
            // 表单数据
            form: {
              username:'',
              nickname:'',
              captcha:'',
              password:'',
              checkpass:''
            },
            // 表单规则
            rules: {
                    
            username: [
            { validator: validatePass, trigger: 'blur' }
          ],
            nickname: [
            { validator: validatePass2, trigger: 'blur' }
          ],
           password: [
            { validator: validatePass3, trigger: 'blur' }
          ],
             checkpass: [
            { validator: validatePass4, trigger: 'blur' }
          ],
            },
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){
          if(this.form.username.length!==11){
            this.$message("请输入合法手机号码")
            return false
          }
          this.$axios({
            url:'/captchas',
            method:'post',
            data:{tel:this.form.username}
          }).then(res=>{
            console.log(res);
           this.form.captcha=res.data.code        
          })
        },
       
        // 注册
        handleRegSubmit(){
           console.log(this.form)
         this.$refs.form.validate((valid) => {
          if (valid) {
              const {checkpass, ...props} = this.form;           
           this.$axios({
             url:'/accounts/register',
             method:'post',
             data:props          
           }).then(res=>{
             console.log(res);
             if(res.status===200){
               this.$message.success("恭喜注册成功"),
              // <nuxt-link to="/user/login"></nuxt-link>
              // this.$router.push({name:"/user/login"})
             window.location.reload()
             }
             
           })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
         
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>