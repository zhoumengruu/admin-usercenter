<template>
  <div class="manage-container">
    <div class="slide"></div>
    <div class="manage-main">
      <h3>商品管理
        <span>
          <el-popconfirm title="确定退出吗？" @onConfirm="confirmQuit">
          <el-button slot="reference" type="primary" plain icon="el-icon-back"></el-button>
          </el-popconfirm>
        </span>
      </h3>
      <div class="manage-warpper">
        <el-button type="primary" icon="el-icon-edit" class="add-btn" @click="handlerAdd">增加</el-button>
        <div class="table-box">
          <el-table :data="list" border style="width: 100%">
            <el-table-column prop="_id" label="ID" width="280"></el-table-column>
            <el-table-column prop="name" label="商品名称" width="420"></el-table-column>
            <el-table-column prop="image" label="商品图片" width="300">
              <template slot-scope="scope">
                <img :src=scope.row.image alt="" class="pro-img">
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button  @click="handleEdit(scope.$index, scope.row)" class="edit-btn" >编辑</el-button>
                <el-popconfirm title="确定删除吗？" @onConfirm="onConfirm(scope.row)">
                  <el-button slot="reference" type="danger"  class="del-btn">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div>
      <el-dialog :title="dialogStatus==='create'?'新增商品':'编辑商品'"  :visible.sync="dialogFormVisible" @close="closeModel">
        <el-form :model="proObj" :rules="rules" ref="modelForm">
          <el-form-item label="商品名称" :label-width="'100px'" prop="name">
            <el-input v-model="proObj.name" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="商品图片连接" :label-width="'100px'" prop="image">
            <el-input v-model="proObj.image" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="兑换所需积分" :label-width="'100px'" prop="price">
            <el-input v-model.number="proObj.price" autocomplete="off" type="number" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="toggleModel(false)">取 消</el-button>
          <el-button type="primary" @click="checkData">确 定</el-button>
        </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name:"management",
  data(){
    return{
      list:[], // 商品列表
      dialogFormVisible:false ,// 编辑 新增弹框
      modelTitle:'新增',// 弹框标题
      proObj:{},
      editList:{},
      rules:{
        name:[
          {required:true, message:'请输入商品名称', trigger: 'blur' },
        ],
        image:[
          {required:true, message:'请输入商品图片地址', trigger: 'blur' },
        ],
        price:[
          {required:true, message:'请输入兑换积分', trigger: 'blur' },
          {type: "number", message: '积分必须为数字值',}
        ]
      } ,// 增加或编辑的每一条商品数据
      dialogStatus:"create"// 编辑：update
    }
  },
  created(){
    this.getList()
  },
  methods:{
    confirmQuit(){
      localStorage.removeItem("userid"),
      this.$router.replace({
        name:'login'
      })
    },
    closeModel(){
      this.proObj={}
      this.$refs.modelForm.clearValidate()
    },
    async getList(){
      const data = await this.yGet("/admin/shopList") ;
      if(data){
        console.log("list-data",data);
        this.list = data;
      }
    },
    toggleModel(bool){
      this.dialogFormVisible=bool
      this.proObj={}
    },
    // 对新增或编辑商品数据格式校验
    checkData(){
      this.$refs.modelForm.validate((valid) => {
        if (valid) {
          if(this.dialogStatus==="create"){
            this.create();
          }else {
            this.update()
          }
        }else{
          return false
        }
      });      
    },
    // 创建商品
    async create(){
      // console.log(this.proObj);
      let params = this.proObj
       const data = await this.yPost("/admin/shopItem",params)
       if (data){
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        // 清空弹框内信息
        this.proObj = {}
        // 关闭弹框
        this.toggleModel(false)
        // 重新请求商品列表
        this.getList()
       }
    },
    // 删除商品
    async handleDelete(item) {
        // console.log(index, row);
        const params={
          id:item._id
        }
        // console.log(params);
        const data = await this.yDel("/admin/shopItem",params)
        console.log("delete-data",data);
        if(data){
          this.$message.error('删除成功');
        }
        this.getList()
      },
      // 重新编辑商品
    async update(){
      let params = {
        data:{
          _id:this.proObj._id,
          name:this.proObj.name,
          price:this.proObj.price,
          image:this.proObj.image,
        }
        
      }
      const data = await this.yPut("/admin/shopItem",params)
      if(data){
        this.$message({
        message: '修改成功',
        type: 'success'
      });
      }
      this.proObj = {}
      this.toggleModel(false)
      this.getList()

    },
    // 重新编辑商品
    async handleEdit(index,row){
      this.toggleModel(true)
      this.proObj = JSON.parse(JSON.stringify(row));
      this.dialogStatus="update"

    },
    onConfirm(item){
      this.handleDelete(item)
    },
    // 点击新增显示弹框修改弹框标题
    handlerAdd(){
      this.dialogStatus="create",
      this.toggleModel(true)
      console.log('当前dialogStatus', this.dialogStatus)
    }
        
  },
    
}

</script>
<style lang="scss">
  .manage-container{
    // position: relative;
    padding-left: 60px;
    .slide{
      width: 60px;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      background-color: #505050;
    };
    .manage-main{
      h3{
        font-size: 20px;
        padding: 20px 20px;
        margin: 0;
        box-shadow: 0 2px 4px #eee;
        span{
          float: right;
          margin-right: 50px;
        }
      };
      .manage-warpper{
         .add-btn{
          margin: 20px;
        };
        .table-box{
          padding: 20px;
         
        .pro-img{
          width: 100px;
          height: 120px;
        };
      }     
      }
    }
  }

</style>
