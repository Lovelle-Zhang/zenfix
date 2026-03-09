# Zenfix 快速部署指南

## 方案1: Vercel (推荐 - 最快)

1. 访问 https://vercel.com
2. 用GitHub账号登录
3. 点击 "Import Project"
4. 上传 `web` 文件夹
5. 自动部署完成

**优势**: 零配置，自动HTTPS，全球CDN

## 方案2: Netlify

1. 访问 https://netlify.com
2. 拖拽 `web` 文件夹到页面
3. 自动部署

## 方案3: 阿里云 (需要服务器)

需要手动配置Nginx + PM2，较复杂。

**建议先用Vercel快速上线，验证功能后再考虑迁移到阿里云。**
