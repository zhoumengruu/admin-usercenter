<template>
	<div class="regist">
		<div class="regist-container">
			<div class="regist-left">
				<img src="../assets/auth.png" alt="">
			</div>
			<div class="regist-right">
				<h2>注册新用户</h2>
				<el-form :model="registForm" :rules="rules" ref="registForm"  class="demo-ruleForm" >
					<el-form-item  prop="name">
						<el-input v-model="registForm.username" placeholder="用户名：6位以上数字和英文组成"></el-input>
					</el-form-item>
					<el-form-item  prop="password">
						<el-input v-model="registForm.password" placeholder="密码" type="password"></el-input>
					</el-form-item>
					<el-form-item  prop="school">
						<el-input v-model="registForm.school" placeholder="学校"></el-input>
					</el-form-item>
					<el-form-item  prop="nickname">
						<el-input v-model="registForm.nickname" placeholder="昵称"></el-input>
					</el-form-item>
					<el-form-item  prop="age">
						<el-input v-model="registForm.age" placeholder="请输入年龄"></el-input>
					</el-form-item>
					<el-form-item  prop="gender">
						<el-select v-model="registForm.gender" placeholder="性别" style="width:300px">
							<el-option label="男" value="1" ></el-option>
							<el-option label="女" value="0" ></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<h5>已有账号？去<span @click="jumpLogin">登录</span></h5>
				<div>
					<el-button type="primary" class="regist-btn" @click="checkData">注册</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
  name: "regist",
	data(){
		return {
			registForm:{
        username:'',
        password:'',
        school:'',
        nickname:'',
        age:'',
        gender:''
      },
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            validateTag: function () {
              var reg = /^[A-Za-z0-9]{6}$/;
              if (reg.test(value)==false) {
                callback(new Error("请输入数字和英文"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          },
          { min: 6, message: '长度在至少为6位', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在至少为6位', trigger: 'blur' }
        ],
        school:[
          { required: true, message: '请输入学校', trigger: 'blur' },
        ],
        nickname:[
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        age:[
          { required: true, message: '请输入年龄', trigger: 'blur' },
        ],
        gender:[{ required: true, message: '请选择性别', trigger: 'blur' },]
      }
		}
  },
  methods:{
    // 检测验证，验证通过即注册成功
    checkData(){
        this.$refs.registForm.validate((valid) => {
            // console.log("valid",valid); 布尔值
        if (valid) {
            this.registUser();
        } else {
            console.log('error submit!!');
            return false;
        }
        });
    },
    // 跳转到登录页面
    jumpLogin(){
      this.$router.push({
        name:'login'
      })
    },
    async registUser(){
      let params = this.registForm
      // console.log("regist-data",params);

      const data = await this.yPost("/user/regist",params);
      console.log("post请求-data",data);

      if(data){
        this.$message({
        message: '注册成功，请登录',
        type: 'success'
        });
        this.registForm = {}
      }
      // const userid = data.user._id
      // localStorage.setItem("userid",userid)
      // 把data传给vuex
      // this.$store.commit("regist/registUserInfo",params)
      this.jumpLogin()
    },
  },
};
</script>
<style lang="scss">
  .regist{
	  .regist-container{
		display: flex;
		width: 1000px;
		height: 600px;
		margin: 100px 150px 100px 200px;
		border: 1px solid #eeeeee;
		box-shadow: 0 2px 6px #999;
		.regist-left{
			padding: 50px;
			img{
				width: 400px;
				height: 500px;
			}
		};
		.regist-right{
			padding: 20px 70px;
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
			.regist-btn{
				width: 300px;
        background-color: blueviolet;
        border: none;
			}
		}
	  }

  }
</style>

