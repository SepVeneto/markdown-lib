## url传递token 安全性

## 关于部署
### 独立部署：存在跨域的问题
1. resposne header设置`Access-Control-Allow-Origin`
2. 依赖nginx做反向代理
### 部署在同一个端口：不存在跨域的问题
1. 后端对请求地址做转发
2. 依赖nginx对web文件目录做映射

### 后端
1. 调度器issueweb需要在跳转的url上拼接token
2. 不需要对management做改动

## 其它
针对老系统与openApi管理平台耦合的部分需要实现一套通信机制，比如模块之间跳转