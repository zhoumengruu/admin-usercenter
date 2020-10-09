<template>
  <div class="user-content">   
    <img src="../assets/woman-svg.svg" alt="" class="avatatImg">
    <div class="user-info">
        <div class="info-content">姓名：{{userinfo.username}}</div>
        <div class="info-content">学校：{{userinfo.school}}</div>
        <div class="info-content">昵称：{{userinfo.nickname}}</div>
        <div class="info-content">性别：{{userinfo.gender}}</div>
        <div class="info-content">密码：*******
          <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
          <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :append-to-body=true>
            <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="150px" class="demo-ruleForm">
              <el-form-item label="旧密码" prop="oldPassword">
                <el-input type="password" v-model="passwordForm.oldPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="passwordForm.newPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input type="password" v-model="passwordForm.checkPassword" autocomplete="off"></el-input>
              </el-form-item> 
              <el-form-item>
                <el-button type="primary" @click="checkForm">提交</el-button>
                <el-button @click="resetForm('passwordForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div> 
        
    </div>
    
  </div>
  
</template>

<script>
export default {
  name: "userinfo",
  data(){ 
    // 验证旧密码
    var validateOld = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入6位旧密码'));
        } else {
          if(value !== this.userinfo.password){
            callback(new Error('旧密码输入错误'));
          }else if(this.passwordForm.newPassword !== ''){
            this.$refs.passwordForm.validateField('newPassword');
          }
          callback()
        }        
      };
    // 验证新密码
    var validateNew = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入6位新密码'));
        } else if(this.passwordForm.checkPassword !== ''){
            this.$refs.passwordForm.validateField('checkPassword');
        }
        callback()
    };
    // 验证确认密码
    var validateCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordForm.newPassword){
          callback(new Error('两次输入密码不一致!'));         
        } else{
          callback()
        }
    };
    return{
      userinfo:{},
      dialogFormVisible: false,
      passwordForm:{
        oldPassword:'',
        newPassword:'',
        checkPassword:''
      },
      rules: {
        oldPassword: [
          { validator: validateOld, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNew, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validateCheck, trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    console.log(1111111);
    this.getUserInfo()
  },
  methods:{
    // 修改密码
    async changePassword(){
      let params = {  
        oldPassword:this.passwordForm.oldPassword,
        newPassword:this.passwordForm.newPassword
      }
      console.log("修改的密码",params);
      const data = await this.yPut("/user/changePassword",params)
      console.log("修改密码的data",data);
      this.dialogFormVisible = false
    },
    // 检测密码
    checkForm(){
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.changePassword()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置密码
    resetForm(passwordForm) {
      this.$refs[passwordForm].resetFields();
    },
    // 获取用户信息
    async getUserInfo(){
      let id = localStorage.getItem("userid")
      // console.log("用户id===>",id)
      const data = await this.yGet("/user/userinfo",{ params : {
          id
      } })
      console.log("data==>",data);
      this.userinfo = data
      console.log("this.userinfo===>",this.userinfo);
      if(this.userinfo.gender == 0){
        this.userinfo.gender = "女"
      }else{
        this.userinfo.gender = '男'
      }
    }
  }
};
</script>

<style lang="scss">
.user-content{
  width: 1120px;
  margin-top: 20px;
  display: flex;
    
    .avatatImg{
        width: 80px;
        height: 80px;
        margin: 80px 50px 0 100px;
        // border: 1px solid #000;
    };
    .user-info{
        width: 100%;
        height: 200px;
        padding: 100px 80px ;
        display: flex;
        flex-wrap: wrap;
        .info-content{
            width: 300px;
            height: 50px;
            margin-right: 50px;
            
        }
    }
}
</style>
