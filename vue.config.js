const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  assetsDir: "static",
  // outputDir: 'dist',
  devServer: {
    proxy: {
      "/adminapi": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      }
    }
  }
})
