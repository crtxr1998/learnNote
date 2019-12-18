# docker-compose安装solo博客流程

**安装docker及docker-compose(新版本自带)**

- ```shell
  #出问题自行谷歌或百度，不作过多赘述
  yum install curl -y && curl -fSsL get.docker.com |CHANNEL=stable sh 
  systemctl start docker 
  systemctl enable docker 
  docker version
  ```

#### docker-compose文件下载地址:[docker-compose.yml](https://article-picture-resource-1300779066.cos.ap-chengdu.myqcloud.com/resource/solo-blog/docker-compose.yml )

- 上传文件至服务器

- vim .env

- ```shell
  host=192.168.201.130
  scheme=http
  mysql_prot=3306
  solo_prot=8080
  ```

- 在当前文件下执行**docker-compose up -d**

- ```shell
  # docker安装的mysql默认允许远程连接，可以使用Navicat等软件连接数据库
  # 进入容器mysql()
  docker exec -it mysql5 bash
  
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

  ------
  
  

## 数据库占用内存过大优化(官网copy的)

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

# 使用Linux定时更新solo博客镜像

检查工具包crontabs

> rpm -qa | grep -i crontabs 

 crontab安装

> yum -y install crontab

启动 crontabs

> systemctl start crond

编写定时脚本

> vim /docker-restart.sh 
>
> ```shell
> #!/bin/bash
> 
> #
> # Solo docker 更新重启脚本
> #
> # 1. 请注意修改参数
> # 2. 可将该脚本加入 crontab，每日凌晨运行来实现自动更新
> #
> 
> cd /root/solo-blog/solo-in-docker-master/http
> /usr/local/bin/docker-compose  down
> docker rmi b3log/solo
> /usr/local/bin/docker-compose up -d
> ```

授予脚本运行权限

> chmod -R 777 ./docker-restart.sh 

给当前用户添加定时任务

>crontab -e
>
>```sh
>#每天 每隔3分钟执行一次
>/3 * * * * /root/solo-blog/crontab/docker-restart.sh
>```

查看当前用户的定时任务

>crontab -l

查看定时任务执行日志(检查定时任务是否真的执行了)

> tail -f 10 /var/log/cron

查看脚本邮件（root未用户名）

> cat /var/spool/mail/root

Linux重命名文件（使用mv命令）

> mv  <path/原文件名>  <path/命名后文件名>

docker-compose启动

> docker-compose -f /root/solo-blog/solo-in-docker-master/http/docker-compose.yml up -d

docker-compose停止

>docker-compose -f /root/solo-blog/solo-in-docker-master/http/docker-compose.yml  down  

# solo博客美化👇

#### 添加播放器

📌CPlayer播放器

```html
<!--head头-->
<div style="position: fixed;right: 1%;top: 5%;z-index: 999;" id="cplayer">
</div>


<!--footer页脚-->
<script src="https://raw.githack.com/crtxr1998/learnNote/master/resource/solo/APlayer/js/loves.js"></script>
<script src="https://raw.githack.com/crtxr1998/learnNote/master/resource/solo/cplayer/js/cplayer.js"></script>
<script src="https://raw.githack.com/crtxr1998/learnNote/master/resource/solo/cplayer/js/excplayer.js"></script>
```



📌APlayer播放器

```html
<!--head头-->
<link rel="stylesheet" href="https://raw.githack.com/crtxr1998/learnNote/master/resource/solo/APlayer/css/APlayer.min.css">

<div id="aplayer"  style='position: fixed;top:10%;right:2%;z-index: 999;'></div>


<!--footer页脚-->
<script src="https://raw.githack.com/crtxr1998/learnNote/master/resource/solo/APlayer/js/loves.js"></script>
<script src="https://raw.githack.com/crtxr1998/learnNote/master/resource/solo/APlayer/js/APlayer.min.js"></script>
<script src="https://raw.githack.com/crtxr1998/learnNote/master/resource/solo/APlayer/js/exAPlayer.js"></script>

```



📌换肤功能

```html
<div id="skin"  onclick="changeSkin();"></div>
<script src="https://raw.githack.com/crtxr1998/learnNote/master/resource/solo/Skin/js/changeskin.js"></script>
```

