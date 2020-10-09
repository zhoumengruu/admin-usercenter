import axios from "axios"
import Config from "./config"

var api =axios.create({
    baseURL:Config.baseUrl,
    timeout:300000,
});

api.interceptors.request.use((config) =>{
    const userid = localStorage.getItem('userid') || ""
    if(userid){
      console.log("userid",userid);
      config.headers['user'] = userid
    }   
    return config;
},(error)=>{
    return Promise.reject(error);
  });

  const post = async (url,data) => {
      const response = await api.post(url,data).catch(error =>{
        errorHandler(error)
      })
      return responseHandler(response)
  }
    const get = async (url,data) => {
    const response = await api.get(url,data).catch(error =>{
      errorHandler(error)
    })
    return responseHandler(response)
  }
  const del = async (url,data)=>{
    const response = await api.request({data,url,method:'delete'})
    .catch(error =>{
      errorHandler(error)
    });
    return responseHandler(response)
 }
  const put = async (url,data)=>{

    const response = await api.put(url,data)
    .catch(error =>{
        errorHandler(error)
    })
    return responseHandler(response)

  }

  // 统一处理错误信息
  const errorHandler = (error) =>{
    console.log("error",error);
    let errorMsg = (error.response && error.response.data && error.response.data.message) || '请求错误，请重置'
    console.log("////",errorMsg)  
  }

  const responseHandler = (response) =>{
      console.log("response",response);
      if(response && response.status === 200){
        if(!response.data){
            return {}
        }
        return response.data
      }
      return null
  }

  export {post,get,del,put}