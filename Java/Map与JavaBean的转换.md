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

#### JavaBeanUtil

```java
import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class JavaBeanUtil {
    /**
     * set 方法前缀
     */
    private static final String prefix_set = "set";
    /**
     * get 方法前缀
     */
    private static final String prefix_get = "get";

    /**
     * 将首字母转小写
     *
     * @param name
     * @return
     */
    private static String nameLowerCase(String name) {
        char[] chars = name.toCharArray();
        chars[0] += 32;
        return String.valueOf(chars);
    }

    /**
     * 将首字母转大写写
     *
     * @param name
     * @return
     */
    private static String nameUpperCase(String name) {
        char[] chars = name.toCharArray();
        chars[0] -= 32;
        return String.valueOf(chars);
    }

    /**
     * JavaBean转Map
     *
     * @param bean
     * @param <T>
     * @return
     * @throws Exception
     */
    public static <T> Map<String, Object> beanToMapFix(T bean) throws Exception {
        //创建JavaBean对象
        Map<String, Object> map = new HashMap<>();
        Map<String, Method> methodInfos = filterMethod(bean.getClass().getMethods(), prefix_get);
        for (Map.Entry<String, Method> method : methodInfos.entrySet()) {
            map.put(method.getKey(), method.getValue().invoke(bean, null));
        }
        //移除class方法
        map.remove("class");
        return map;
    }


    /**
     * Map转JavaBean,解决lombok的@Accessors干扰
     *
     * @param map
     * @param cl
     * @param <T>
     * @return
     * @throws Exception
     */
    public static <T> T mapToBeanFix(Map<String, Object> map, Class<T> cl) throws Exception {
        //创建JavaBean对象
        T obj = cl.newInstance();
        Map<String, Method> methodInfos = filterMethod(cl.getMethods(), prefix_set);
        for (Map.Entry<String, Method> method : methodInfos.entrySet()) {
            Object value = map.get(method.getKey());
            if (Objects.nonNull(value)) {
                method.getValue().invoke(obj, value);
            }
        }
        return obj;
    }


    /**
     * 筛选符合条件的方法
     *
     * @param methods
     * @param predicate
     * @return
     */
    private static Map<String, Method> filterMethod(Method[] methods, String predicate) {
        Map<String, Method> methodInfos = new HashMap<>();
        for (Method method : methods) {
            if (method.getName().startsWith(predicate)) {
                String key = nameLowerCase(method.getName().substring(3));
                methodInfos.put(key, method);
            }
        }
        return methodInfos;
    }

    /**
     * Map转换为JavaBean
     *
     * @param map
     * @param cl
     * @param <T>
     * @return
     * @throws Exception
     */
    public static <T> T map2bean(Map<String, Object> map, Class<T> cl) throws Exception {
        //创建JavaBean对象
        T obj = cl.newInstance();
        //获取指定类的BeanInfo对象
        BeanInfo beanInfo = Introspector.getBeanInfo(cl, Object.class);
        //获取所有的属性描述器
        PropertyDescriptor[] pds = beanInfo.getPropertyDescriptors();
        for (PropertyDescriptor pd : pds) {
            System.out.println(pd.getName());
            Object value = map.get(pd.getName());
            Method setter = pd.getWriteMethod();
            if (value != "") {
                setter.invoke(obj, value);
            }
        }
        return obj;
    }

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

    public static void main(String[] args) throws Exception {
           Map<String, Object> map = new HashMap<>();
        map.put("other", 1235);
        map.put("name", "混子田");
        map.put("color", "black");
        Rabbit rabbit = JavaBeanUtil.map2bean(map, Rabbit.class);
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
  -   ![](https://raw.githack.com/crtxr1998/learnNote/master/Java/image/mapToJavaBean1.png)



- 在设置`desc`属性的时候setter为null(为什么呢？找了好久过程省略😭。。。👇👇)

  - 
    源码位置在`PropertyInfo`288行,有兴趣可以看看

  - ​     ![]( https://raw.githack.com/crtxr1998/learnNote/master/Java/image/mapToJavaBean2.png)                     

  - 从代码上看这里只保存了返回类型为**void**并且以**set**开头的方法，hui那就奇怪了，我都给类加上了`get`与`set`方法，难道`desc`对应的方法返回类型不是`void`这没道理啊,后来通过查看类字节码发现`setDesc`这个方法的返回竟然是本身，这就奇怪了。后来发现Animal这个类多加了个`@Accessors`这里的罪魁祸首就是这个`@Accessors`了😕😕😕

  - ```java
    public setDesc(Ljava/lang/String;)Lcom/xiaotian/reflect/Animal;
       L0
        LINENUMBER 8 L0
        ALOAD 0
        ALOAD 1
        PUTFIELD com/xiaotian/reflect/Animal.desc : Ljava/lang/String;
        ALOAD 0
        ARETURN
       L1
        LOCALVARIABLE this Lcom/xiaotian/reflect/Animal; L0 L1 0
        LOCALVARIABLE desc Ljava/lang/String; L0 L1 1
        MAXSTACK = 2
        MAXLOCALS = 2
    ```

 **@Accessors注解会对getter和setter方法生成产生影响**

-  **fluent**的中文含义是流畅的，设置为true，则getter和setter方法的方法名都是基础属性名，且setter方法返回当前对象，如下

  ```java
  @Data
  @Accessors(fluent = true)
  public class User {
      private Long id;
     
      // 生成的getter和setter方法如下，方法体略
      public Long id() {}
      public User id(Long id) {}
  }
  ```

  

-  **chain**的中文含义是链式的，设置为true，则setter方法返回当前对象。如下

  ```java
  @Data
  @Accessors(chain = true)
  public class User {
      private Long id;
      
      // 生成的setter方法如下，方法体略
      public User setId(Long id) {}
  }
  ```

-   **prefix**的中文含义是前缀，用于生成getter和setter方法的字段名会忽视指定前缀（遵守驼峰命名）。如下 

  ```java
  @Data
  @Accessors(prefix = "p")
  class User {
  	private Long pId;
  	
  	// 生成的getter和setter方法如下，方法体略
  	public Long getId() {}
  	public void setId(Long id) {}
  }
  ```

  

  **那重新来一遍去掉`@Accessors`注解再试试**

  ```java
  base
  color
  desc
  name
  --------------------------------------------------
  name=混子田,desc=我的描述,color=black,base=null
  --------------------------------------------------
  ```

  这次就没问题，这个坑踩的挺神奇的😀😀😀