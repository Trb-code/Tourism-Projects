import {Message} from "element-ui";

export default (nuxt) => {
    // 拦截axios的错误
    // console.log(nuxt);
    
 nuxt.$axios.onError(res => {
        // response是js原生Error对象的属性
        const {statusCode, message} = res.response.data;

        if(statusCode === 400){
            // Message相当于this.$message
            Message.error(message)
        }
         if(statusCode === 401){
            // Message相当于this.$message
        //    this.$message('请登录')
           nuxt.redirect(200,'/user/login')
        }
    })
}