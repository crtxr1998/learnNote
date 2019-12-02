# 安装流程

- **安装docker与docker-compose**
- **这里不做演示自行百度☺**

#### docker-compose文件下载地址:[docker-compose.yml](https://article-picture-resource-1300779066.cos.ap-chengdu.myqcloud.com/resource/solo%E5%8D%9A%E5%AE%A2/docker-compose.yml)

- 上传文件至服务器
- 在当前文件下执行**docker-compose up -d**

- ```shell
  # docker安装的mysql默认允许远程连接，可以使用Navicat等软件连接数据库
  # 进入容器mysql()
  docker exec -it mysql bash
  
  # 进入数据库 p后面跟你的密码
  mysql -uroot -pXXX
  
  # 创建数据库(数据库名:solo;字符集utf8mb4;排序规则utf8mb4_general_ci)
  create database solo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
  # 出现Query OK, 1 row affected (0.00 sec)表示成功
  #退出数据库
  exit
  #退出容器
  exit
  
  ```



- **docker-compose down** 停止

- **docker-compose up -d**  重新启动

  

#### 皮肤挂载

> --v /dockerData/solo/skins/:/opt/solo/skins/ 

## 数据库占用内存过大优化

由于我们购买的服务器是内存只有 1G，然后 docker 安装的 MySQL 虽然很快，但是实际上占用内存非常大，之前服务器在腾讯云的时候就经常挂掉，排查了很久才发现是 docker 下 MySQL 的问题，迁移到阿里云后倒是没出先挂掉的问题，但是服务器内存占用也一直在 90% 以上，所以我们对 MySQL 容器进行一些优化。
 由于容器内不能 VIM，所以我们将 MySQL 的配置文件复制到服务器上改了之后再复制回去，也可以将配置文件挂载到服务器上，过程我不多讲，只讲核心部分。

 这里注意，如果你要删除容器重新挂载的话，请提前备份 MySQL 数据，不然你就属于删库了
 这里注意，如果你要删除容器重新挂载的话，请提前备份 MySQL 数据，不然你就属于删库了
 这里注意，如果你要删除容器重新挂载的话，请提前备份 MySQL 数据，不然你就属于删库了
 重要的话说三遍

在配置文件`/etc/mysql/mysql.conf.d/mysqld.cnf`中添加

```shell
performance_schema_max_table_instances=400
table_definition_cache=400
table_open_cache=256
performance_schema_max_table_instances=400
table_definition_cache=400
table_open_cache=256
# 从容器中复制到服务器
docker cp mysql:/etc/mysql/mysql.conf.d/mysqld.cnf /dockerData/mysql
# 从服务器复制到容器
docker cp /dockerData/mysql/mysqld.cnf mysql:/etc/mysql/mysql.conf.d/mysqld.cnf
```

改完之后记得重启 MySQL，`docker restart mysql`