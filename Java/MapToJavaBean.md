### 前言

`Get`请求时过多的参数变量,采用`Map`接受却要一个一个get(key),作为一个程序员这是受不了的（个人感觉😀）参数少的话一个一个get(key)可能不觉得什么，但是属性太多的时候就太恶心了😱，不扯犊子了进入正文👇👇👇

### 背景

-  **项目中使用了`lombok`依赖（一个简化代码量的神器[生成属性的getter和setter方法等等.....]，没听过的话百度）**

### 准备测试代码

- **构建简单的继承关系**

```java
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class BaseInfo {
    private String base;
}

```

```java
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
@Getter
@Setter
@Accessors(chain = true)
public class Animal extends BaseInfo{
    private String name;
    private String desc;
}
```

```java
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
public class Rabbit extends Animal {
    private String color;
}

```

- **测试代码**

```java
package com.xiaotian.reflect;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class Test {

     /**
     * Map转换为JavaBean
     * @param map
     * @param cl
     * @param <T>
     * @return
     * @throws Exception
     */
    public static <T> T map2bean(Map<String,Object> map, Class<T> cl) throws Exception{
        //创建JavaBean对象实例
        T obj = cl.newInstance();
        //获取指定类的BeanInfo对象
        BeanInfo beanInfo = Introspector.getBeanInfo(cl,Object.class);
        //获取所有的属性描述器
        PropertyDescriptor[] pds = beanInfo.getPropertyDescriptors();
        for(PropertyDescriptor pd:pds){
            System.out.println(pd.getName());
            Object value = map.get(pd.getName());
            Method setter = pd.getWriteMethod();
            if(value != ""){
                setter.invoke(obj, value);
            }
        }
        return  obj;
    }

    public static void main(String[] args) throws Exception {
           Map<String, Object> map = new HashMap<>();
        map.put("other", 1235);
        map.put("name", "混子田");
        map.put("color", "black");
        Rabbit rabbit = map2bean(map, Rabbit.class);
        System.out.println("--------------------------------------------------");
        System.out.printf("name=%s,desc=%s,color=%s,base=%s\r\n",
                rabbit.getName(), rabbit.getDesc(), rabbit.getColor(), rabbit.getBase()
        );
        System.out.println("--------------------------------------------------");
    } 
}
```

- **运行结果**

```java
base
color
desc
Exception in thread "main" java.lang.NullPointerException
	at com.xiaotian.reflect.Test.map2bean(Test.java:33)
	at com.xiaotian.reflect.Test.main(Test.java:44)
```

 **setter.invoke(obj, value);**这句报了NPE(空指针异常)

- 分析原因
  -   根据日志我们可以看出setter为null当调用其方法时NPE了(Debug也确实)
  - ![](C:\Users\Crouten\AppData\Roaming\Typora\typora-user-images\image-20191227184335379.png)



- 在设置`desc`属性的时候setter为null(为什么呢？找了好久过程省略😭。。。👇👇)
- ![](C:\Users\Crouten\AppData\Roaming\Typora\typora-user-images\image-20191227184335379.png)

