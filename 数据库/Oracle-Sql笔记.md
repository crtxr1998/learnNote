# DDL创建表和创建约束的Sql语法(Oracle与Mysql大同小异)

**创建表的语句**

```plsql
 ---1、创建模拟的数据表 ---
  --1.1.创建学生表Student
  create table Student(
         StuId NUMBER NOT NULL,     --学生ID
         StuName VARCHAR2(10) NOT NULL, --名称
         Gender VARCHAR2(10)NOT NULL,  -- 性别
         Age NUMBER(2) NOT NULL,    -- 年龄     
         JoinDate DATE NULL,       --入学时间
         ClassId NUMBER NOT NULL,   --班级ID
         Address VARCHAR2(50) NULL   --家庭住址           
  ); 
  --1.2、创建班级表StuClass 
  create table StuClass(
       classId NUMBER not null,     -- 班级ID
       ClassName varchar2(20) not null,  --班级名称
       Notes varchar2(50) null default'班级信息',  --备注，默认班级信息
  ); 
```

**创建约束的语句**

```plsql
  ----2、创建数据表的约束---
  --2.1）创建主键约束--
  alter table Student add constraint PK_Student_StuId primary key(StuId);
  alter table StuClass add constraint PK_StuClass_ClassId primary key(ClassId);
  --2.2) 创建检查约束--
  alter table Student add constraint CK_Student_Gender check(gender='男' or gender='女');
  alter table Student add constraint CK_Student_Age check(Age>=0 and Age<=100);
  --2.3)创建唯一约束--
  alter table Student add constraint UQ_Student_StuName unique(StuName);
  --2.4)创建默认约束--
  --alter table Student add constraint DF_Student_Address default('地址不详');
  alter table Student Modify Address varchar(50) default '地址不详';
  alter table Student Modify JoinDate Date default sysdate;
  --2.5)创建外键约束--
  alter table Student add constraint FK_Student_StuCLass_ClassId 
  foreign key(ClassId) references StuClass(ClassId);
```
**创建索引操作**

```plsql
1、创建索引

create index <INDEXNAME> on <TABLENAME>(<COLUMN1>);

2、删除索引

drop index <INDEXNAME>;

3、创建组合索引

create index <INDEXNAME> on <TABLENAME> (<COLUMN1>,<COLUMN2>);

4、定期的重构索引: 

ALTER INDEX <INDEXNAME> REBUILD <TABLESPACENAME> 

5、查看目标表中已添加的索引

    --在数据库中查找表名
    SELECT * from user_tables where  table_name like 'tablename%';

    --查看该表的所有索引
    SELECT * from all_indexes where table_name = 'tablename';

    --查看该表的所有索引列
    SELECT * from all_ind_columns where table_name = 'tablename';

6、查询时强制指定索引(一定要使用别名，不然不生效)
SELECT /*+INDEX(mmp <INDEXNAME>)*/* FROM TB_BIZ_JZGJBXX mmp
```
## 数据库基本查询语句作用

| **SELECT* FROM V$VERSION;**                                  | **查看数据库版本信息** |
| ------------------------------------------------------------ | ---------------------- |
| **SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());** | **显示执行计划**       |
| **EXPLAIN PLAN FOR  ······**                                 | **需要执行计划的语句** |

注意：创建表还是约束，与SQL Server基本相同，注意：在Oracle中default是一个值，而SQL Server中default是一个约束，

因此Oracle的default设置可以在建表的时候创建或者通过Modify函数创建

**添加模拟的数据**

```plsql
  --3、添加模拟的数据--
  --3.1）添加班级信息
  insert into StuClass(ClassId,Classname) values(1,'一班');
  insert into StuClass(ClassId,Classname) values(2,'二班');
  insert into StuClass(ClassId,Classname) values(3,'三班');
   --3.2）添加学生信息
  insert into Student(StuId,Stuname,Gender,Age,ClassId)
  values(1,'关羽','男',17,1);
  insert into Student(StuId,Stuname,Gender,Age,ClassId)
  values(2,'张飞','男',16,2);
   insert into Student(StuId,Stuname,Gender,Age,ClassId)
  values(3,'刘备','男',18,3);
```

# Oracle的Sql优化笔记

## 使用工具

- **Navicat      <b style='color:red'>没有Tree结构看死人</b>**
- **PLSQL         <b style='color:red'>建议</b>**

## Oracle优化软件

- **Tosska SQL Tuning Expert**      <b style='color:red'>自动化优化工具 </b>           

## 参考文章

[关于Oracle的sql优化,Navicat的使用](https://mp.weixin.qq.com/s/YI40HEZck49nnHXouSKZOw)

[Oracle常用优化一](https://mp.weixin.qq.com/s/OoBSxFI1dCI7RTgMu2jcbQ)

[Oracle常用优化二](https://mp.weixin.qq.com/s/1ZsqKuqbgf9p0WaawS_vTA)

[Oracle常用优化三](https://mp.weixin.qq.com/s/4JmLTlcocGxR82n9YIo2JQ)

[Oracle常用优化四](https://mp.weixin.qq.com/s/dX2oKY2hAuFL2kELRyJ9XA)

[Oracle常用优化五](https://mp.weixin.qq.com/s/sfZAis-B67Ff7aWJis8kMA)

[Oracle常用优化六](https://mp.weixin.qq.com/s/8EolcaU2MljalnleV78wBg)

[Oracle 数据库常用操作语句](https://mp.weixin.qq.com/s/IHscA2DL9plqMe_GsOkbGQ)

[Oracle SQL高手必知的调优方法 <一>](https://mp.weixin.qq.com/s/ChnuQ6PshxtkaBT4eXlfww)

[Oracle SQL 高手必知的调优方法 <二>](https://mp.weixin.qq.com/s/KKvAvjHCrrN8P09Nu9zyKQ)

[Oracle SQL 高手必知的调优方法 <三>](https://mp.weixin.qq.com/s/odVSiK3VUCBa7T5OlILd6A)

[Oracle SQL 高手必知的调优方法 <四>](https://mp.weixin.qq.com/s/_1K-1Kr9WnYYCj5ZURFBqg)

[Oracle SQL性能优化40条](https://mp.weixin.qq.com/s/GCS2m03zAfXoQdFBhy0JXw)

[关于Oracle的sql优化](https://mp.weixin.qq.com/s/YI40HEZck49nnHXouSKZOw)



### 相关的概念

- **Rowid的概念**
  rowid是一个伪列，这个列不是用户定义而是系统自己给加上的。每个表都有一个rowid的伪列，表中并不物理存储ROWID的值，但可以像使用其他列那样使用它，只是不能删除修改该列。一旦一行数据掺入数据库，则rowid在该行的生命周期内是唯一的，即使该行产生行迁移，行的rowid也不会改变。
- **Recursive SQL概念**
  为了执行用户发出的一个sql语句，Oracle必须执行一些额外的语句，我们将这些额外的语句称之为'recursive calls'
- **Row Source行源**
  用在查询中，由上一操作返回的符合条件的行的集合，既可以是表中全部的行数据的集合，也可以是表的部分行数据的集合；
- **Predicate谓词**
  一个查询中WHERE限制条件
- **Driving Table驱动表**
  驱动表又称外层表(OUTER TABLE)。这个概念用于嵌套连接和HASH连接中，如果该row source返回较多的行数据，则对后续操作有负面影响。一般说来，应用查询条件的限制后，返回较少行源的表作为驱动表，所以一个达标在where条件后返回较少数据，则大表也合适作为驱动表，并不是只有较小的表可以作为驱动表。
- **Probed Table**
  该表通常被称作内层表(INNER TABLE)。从驱动表获取的具体一行的数据，需要在该表中寻找符合连接条件的行。所以数据量较大，且在相应连接列上有索引的表适合做为内层表。
- **组合索引**
  顾名思义，组合索引就是由多个列组成的索引。组合索引中的第一个列被称作引导列(LEADING COLUMN)，只有限制条件中包含引导列时，该限制条件才会使用该组合索引

### Oracle访问数据的方法

- **全表扫描(FULL TABLE SCANS,FTS)**
   为实现全表扫描，Oracle读取表中所有的行，并检查每一行是否满足语句的where条件。一个多块读操作可以使一次I/O能读取多块数据(db_block_multiblock_read_count参数设定)，而不是只读取一个数据块，这极大的减少了I/O的总次数，提高了系统的吞吐量，所以利用多块读的方法可以十分高效的实现全表扫描，而且只有在全表扫描的情况下才能使用多块读操作。使用FTS的前提条件：在较大的表上不建议使用全表扫描，除非取出的数据比较多，超过总量的5%-10%，或者想使用并行查询功能。
- **通过ROWID(TABLE ACCESS BY ROWID)**
   行的ROWID指出了该行所在的数据文件，数据块及该行在该块中的位置，所以通过ROWID来存取数据可以快速定位到目标数据上，是Oracle存取单行数据的最快方法。
- **索引扫描(INDEX SCAN/INDEX LOOKUP)**
   通过Index先查找到数据对应的rowid值，然后根据rowid直接从表中得到具体的数据，这种查找方式称为索引扫描。在索引中，除了存储每个索引的值外，索引还存储具体此值的行对应的ROWID值。
   索引扫描由两步组成：

```flow
st=>start: 扫描索引得到rowid
e=>end: 通过rowid读出数据

st->e
```

每步都是一次单独的I/O，但是对于索引，由于经常使用，绝大多数都已经CACHE到内存中，所以第一步的I/O经常是逻辑I/O，即数据可以从内存中得到。但对于第二部来说，如果表比较大，则其数据不可能全在内存中，所以其I/O很有可能是物理I/O，这是一个机械操作，相对逻辑I/O来说，极其费时间。所以如果对大表进行索引扫描，取出的数据如果大于总量的5%-10%，使用索引扫描效率会下降很多。但是如果查询的数据能全在索引中找到，就可以避免进行第二步操作，避免了不必要的I/O，此时即使通过索引扫描取出的数据比较多，效率还是很高的。再者，如果sql语句中需要对索引列进行排序，因为索引已经预先排序好了，所以在执行计划索引进行排序。
 根据索引的类型和where限制条件的不同，一般有如下4中类型的索引扫描：

- **索引唯一扫描(index unique scan)**
  通过唯一索引查找一个数值经常返回单个ROWID，如果存在UNIQUE或PRIMARY KEY约束(它保证了语句只存取单行)的话，Oracle经常实现唯一性扫描。
- **索引范围扫描(index range scan)**
  使用一个索引存取多行数据。以下三种情况会使用index range scan：
  - 在唯一索引列上使用了range操作符(> < <> >= <= between and)
  - 在组合索引上，只使用部分列进行查询，导致查询出多行
  - 在非唯一索引列上进行查询
- **索引全扫描(index full scan)**
  与全表扫描相对应，也有相应的全索引扫描而且此时查询出的数据都必须从索引中可以直接得到。
- **索引快速扫描(index fast full scan)**
  扫描索引中的索引数据块，与index full scan很类似，但是一个显著的区别就是它不对查询出的数据排序，即数据不是以排序顺序被返回。

### 表之间的连接方式

Join是一种试图将两个表结合在一起的谓词，一次只能连接两个表。Join可以并行的读取两个连接的表的数据，但将表中符合限制条件的数据段读入内存形成row source后，join的其它步骤一般都是串行的。
 目前为止，典型的join连接类型有3中：

- **排序合并连接(Sort Merge Join(SMJ))**
  内部连接过程：
  - 首先生成row source1需要的数据，然后对这些数据按照连接操作相关列进行排序。
  - 随后生成row source2需要的数据，然后对这些数据按照与sort source1对应的连接操作关联列排序。
  - 最后两边已排序的行被放在一起执行合并操作，即将两个row source按照连接条件连接起来。

如果row source已经在关联列上被排序，则该连结操作就不需要再进行sort操作，这样可以大大提高这种连接操作的连接速度，因为排序是个极其耗费资源的操作。预先排序的row source包括已经被索引的列或row source已经在前面的步骤中被排序了。另外，尽管合并两个row source的过程是串行的，但是可以并行访问这两个row source（如并行读入数据，排序）。
 排序是一个费时，费资源的操作，基于这个原因，SMJ通常不是一种有效率的连接方式，但当row source已经排好序的前提下，SMJ的效率还是很可观的。

**嵌套循环连接(Nested Loops(NL))**
这个连接方法有驱动表（外部表）的概念。该连接过程就是一个2层嵌套循环，所以外层循环的次数越少越好，这就是我们将小表作为驱动表（用于外层循环）的理论依据。但是这个理论只是一般指导原则，因为遵循这个理论并不能总保证使语句产生的I/0次数最少。
在NESTED LOOPS连接中，Oracle读取外部表的每一行，然后再内部表中检查是否有匹配的行，所有被匹配的行都被放到结果集中，然后处理外部表的下一行。如果外部表比较小，并且在内部表中有唯一高选择性非唯一索引时，使用这种方法可以得到较好的效率。NESTED LOOPS有其它连接方法没有的一个优点：可以先返回已经连接的行，而不必等待所有的连接操作处理完成才返回数据，这可以实现快速的响应时间。
如果不适用并行操作，最好的驱动表是那些应用了where条件限制后，可以返回较少行数据的表。对于并行查询，我们经常选择大表作为驱动表，因为大表可以充分利用并行功能。当然，有时对查询使用并行操作不一定比查询不使用并行操作效率高，因为最后可能每个表只有很少的行符合限制条件，而且还要看你的硬件配置是否支持并行（多个CPU，多个硬盘控制器）。

**哈希连接(Hash Join)**
哈希连接是在Oracle7.3以后引入的，从理论上来说比NL和SMJ更高效，而且只用在CBO优化器中。
较小的row source被用来构建hash table与bitmap，第二个row source用来于第一个row source生成的hash table进行匹配，以便进行进一步的连接。Bitmap被用来作为一种比较快的查找方法，来检查再hash table中是否有匹配的行。特别的，当hash table比较大而不能全部容纳在内存中时，这种查找方法更为有用。这种连接方法也有驱动表的概念，被构建为hash table与bitmap的表为驱动表，当被构建的hash table与bitmap能被容纳在内存中，这种连接方式的效率极高。
要是哈希连接有效，需要设置HASH_JOIN_ENABLED=TRUE,缺省情况下该参数为TRUE,另外还需要设置hash_area_size参数，以使哈希连接高效运行，因为哈希连接会在参数指定的大小的内存中运行，过小的参数会使哈希连接的性能比其他连接方式低。

**表访问的执行计划**

-   table access full：全表扫描。它会访问表中的每一条记录。
-   table access by user rowid：输入源rowid来自于用户指定。
-  table access by index rowid：输入源rowid来自于索引。
-   table access by global index rowid：全局索引获取rowid，然后再回表。
-   table access by local index rowid：分区索引获取rowid，然后再回表。
-  table access cluster：通过索引簇的键来访问索表。
-  external table access：访问外部表。
-  result cache：结果集可能来自于缓存。
-   mat_view rewrite access：物化视图。

  **索引访问的执行计划**

-  index unique scan：只返回一条rowid的索引扫描，或者unique索引的等值扫描。
- index range scan：返回多条rowid的索引扫描。
-  index full scan：顺序扫描整个索引。
-  index fast full scan：多块读方式扫描整个索引。
-  index skip scan：多应用于组合索引中，引导键值为空的情况下索引扫描。
-  and-equal：合并来自于一个或多个索引的结果集。
-  domain index：应用域索引。

 **表连接的执行计划**

-  SORT MERGE JOIN（排序-合并连接）
-   NESTED LOOPS（嵌套循环）
-  HASH JOIN（哈希连接）
-   CARTESIAN PRODUCT（笛卡尔积）

## 🔻[常用oracle hints]()

 **/*+ALL_ROWS*/**

👆表明对语句块选择基于开销的优化方法,并获得最佳吞吐量,使资源消耗最小化.

example:👇

SELECT /*+ALL+_ROWS*/ EMP_NO,EMP_NAM,DAT_IN FROM BSEMPMS WHERE EMP_NO='SCOTT';

 **/*+FIRST_ROWS*/**

👆表明对语句块选择基于开销的优化方法,并获得最佳响应时间,使资源消耗最小化.

example:👇

SELECT /*+FIRST_ROWS*/ EMP_NO,EMP_NAM,DAT_IN FROM BSEMPMS WHERE EMP_NO='SCOTT';

 **/*+CHOOSE*/**

👆表明如果数据字典中有访问表的统计信息,将基于开销的优化方法,并获得最佳的吞吐量;

👆表明如果数据字典中没有访问表的统计信息,将基于规则开销的优化方法;

example:👇

SELECT /*+CHOOSE*/ EMP_NO,EMP_NAM,DAT_IN FROM BSEMPMS WHERE EMP_NO='SCOTT';

**/*+RULE*/**

👆表明对语句块选择基于规则的优化方法.

example:👇

SELECT /*+ RULE */ EMP_NO,EMP_NAM,DAT_IN FROM BSEMPMS WHERE EMP_NO='SCOTT';

**/*+FULL(TABLE)*/**

👆表明对表选择全局扫描的方法.

example:👇

SELECT /*+FULL(A)*/ EMP_NO,EMP_NAM FROM BSEMPMS A WHERE EMP_NO='SCOTT';

**/*+ROWID(TABLE)*/**

👆提示明确表明对指定表根据ROWID进行访问.

example:👇

SELECT /*+ROWID(BSEMPMS)*/ * FROM BSEMPMS WHERE ROWID&gt;='AAAAAAAAAAAAAA'

AND EMP_NO='SCOTT';

 **/*+CLUSTER(TABLE)*/**

👆提示明确表明对指定表选择簇扫描的访问方法,它只对簇对象有效.

example:👇

SELECT /*+CLUSTER */ BSEMPMS.EMP_NO,DPT_NO FROM BSEMPMS,BSDPTMS

WHERE DPT_NO='TEC304' AND BSEMPMS.DPT_NO=BSDPTMS.DPT_NO;

**/*+INDEX(TABLE INDEX_NAME)*/**

👆表明对表选择索引的扫描方法.

example:👇

SELECT /*+INDEX(BSEMPMS SEX_INDEX) USE SEX_INDEX BECAUSE THERE ARE FEWMALE BSEMPMS */ FROM BSEMPMS WHERE SEX='M';

 **/*+INDEX_ASC(TABLE INDEX_NAME)*/**

👆表明对表选择索引升序的扫描方法.

example:👇

SELECT /*+INDEX_ASC(BSEMPMS PK_BSEMPMS) */ FROM BSEMPMS WHERE DPT_NO='SCOTT';

**/*+INDEX_COMBINE*/**

👆为指定表选择位图访问路经,如果INDEX_COMBINE中没有提供作为参数的索引,将选择出位图索引的布尔组合方式.

example:👇

SELECT /*+INDEX_COMBINE(BSEMPMS SAL_BMI HIREDATE_BMI)*/ * FROM BSEMPMS

WHERE SAL&lt;5000000 AND HIREDATE&lt;SYSDATE;

**/*+INDEX_JOIN(TABLE INDEX_NAME)*/**

👆提示明确命令优化器使用索引作为访问路径.

example:👇

SELECT /*+INDEX_JOIN(BSEMPMS SAL_HMI HIREDATE_BMI)*/ SAL,HIREDATE

FROM BSEMPMS WHERE SAL&lt;60000;

**/*+INDEX_DESC(TABLE INDEX_NAME)*/**

👆表明对表选择索引降序的扫描方法.

example:👇

SELECT /*+INDEX_DESC(BSEMPMS PK_BSEMPMS) */ FROM BSEMPMS WHERE DPT_NO='SCOTT';

 **/*+INDEX_FFS(TABLE INDEX_NAME)*/**

👆对指定的表执行快速全索引扫描,而不是全表扫描的办法.

example:👇

SELECT /*+INDEX_FFS(BSEMPMS IN_EMPNAM)*/ * FROM BSEMPMS WHERE DPT_NO='TE垃圾产品';

 **/*+ADD_EQUAL TABLE INDEX_NAM1,INDEX_NAM2,...*/**

提示明确进行执行规划的选择,将几个单列索引的扫描合起来.

example:👇

SELECT /*+INDEX_FFS(BSEMPMS IN_DPTNO,IN_EMPNO,IN_SEX)*/ * FROM BSEMPMS WHERE EMP_NO='SCOTT' AND DPT_NO='TDC306';

**/*+USE_CONCAT*/**

对查询中的WHERE后面的OR条件进行转换为UNION ALL的组合查询.

example:👇

SELECT /*+USE_CONCAT*/ * FROM BSEMPMS WHERE DPT_NO='TDC506' AND SEX='M';

 **/*+NO_EXPAND*/**

对于WHERE后面的OR 或者IN-LIST的查询语句,NO_EXPAND将阻止其基于优化器对其进行扩展.

example:👇

SELECT /*+NO_EXPAND*/ * FROM BSEMPMS WHERE DPT_NO='TDC506' AND SEX='M';

 **/*+NOWRITE*/**

禁止对查询块的查询重写操作.

**/*+REWRITE*/**

👆可以将视图作为参数.

 **/*+MERGE(TABLE)*/**

👆能够对视图的各个查询进行相应的合并.

example:👇

SELECT /*+MERGE(V) */ A.EMP_NO,A.EMP_NAM,B.DPT_NO FROM BSEMPMS A (SELET DPT_NO

,AVG(SAL) AS AVG_SAL FROM BSEMPMS B GROUP BY DPT_NO) V WHERE A.DPT_NO=V.DPT_NO

AND A.SAL&gt;V.AVG_SAL;

**/*+NO_MERGE(TABLE)*/**

对于有可合并的视图不再合并.

example:👇

SELECT /*+NO_MERGE(V) */ A.EMP_NO,A.EMP_NAM,B.DPT_NO FROM BSEMPMS A (SELECT DPT_NO,AVG(SAL) AS AVG_SAL FROM BSEMPMS B GROUP BY DPT_NO) V WHERE A.DPT_NO=V.DPT_NO AND A.SAL&gt;V.AVG_SAL;

**/*+ORDERED*/**

👆根据表出现在FROM中的顺序,ORDERED使ORACLE依此顺序对其连接.

example:👇

SELECT /*+ORDERED*/ A.COL1,B.COL2,C.COL3 FROM TABLE1 A,TABLE2 B,TABLE3 C WHERE A.COL1=B.COL1 AND B.COL1=C.COL1;

 **/*+USE_NL(TABLE)*/**

将指定表与嵌套的连接的行源进行连接,并把指定表作为内部表.

example:👇

SELECT /*+ORDERED USE_NL(BSEMPMS)*/ BSDPTMS.DPT_NO,BSEMPMS.EMP_NO,BSEMPMS.EMP_NAM FROM BSEMPMS,BSDPTMS WHERE BSEMPMS.DPT_NO=BSDPTMS.DPT_NO;

**/*+USE_MERGE(TABLE)*/**

将指定的表与其他行源通过合并排序连接方式连接起来.

example:👇

SELECT /*+USE_MERGE(BSEMPMS,BSDPTMS)*/ * FROM BSEMPMS,BSDPTMS WHERE BSEMPMS.DPT_NO=BSDPTMS.DPT_NO;

 **/*+USE_HASH(TABLE)*/**

将指定的表与其他行源通过哈希连接方式连接起来.

example:👇

SELECT /*+USE_HASH(BSEMPMS,BSDPTMS)*/ * FROM BSEMPMS,BSDPTMS WHERE BSEMPMS.DPT_NO=BSDPTMS.DPT_NO;

**/*+DRIVING_SITE(TABLE)*/**

强制与ORACLE所选择的位置不同的表进行查询执行.

example:👇

SELECT /*+DRIVING_SITE(DEPT)*/ * FROM BSEMPMS,DEPT@BSDPTMS WHERE BSEMPMS.DPT_NO=DEPT.DPT_NO;

 **/*+LEADING(TABLE)*/**

将指定的表作为连接次序中的首表.

 **/*+CACHE(TABLE)*/**

当进行全表扫描时,CACHE提示能够将表的检索块放置在缓冲区缓存中最近最少列表LRU的最近使用端

example:👇

SELECT /*+FULL(BSEMPMS) CAHE(BSEMPMS) */ EMP_NAM FROM BSEMPMS;

**/*+NOCACHE(TABLE)*/**

👆当进行全表扫描时,CACHE提示能够将表的检索块放置在缓冲区缓存中最近最少列表LRU的最近使用端

example:箱👇

SELECT /*+FULL(BSEMPMS) NOCAHE(BSEMPMS) */ EMP_NAM FROM BSEMPMS;

**/*+APPEND*/**

👆直接插入到表的最后,可以提高速度.

insert /*+append*/ into test1 select * from test4 ;

 **/*+NOAPPEND*/**

👆通过在插入语句生存期内停止并行模式来启动常规插入.

insert /*+noappend*/ into test1 select * from test4 ;



## 🔻使用autotrace工具（只能SQLPLUS😐）

```plsql
用法1：查看执行计划、统计信息并且返回sql结果集
set autotrace on;  

用法2：查看执行计划、统计信息不返回sql结果集：
SQL> set autotrace traceonly;   

---方法3：只看执行计划不返回sql结果集：
QL> set autotrace traceonly explain;  
```



#### 查看执行计划、统计信息、执行时间并且返回sql结果集：

```plsql
SQL> set autotrace on;
SQL> set timing on;
SQL> select count(*) from t;

  COUNT(*)
----------
     50295

已用时间:  00: 00: 00.01

执行计划
----------------------------------------------------------
Plan hash value: 2966233522

-------------------------------------------------------------------
| Id  | Operation          | Name | Rows  | Cost (%CPU)| Time     |
-------------------------------------------------------------------
|   0 | SELECT STATEMENT   |      |     1 |   159   (2)| 00:00:02 |
|   1 |  SORT AGGREGATE    |      |     1 |            |          |
|   2 |   TABLE ACCESS FULL| T    | 50295 |   159   (2)| 00:00:02 |
-------------------------------------------------------------------


统计信息
----------------------------------------------------------
          0  recursive calls
          0  db block gets
          0  consistent gets
          0  physical reads
          0  redo size
        509  bytes sent via SQL*Net to client
        211  bytes received via SQL*Net from client
          2  SQL*Net roundtrips to/from client
          1  sorts (memory)
          0  sorts (disk)
          1  rows processed
```

#### 查看执行计划、统计信息、执行时间不返回sql结果集：

```plsql
SQL> set timing on;
SQL> set autotrace traceonly;
SQL> select * from t2;

已选择402344行。

已用时间:  00: 00: 20.66

执行计划
----------------------------------------------------------
Plan hash value: 1513984157

--------------------------------------------------------------------------
| Id  | Operation         | Name | Rows  | Bytes | Cost (%CPU)| Time     |
--------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |   402K|    33M|  1240   (3)| 00:00:15 |
|   1 |  TABLE ACCESS FULL| T2   |   402K|    33M|  1240   (3)| 00:00:15 |
--------------------------------------------------------------------------


统计信息
----------------------------------------------------------
          0  recursive calls
          0  db block gets
          0  consistent gets
          0  physical reads
          0  redo size
        911  bytes sent via SQL*Net to client
        190  bytes received via SQL*Net from client
          2  SQL*Net roundtrips to/from client
          1  sorts (memory)
          0  sorts (disk)
     402344  rows processed
```

#### 只看执行计划、执行时间不返回sql结果集：

```plsql
SQL> set timing on;
SQL> set autotrace traceonly explain;
SQL> select * from t;
已用时间:  00: 00: 00.01

执行计划
----------------------------------------------------------
Plan hash value: 1601196873

--------------------------------------------------------------------------
| Id  | Operation         | Name | Rows  | Bytes | Cost (%CPU)| Time     |
--------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      | 50295 |  4273K|   161   (3)| 00:00:02 |
|   1 |  TABLE ACCESS FULL| T    | 50295 |  4273K|   161   (3)| 00:00:02 |
--------------------------------------------------------------------------
```

#### 只看统计信息、执行时间不返回sql结果集：

```plsql
SQL> set timing on;
SQL> set autotrace traceonly statistics;
SQL> select * from t;

已选择50295行。

已用时间:  00: 00: 02.59

统计信息
----------------------------------------------------------
          0  recursive calls
          0  db block gets
          0  consistent gets
          0  physical reads
          0  redo size
        911  bytes sent via SQL*Net to client
        189  bytes received via SQL*Net from client
          2  SQL*Net roundtrips to/from client
          1  sorts (memory)
          0  sorts (disk)
      50295  rows processed
```

#### 查看帮助信息：

```plsql
SQL> set autotrace
用法: SET AUTOT[RACE] {OFF | ON | TRACE[ONLY]} [EXP[LAIN]] [STAT[ISTICS]]
```

#### 如何开看统计信息：

```plsql
SQL> show parameter db_block_size

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
db_block_size                        integer     8192
SQL> set linesize 200
SQL> alter system flush shared_pool;      --清空shared_pool

系统已更改。

SQL> alter system flush buffer_cache;    --清空buffer_cache

系统已更改。

SQL> set timing on;
SQL> set autotrace traceonly;
SQL> select * from t2 order by object_name;

已选择402344行。

已用时间:  00: 00: 23.79      --执行了23.79秒

执行计划
----------------------------------------------------------
Plan hash value: 2552596561

-----------------------------------------------------------------------------------
| Id  | Operation          | Name | Rows  | Bytes |TempSpc| Cost (%CPU)| Time     |
-----------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |      |   402K|    33M|       |  9361   (2)| 00:01:53 |
|   1 |  SORT ORDER BY     |      |   402K|    33M|    92M|  9361   (2)| 00:01:53 |
|   2 |   TABLE ACCESS FULL| T2   |   402K|    33M|       |  1240   (3)| 00:00:15 |
-----------------------------------------------------------------------------------


统计信息
----------------------------------------------------------
        525  recursive calls
         30  db block gets
       5606  consistent gets
      11129  physical reads
          0  redo size
   13462598  bytes sent via SQL*Net to client
     295442  bytes received via SQL*Net from client
      26824  SQL*Net roundtrips to/from client
          4  sorts (memory)
          1  sorts (disk)
     402344  rows processed
```

执行了23.79秒。

消耗的内存：5606*8192/1024/1024=43.7M

I/O消耗：11129*8192/1024/1024=86.9M

### 🔻总结

各连接方法试用的场景：

- **排序-合并连接**
  - 对于非等值连接，这种方式效率比较高
  - 如果在关联列上有索引，效果更好
  - 对于将两个比较大的row source做连接，该连接方法比NL要好
  - 如果sort merge返回的row source过大，则又会使用过多的rowid在表中查询数据时，数据库性能下降，因为过多的I/O
- **嵌套循环**
  - 如果外部表比较小，并且在内部表上有唯一索引，或者高选择性索引
  - 该方法有其它连接方法没有的优点：可以先返回已经连接的行，而不必等待所有的连接操作处理完才返回数据，这样可以实现快速的响应时间
- **哈希连接**
  - 一般来说，其效率好于其它两种连接，但这种连接只能用在CBO优化中，而且需要设置合适的。参数
  - 只用于等值连接

#### 字段解释

| Operation              | 当前操作的内容                                               |
| ---------------------- | ------------------------------------------------------------ |
| **Object**             | **操作对象**                                                 |
| **Optimizer**          | **优化器**                                                   |
| **Cost（CPU)**         | **Oracle 计算出来的一个数值（代价），用于说明SQL执行的代价。** |
| **Cardinality**        | **基数**                                                     |
| **Bytes**              | **字节**                                                     |
| **Access Predicates ** | **通过某种方式定位了需要的数据，然后读取出这些结果集，叫做Access。<br/>表示这个谓词条件的值将会影响数据的访问路径（表还是索引）。** |
| **Filter Predicates**  | **把所有的数据都访问了，然后过滤掉不需要的数据，这种方式叫做filter 。<br/>表示谓词条件的值不会影响数据的访问路径，只起过滤的作用。** |

#### 🔽执行顺序的原则

**执行顺序的原则是：<b style='color:red'>由上至下</b>，<b style='color:red'>从右向左</b>**
**<b style='color:red'>由上至下</b>：在执行计划中一般含有多个节点，相同级别(或并列)的节点，靠上的优先执行，靠下的后执行**
**<b style='color:red'>从右向左</b>：在某个节点下还存在多个子节点，先从最靠右的子节点开始执行。**

**一般按缩进长度来判断，缩进最大的最先执行，如果有2行缩进一样，那么就先执行上面的。**




