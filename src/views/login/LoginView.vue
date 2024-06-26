<script setup lang="ts">
import { ref,reactive } from 'vue'
import {ElMessage, type FormInstance,type FormRules} from "element-plus"
import {login} from '@/api/users.ts'



// 表单响应式数据
const form = reactive({
  email:"",
  password:"",
})


// 使用 ref 创建 formRef 用于在模板中引用  
const formRef = ref<FormInstance>

// 登录事件处理  
const onSubmit = async () => {  
  //表单校验
  await formRef.value?.validate().catch((err)=>{
    ElMessage.error("表单校验失败...")
    throw err
    })

   //正式发送登录请求
    login(form).then(res => {
        console.log(res)
    })
}

//定义表单校验规则
const rules = reactive<FormRules>({
    email:[
        { required:true,message:"账号不能为空",trigger:"blur" },
        { pattern:/^1\d{10}$/,message:"必须是11位数字",trigger:"blur"},
    ],
    password:[
        {required:true,message:"密码不能为空",trigger:"blur"},
        {min:6,max:18,message:"密码长度需要6~18位",trigger:"blur"},
    ]
})


const clientId = ref();  
const redirectUri = ref();  

//获取配置信息，将用户重定向到授权Url（Microsoft)登录页面
const loginWithMicrosoft=async () => {  
  try {  
    
    clientId.value = import.meta.env.VITE_APP_CLIENT_ID;
    redirectUri.value = import.meta.env.VITE_APP_REDIRECT_URL;
    navigateToAuthUrl(); 
    
  } catch (error) {  
    console.error('Failed :', error);  
  }  
};  

//构建授权Url
const navigateToAuthUrl = () => {
  if (!clientId.value || !redirectUri.value) {  
    console.error('Client ID or Redirect URI is missing.');  
    return; 
  }
    
    const params = new URLSearchParams({  
    client_id: clientId.value,  
    response_type: 'code',  
    redirect_uri: redirectUri.value,  
    scope: 'https://graph.microsoft.com/mail.read',  
    // 其他可选参数...  
  });  
  const authUrl = 'https://login.microsoftonline.com/415c0250-db82-439e-b52a-e1aa43ca1ba1/oauth2/v2.0/authorize?' + params.toString(); 

  window.location.href = authUrl;
};


</script>

<template>
<div class="login">
  <el-form :model="form"  :rules="rules" ref="formRef" label-width="120px" label-position="top" size="large">
    <div class="title">
      Wicresoft RecruitAI
    </div>

    <el-form-item label="email" prop="email">
      <el-input v-model="form.email" placeholder="Please enter your email"/>
    </el-form-item>

    <el-form-item label="password" prop="password">
      <el-input v-model="form.password" placeholder="Please enter your password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Login</el-button>
    </el-form-item>

    <div class="login-option-text">  
      —— Or Login Using Your Work Account ——
    </div> 

    <button type="button" class="icon-button" @click="loginWithMicrosoft">
      <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-microsoft" viewBox="0 0 16 16">
          <path d="M7.462 0H0v7.19h7.462V0zM16 0H8.538v7.19H16V0zM7.462 8.211H0V16h7.462V8.211zm8.538 0H8.538V16H16V8.211z"/>
      </svg>
    </button>

    
  </el-form>
</div>
</template>

<style lang="scss" scoped>
.title{
  color:rgba(0, 132, 255, 0.918);
  text-align: center;
  font-size:30px;
}

.login {
    background-color: #ddd;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items: center;

    .el-form{
        width: 300px;
        background:#fff;
        padding:30px;
        border-radius: 10px;
        
      

        .el-form-item{
            margin-top:20px;

            .a{
                text-decoration: none;
            }
        }

        .el-button{
            width:300px;
            margin-top:30px;
        }
    }
}

.login-option-text{
  margin-top: 10px; 
  font-size: 10px; 
  color: #999; 
  text-align: center; 
}

.icon-button{
  display: block;
  margin-top:10px;
  margin-left:auto;
  margin-right:auto;
  cursor:pointer;
  
}


</style>
