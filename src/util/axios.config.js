// axios拦截器配置

import axios from 'axios'

// 请求发出是时候的拦截
axios.interceptors.request.use(function (config) {

    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }, function (error) {

    return Promise.reject(error);
  });

// 请求的得到响应的拦截
axios.interceptors.response.use(function (response) {

    // console.log(response.headers)
    // 将authorization字段解构出来，方便token的保存
    const { authorization } = response.headers
    // 每次请求成功之后，都会把token保存到本地
    authorization&&localStorage.setItem("token", authorization)
    return response;
  }, function (error) {

    const {status} = error.response
    if(status === 401){
      localStorage.removeItem("token")
      window.location.href = "#/login"
    }
    return Promise.reject(error);
  });