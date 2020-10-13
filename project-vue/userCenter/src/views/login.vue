<template>
	<div class="login">
		<div class="login-container">
			<div class="login-left">
				<img src="../assets/auth.png" alt="">
			</div>
			<div class="login-right">
				<h2>欢迎登录</h2>
				<el-form :model="loginForm" :rules="rules" ref="loginForm"  class="demo-ruleForm" >
					<el-form-item  prop="username">
						<el-input v-model="loginForm.username" placeholder="请输入您的用户名"></el-input>
					</el-form-item>
					<el-form-item  prop="password">
						<el-input v-model="loginForm.password" placeholder="请输入您的密码" type="password"></el-input>
					</el-form-item>
				</el-form>
				<h5>还没有账号？<span @click="jumpRegist">新用户注册</span></h5>
				<div>
					<el-button type="primary" class="login-btn" @click="checkData">登录</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
  name: "login",
	data(){
		return {
			loginForm:{
				username:'',
				password:''
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
				],
			}
		}
	},
	methods:{
		checkData(){
            this.$refs.loginForm.validate((valid) => {
            if (valid) {
                this.login();
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
		jumpRegist(){
			this.$router.push({
				name:'regist'
			})
		},
		async login(){
			let params = this.loginForm
			const data = await this.yPost('/user/login',params);
			console.log("login-data",data);
			if(data){
				// 存入localstorage
                const userid = data.user._id
				localStorage.setItem("userid",userid)
				// console.log("params===>",params);
				// id存入vuex中
      			this.$store.commit("login/addUserInfo",data)				
                this.$router.push({
                    name:"user"
                })
            }
		}
	},
};
</script>
<style lang="scss">
  .login{
	  .login-container{
		display: flex;
		width: 1000px;
		height: 600px;
		margin: 100px 150px 100px 200px;
		border: 1px solid #eeeeee;
		box-shadow: 0 2px 6px #999;
		.login-left{
			padding: 50px;
			img{
				width: 400px;
				height: 500px;
			}
		};
		.login-right{
			padding: 150px 100px;
			h2{
			text-align-last: center;
			};
			h5{
				text-align: center;
				font-size: 14px;
				font-weight: 400;
				span{
					color: blueviolet;
					cursor: pointer;
				}
			};
			.login-btn{
				width: 300px;
				background-color: blueviolet;
				border: none;
			}
		}
	  }

  }
</style>
