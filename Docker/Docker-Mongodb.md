### 使用Docker安装 mongodb

- **拉取镜像**

  ```latex
  $ docker pull mongo:latest
  ```

- **查看镜像**

  ```latex
  $ docker images
  ```

  ![112](https://raw.githubusercontent.com/crtxr1998/learnNote/master/Docker/images/Docker-Mongodb/1.png)

- **运行容器**

  安装完成后，我们可以使用以下命令来运行 mongo 容器：

  ```latex
  $ docker container run -itd --name mongo13520 -v mongodbdata:/data/db -p 13520:27017 mongo --auth
  ```

  **参数说明**：

  - **-p** ：映射容器端口，规则：<strong style='color:#089EF9'>宿主port：容器port</strong>，外部可以直接通过 **宿主机ip:13520**访问到 **mongo** 的服务。
  - **--auth**：需要密码才能访问容器服务。
  - **--name** 容器的名称
  - **-v** 存储卷挂载
  - **--restart=always** 自启动
  - **-itd** 是**-i**、**-t**、**-d** 的简写
    - **-i**  以交互模式运行容器，通常与 **-t** 同时使用；
    - **-t** 为容器重新分配一个伪输入终端，通常与 **-i** 同时使用；  
    - **-d**  分离，后台运行容器，并返回容器ID； 

-  **查看已运行的容器**


  ```latex
  $ docker ps
  ```

  ![1253](https://raw.githubusercontent.com/crtxr1998/learnNote/master/Docker/images/Docker-Mongodb/2.png)

**进入容器**

```latex
$ docker exec -it mongo13520 mongo admin
```

![](https://raw.githubusercontent.com/crtxr1998/learnNote/master/Docker/images/Docker-Mongodb/3.png)

**创建用户及密码并授予权限**

```mariadb
db.createUser({ user:'txr',pwd:'123456',roles:[ { role:'dbOwner', db: 'admin'}]});
```

![4](https://raw.githubusercontent.com/crtxr1998/learnNote/master/Docker/images/Docker-Mongodb/4.png)

验证用户密码

```mariadb
>db.auth('txr', '123456')
>1
```

### 权限具体说明

**Built-In Roles（内置角色）：**

```assembly
1. 数据库用户角色：read、readWrite; 
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager； 
4. 备份恢复角色：backup、restore； 
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase 
6. 超级用户角色：root 
// 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
```

**权限具体说明**

```assembly
Read：允许用户读取指定数据库
readWrite：允许用户读写指定数据库
dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
clusterAdmin：只在db数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
root：只在admin数据库中可用。超级账号，超级权限
```

**MongoDB常用命令**

```assembly
show dbs #显示数据库列表 
show collections #显示当前数据库中的集合（类似关系数据库中的表）
show users #显示用户
use dbname #切换当前数据库，如果数据库不存在则创建数据库。 
db.help() #显示数据库操作命令，里面有很多的命令 
db.foo.help() #显示集合操作命令，同样有很多的命令，foo指的是当前数据库下，一个叫foo的集合，并非真正意义上的命令 
db.foo.find() #对于当前数据库中的foo集合进行数据查找（由于没有条件，会列出所有数据） 
db.foo.find( { a : 1 } ) #对于当前数据库中的foo集合进行查找，条件是数据中有一个属性叫a，且a的值为1
```

**MongoDB**没有创建数据库的命令，但有类似的命令。 如：如果你想创建一个**dbname**的数据库，先运行**use dbname**命令，之后就做一些操作（如：**db.createCollection(‘name’)）**,这样就可以创建一个名叫**dbname**的数据库。

📌要注意的是如果当前操作的user 没有这个**db**的读写权限是会抛出**UnAuthorized**异常的

```tiki wiki
db.txr.insertOne({name:'txr',sex:'男'}); //添加一个文档
db.txr.insertOne({name:'txr',sex:'男',age:21}); //多加个属性
db.txr.find({name:'txr'})    //查询Collections=txr&&name=txr的文档结果
db.txr.remove({"_id" : ObjectId("5e0ee856e69cfe4c50ae56ae")})  //删除指定ID的文档
db.txr.remove({"name" : "txr"})  //删除name=txr的所有文档
```

```tiki wiki
/* 1 */
{
    "_id" : ObjectId("5e0f190ce69cfe4c50ae56b2"),
    "name" : "txr",
    "sex" : "男"
}

/* 2 */
{
    "_id" : ObjectId("5e0f190ce69cfe4c50ae56b3"),
    "name" : "txr",
    "sex" : "男",
    "age" : 21.0
}
```



------



### GUI工具推荐**小绿**

[<strong style='color:green'>Robot3t-DownloadLinkForWindows</strong>]( https://download-test.robomongo.org/windows/studio-3t-robo-3t-windows-double-pack.zip)

[<strong style='color:green'>Robot3t-DownloadLinkForMac</strong>]( https://download-test.robomongo.org/mac/studio-3t-robo-3t-mac-double-pack.zip)

![4](https://raw.githubusercontent.com/crtxr1998/learnNote/master/Docker/images/Docker-Mongodb/5.png)

![4](https://raw.githubusercontent.com/crtxr1998/learnNote/master/Docker/images/Docker-Mongodb/6.png)