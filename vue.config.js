const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:"./",
  assetsDir:"static",
  devServer:{
    proxy:{
      "/adminapi":{
        target:"http://127.0.0.1:3000",
        changeOrigin:true,
      }
    }
  }
})
