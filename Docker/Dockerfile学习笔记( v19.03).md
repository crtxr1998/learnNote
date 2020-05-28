# `Dockerfile`学习笔记( v19.03)

### 删除<none> 镜像

```
docker rmi $(docker images|grep '<none'|awk '{print $3}')
```

## 准备

- **新建个专门的目录**
```shell
  mkdir -p dockerlearn/learn-1 && cd dockerlearn/learn-1
```
### 基础命令学习

#### DockerFile关键字

- **FROM**

```
基础镜像，当前镜像所依赖镜像，基于docker镜像分层概念
```

- **MAINTAINER**

```
当前维护镜像人/组织
```

- **RUN**

```
镜像构建时需要运行的Linux命令
```

- **WORKDIR**

```
容器创建后默认目录
```

- **EXPOSE**

```
当前容器对外暴露端口
```

- **ENV**

```
用来构建镜像时设置的环境变量
```

- **ADD**

```
将宿主机目录下的文件COPY到镜像并且会自动解压（zip文件不支持解压），该文件路径必须与DockerFile一致，且宿主机文件路径为相对路径
```

- **COPY**

```
将宿主机目录下的文件COPY到镜像，不会自动解压
```

- **VOLUME**

```
数据卷容器, 用于保存和持久化
```

- **CMD**

```
指定容器启动过程中需要运行的命令, 多条只生效最后一条, 并且命令会被docker run之后的参数替换
```

- **ENTRYPOINT**

```
指定容器启动过程中需要运行的命令, 会把docker run命令的参数追加到后面
```

<hr/>

```shell
docker build -f /Dockerfile path .
```

- **-f :dockerfile的路径**(不指定会在当前执行命令的目录下寻找一个名为`Dockerfile`的文件)

- **.** <b style='color:#887ADE'>后面的点是指定docker 镜像构建过程中的上下文环境的目录 </b>

- **-t 镜像的名称** （可指定多个**-t**）

```shell
docker run -it --rm image /bin/bash
```

- **-it** ：这是两个参数，一个是 -i ：交互式操作，一个是 -t 终端。我们 这里打算进入 bash 执行一些命令并查看返回结果，因此我们需要交互式终 端。
- **--rm** ：这个参数是说容器退出后随之将其删除。默认情况下，为了排障需 求，退出的容器并不会立即删除，除非手动 docker rm， 我们这里只是随便 执行个命令，看看结果，不需要排障和保留结果，因此使用 --rm 可以避免 浪费空间。
- **/bin/bash** 进入容器后执行的命令（可使用**`&` `|`**组合）

### 指定docker构建的上下文

```shell
docker build -f /root/dockerlearn/learn-1/Dockerfile -t learn-1.0 /root/dockerlearn
```

- 默认在你指定的上下文环境中使用`Dockerfile`构建镜像

###  添加个res.txt，待会加入镜像中

```shell
curl http://www.baidu.com >res.txt
```

### **Dockerfile 内容**

```dockerfile
FROM busybox
ADD ./res.txt /
```

-  ** **busybox** **   一个精简的镜像 只有`1.16M`

-  **COPY** 和 **ADD** 命令不能拷贝**上下文`之外`**的本地文件 

- ```shell
  docker build -t learn-1.0 .
  ```

- ```shell
  Sending build context to Docker daemon  5.12 kB
  Step 1/3 : FROM scratch
   ---> 
  Step 2/3 : ADD ./res.txt /res
   ---> 8b3e634b76d5
  Removing intermediate container e23fe4d8080a
  Step 3/3 : CMD /bin/sh
   ---> Running in 362fe58de6ac
   ---> 5b53263ab1b2
  Removing intermediate container 362fe58de6ac
  Successfully built 5b53263ab1b
  `构建出错是不会生成镜像的，如果出错自己看出错原因`
  ```

- ```shell
  docker images
  ```

- ```shell
  learn-1.0           latest              5b53263ab1b2        34 seconds ago      1.22 MB
  ```

- ```shell
  docker run -it --rm learn-1.0   #用完后删除
  ```

- ```shell
  ls -l
  -rw-r--r--    1 root     root          2381 May 28 06:37 res.txt
  ```

- **OK简单的镜像制作完成**

  

## Format

Here is the format of the `Dockerfile`:

```
# Comment
INSTRUCTION arguments
```

- **must begin with a `FROM` instruction**.

