<template>
    <div class="login-container">
        <div class="login-main">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" @click="checkData">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return{
            loginForm:{
                username:'',
                password:'',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
          }
        }
    },
    methods:{
        checkData(){
            this.$refs.loginForm.validate((valid) => {
                // console.log("valid",valid); 布尔值
            if (valid) {
                this.login();
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        async login(){
            console.log("data",this.loginForm);
            const data = await this.yPost('/user/login',this.loginForm);
            // console.log("login-data",data);
            if(data){
                const userid = data.user._id
                localStorage.setItem("userid",userid)
                this.$router.push({
                    name:"management"
                })
            }
        }
    }
}
</script>
<style lang="scss">
    .login-container{
        .login-main{
            width: 400px;
            border: 1px solid #f3f3f3;
            margin: 100px auto;
            padding: 70px;
            box-shadow: 0 3px 10px #eeeeee;
            .login-btn{
                width: 300px;
            }
        }

    }
</style>