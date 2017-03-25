# unpkg-server
unpkg server + webhook

重复利用服务器资源，讲 unpkg server 和 webhook 服务端结合

webhook 路径路由到 `/_webhook_` 下，其它路由跟 unpkg.com 一致

## 关于 webhook

目前 webhook 接收发送方（GitLab）发过来的 push 事件，存到本地数据库中（如果是同一仓库的同一分支则更新）

当 CI 机器轮询 fetch 一次 `/_webhook_` 时数据库里存储的事件会被清空
