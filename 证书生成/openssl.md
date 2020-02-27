**创建私钥**

> genrsa -des3 -out zs/solo.key 1024
>
> password: solo

**创建csr证书**

> req -new -key zs/solo.key -out zs/solo.csr

**填写信息**

最重要的是Common Name，这里输入的就是我们要用https访问的域名

> Country Name (2 letter code) [AU]:**CN**
> State or Province Name (full name) [Some-State]:**Hunan**
> Locality Name (eg, city) []:**Changsha**
> Organization Name (eg, company) [Internet Widgits Pty Ltd]:**solo**
> Organizational Unit Name (eg, section) []:**solo**
> Common Name (e.g. server FQDN or YOUR name) []:www.txrsolo.com
> Email Address []:1770664399@qq.com
>
> Please enter the following 'extra' attributes
> to be sent with your certificate request
> A challenge password []:**solo**
> An optional company name []:**solo**

**去除密码**

> 在加载SSL支持的Nginx并使用上述私钥时除去必须的口令，否则会在启动nginx的时候需要输入密码。
>
> 复制solo.key并重命名为solo.key.org。

> openssl rsa -in zs/solo.key.org -out zs/solo.key

**生成crt证书**

> openssl x509 -req -days 365 -in zs/solo.csr -signkey zs/solo.key -out zs/solo.crt





























































































































































