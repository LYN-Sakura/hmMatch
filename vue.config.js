module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // 需要更改
        target: 'http://127.0.0.1:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
