

## 启动`Jenkins`

```powershell
docker run --name jenkins --restart=always  -p 8888:8080 -p 50000:50000 -v /root/jenkins-data:/var/jenkins_home -v /etc/localtime:/etc/localtime jenkinsci/blueocean
```

- 确保挂在的目录有`读写`权限  
- 如果没有`chmod 777 目录` 

## 进入`Jenkins`容器

```powershell
docker exec -it jenkins /bin/bash
```

## 查看`Jenkins`容器日志

```powershell
 docker logs [...options] jenkins
-f : 跟踪日志输出
--since :显示某个开始时间的所有日志
-t : 显示时间戳
--tail :仅列出最新N条容器日志
```

查看`Jenkins`容器`环境变量`

```
docker exec -it jenkins /bin/bash
env    
```

### 全局工具配置

- **系统管理`>`全局工具配置**   ` (没有就选下载)`



#### 配置`Maven` Settings

- **系统管理`>`Managed files（没有就去插件市场去安装）**

- **使用：** **系统管理`>`全局工具配置** `>`**默认setting提供** `>` **选择Provided settings.xml** `>`**选择你创建的名称**

