

Docker安装Mongodb

# Mongodb介绍

**MongoDB** 是一个高性能，开源，无模式的文档型数据库，是当前**noSql**数据库产品中最热门的一种。它在许多场景下用于替代传统的关系型数据库或键值对存储方式，MongoDB是用C++开发，

### **MongoDB特点(没有列举全)**

- *面向集合（Collenction-Orented）*
  　　*意思是数据被分组存储在数据集中， 被称为一个集合（Collenction)。每个集合在数据库中都有一个唯一的标识名，并且可以包含无限数目的文档* 
-  *📌模式自由（schema-free)*
  　　*意味着对于存储在 MongoDB 数据库中的文件，我们不需要知道它的任何结构定义。提了这么多次"无模式"或"模式自由"，它到是个什么概念呢？例如，下面两个记录可以存在于同一个集合里面： {"welcome" : "Beijing"} {"age" : 25}* 

- *文档型*
  　　*意思是我们存储的数据是键-值对的集合,键是字符串,值可以是数据类型集合里的任意类型,包括数组和文档. 我们把这个数据格式称作 “BSON” 即 “Binary Serialized dOcument Notation.”* 

### **新建SpringBoot项目=>:** https://start.spring.io/

### **添加**<strong style='color:#0D96E8'>spring-boot-starter-data-mongodb,spring-boot-starter-web,lombok</strong>三个依赖就🆗了

#### 📌**pom.xml如下**

```erlang
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.2.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.crtxr</groupId>
    <artifactId>mongodb-demo</artifactId>
    <version>1.0</version>
    <name>mongodb-demo</name>
    <description>Demo project for Spring Boot-Mongodb</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

**配置**<strong style='color:#0D96E8'>application.properties</strong>

```properties
# Mongo database URI. Cannot be set with host, port and credentials.
# mongodb://<user>:<passwd>@<host>:<port>/<dbname>
spring.data.mongodb.uri=mongodb://txr:123456@192.168.201.130:13520/txr
#配置指定包的日志级别
logging.level.org.springframework.data.mongodb.core=debug
```

> 我靠怎么这么简单<strong style='color:#F44E3B'>(●'◡'●)</strong>

#### 📌新建<strong style='color:#0D96E8'>Account</strong>实体

```java
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

/**
 * 把一个java类声明为mongodb的文档，可以通过collection参数指定这个类对应的文档。
 * 若未加 @Document ，该 bean save 到 mongo 的 txr collection
 * 若添加 @Document ，则 save 到 account collection
 */
@Document(collection = "txr")
@Getter
@Setter
@ToString
public class Account {
    /**
     * @Id
     * 主键，不可重复，自带索引，可以在定义的列名上标注，需要自己生成并维护不重复的约束。
     * 如果自己不设置@Id主键，mongo会自动生成一个唯一主键，并且插入时效率远高于自己设置主键。
     原因可参考上一篇mongo和mysql的性能对比。
     * 在实际业务中不建议自己设置主键，应交给mongo自己生成，自己可以设置一个业务id，
     如int型字段，用自己设置的业务id来维护相关联的表。
     */
    @Id
    private String id;
    /**
     * @Field
     * 代表一个字段，可以不加，不加的话默认以参数名为列名。
     */
    @Field("name")
    private String name;
    @Field("age")
    private int age;

    @Field("weight")
    private double weight;
    @Field("loves")
    private List<String> loves;
    @Field("birthday")
    private Date birthday;
```

#### 📌<strong style='color:#0D96E8'>初始化用户信息</strong>

```java
  @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 初始化用户信息
     * 循环添加
     *
     * @author txr
     */
    public void initAccount() {
        for (int i = 1; i <= 5; i++) {
            Account account = new Account();
            account.setName("画玖" + i);
            account.setAge(18 + i);
            account.setWeight(43 + i);
            account.setBirthday(new Date(System.currentTimeMillis() + 2000 * i));
            mongoTemplate.save(account);
        }
    }

    /**
     * 初始化用户信息
     * 批量添加
     *
     * @author txr
     */
    public void initAccountBatch() {
        List<Account> accounts = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            Account account = new Account();
            account.setName("七爷" + i);
            account.setAge(19 + i);
            account.setWeight(58 + i);
            account.setBirthday(new Date(System.currentTimeMillis() + 5000 * i));
            accounts.add(account);
        }
        mongoTemplate.insert(accounts, Account.class);
    }

    /**
     * 初始化用户信息
     */
    @Test
    void inits() {
        initAccount();
        initAccountBatch();
    }
```

>**数据量大时，批量插入性能更优**

```json
//插入后的文档,只贴了两个。
/* 1 */
{
    "_id" : ObjectId("5e1c378d6826875708a14b80"),
    "name" : "画玖1",
    "age" : 19,
    "weight" : 44.0,
    "birthday" : ISODate("2020-01-13T09:25:35.663Z"),
    "_class" : "com.crtxr.mongodbdemo.document.Account"
}

/* 6 */
{
    "_id" : ObjectId("5e1c378d6826875708a14b85"),
    "name" : "七爷1",
    "age" : 20,
    "weight" : 59.0,
    "birthday" : ISODate("2020-01-13T09:25:38.783Z"),
    "_class" : "com.crtxr.mongodbdemo.document.Account"
}
```

> **咦!!!我的<strong style='color:#0D96E8'>loves</strong>属性怎么不见了,<strong style='color:#0A8A12'>mongodb的Starter直接</strong>忽略了为<strong style='color:#0D96E8'>null</strong>的属性不加入文档中**

#### 📌**查询用户**

```java
    /**
     * 查询用户
     */
    @Test
    void findAccount() {
        Query query = Query.query(Criteria.where("name").is("画玖1"));
        Account account = mongoTemplate.findOne(query, Account.class);
        System.out.println(String.format("通用查询account结果======>>>>>>>>>>%s", account));
        Account byId = mongoTemplate.findById(account.getId(), Account.class);
        System.out.println(String.format("根据Id查询account结果======>>>>>>>>>>%s", byId));
    }
```

**结果如下👇**

```json
/* 1 */
{
    "_id" : ObjectId("5e1c3cbc5b57a60936b6c491"),
    "name" : "画玖1",
    "age" : 19,
    "weight" : 44.0,
    "birthday" : ISODate("2020-01-13T09:47:42.773Z"),
    "_class" : "com.crtxr.mongodbdemo.document.Account"
}
```

#### 📌修改用户信息用户

```java
   /**
     * 修改用户信息用户
     */
    @Test
    void updateAccount() {
        //修改第一条     多条请使用updateMulti
        Query query = Query.query(Criteria.where("name").is("画玖1"));
        Update update = new Update();
        //如果有没有该就添加
        update.addToSet("loves").each("喜欢七爷", "喜欢女扮男装", "喜欢打抱不平", "画玖好像变胖了😒").set("weight", 49);
        UpdateResult result = mongoTemplate.updateFirst(query, update, Account.class);
        System.out.println(String.format("update-result结果======>>>>>>>>>>%s", result));
        Account updateAfter = mongoTemplate.findOne(query, Account.class);
        System.out.println(String.format("修改后的结果======>>>>>>>>>>%s", updateAfter));
    }
```

**执行结果如下👇**

```json
/* 1 */
{
    "_id" : ObjectId("5e1c3cbc5b57a60936b6c491"),
    "name" : "画玖1",
    "age" : 19,
    "weight" : 49,
    "birthday" : ISODate("2020-01-13T09:47:42.773Z"),
    "_class" : "com.crtxr.mongodbdemo.document.Account",
    "loves" : [ 
        "喜欢七爷", 
        "喜欢女扮男装", 
        "喜欢打抱不平", 
        "画玖好像变胖了😒"
    ]
}
```

> 初始化的时候是没有<strong style='color:#0D96E8'>loves</strong>属性的，但修改的时候<strong style='color:#0D96E8'>loves</strong>属性不为<strong style='color:#0D96E8'>null</strong>，**mongodb**动态新增了<strong style='color:#0D96E8'>loves</strong>属性，

#### 📌删除用户信息用户

```java
   /**
     * 条件删除集合
     */
    @Test
    void deleteByWhere() {
        //找到并删除weight大于等于22并且loves为null的第一条
        //(这里要注意虽然这里实际文档中不存在loves属性,但是{loves:null}的条件是成立的)
        // 删除多条使用findAllAndRemove
        mongoTemplate.findAndRemove(new Query(Criteria.where("weight").gte(22).and("loves").is(null)), Account.class);
          //删除所有的文档
         mongoTemplate.remove(new Query(), Account.class);
        //下面的命令是等价的前提是Account有@Document(collection = "txr")这个注解
        mongoTemplate.dropCollection(Account.class);
        mongoTemplate.dropCollection("txr");
    }
```
```
   /**
     * 分页查询用户信息
     */
    @Test
    void findAccountByLimit() {
        Query query = Query.query(Criteria.where("name").regex("七爷"));
        query.skip(2);
        query.limit(2);
        List<Account> accounts = mongoTemplate.find(query, Account.class);
        for (Account account : accounts) {
            System.out.println(String.format("分页结果======>>>>>>>>>>%s", account));
        }
    }
```





