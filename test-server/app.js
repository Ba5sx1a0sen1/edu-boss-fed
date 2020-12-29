/* eslint-disable */
const path = require('path')


const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()


// 托管了 dist 目录， 访问 / 时，默认会返回托管目录的 index.html页面
app.use(express.static(path.join(__dirname, '../dist')))

app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
}))

app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}))

app.listen(3000, () => {
  console.log('running on port 3000......')
})
