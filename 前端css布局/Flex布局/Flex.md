

##  flex 

**flex: *flex-grow* *flex-shrink* *flex-basis*|auto|initial|inherit;**

| 值            | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| *flex-grow*   | 一个数字，规定项目将相对于其他灵活的项目进行扩展的量。       |
| *flex-shrink* | 一个数字，规定项目将相对于其他灵活的项目进行收缩的量。       |
| *flex-basis*  | 项目的长度。合法值："auto"、"inherit" 或一个后跟 "%"、"px"、"em" 或任何其他长度单位的数字。 |
| auto          | 与 1 1 auto 相同。                                           |
| none          | 与 0 0 auto 相同。                                           |
| initial       | 设置该属性为它的默认值，即为 0 1 auto。请参阅 [*initial*](https://www.runoob.com/cssref/css-initial.html)。 |
| inherit       | 从父元素继承该属性。请参阅 [*inherit*](https://www.runoob.com/cssref/css-inherit.html)。 |

## align-content 

align-content: stretch|center|flex-start|flex-end|space-between|space-around|initial|inherit;

| 值            | 描述                                                         | 测试                                                         |
| :------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| stretch       | 默认值。元素被拉伸以适应容器。各行将会伸展以占用剩余的空间。如果剩余的空间是负数，该值等效于'flex-start'。在其它情况下，剩余空间被所有行平分，以扩大它们的侧轴尺寸。 | [测试 »](https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=stretch) |
| center        | 元素位于容器的中心。各行向弹性盒容器的中间位置堆叠。各行两两紧靠住同时在弹性盒容器中居中对齐，保持弹性盒容器的侧轴起始内容边界和第一行之间的距离与该容器的侧轴结束内容边界与第最后一行之间的距离相等。（如果剩下的空间是负数，则各行会向两个方向溢出的相等距离。） | [测试 »](https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=center) |
| flex-start    | 元素位于容器的开头。各行向弹性盒容器的起始位置堆叠。弹性盒容器中第一行的侧轴起始边界紧靠住该弹性盒容器的侧轴起始边界，之后的每一行都紧靠住前面一行。 | [测试 »](https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=flex-start) |
| flex-end      | 元素位于容器的结尾。各行向弹性盒容器的结束位置堆叠。弹性盒容器中最后一行的侧轴起结束界紧靠住该弹性盒容器的侧轴结束边界，之后的每一行都紧靠住前面一行。 | [测试 »](https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=flex-end) |
| space-between | 元素位于各行之间留有空白的容器内。各行在弹性盒容器中平均分布。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于'flex-start'。在其它情况下，第一行的侧轴起始边界紧靠住弹性盒容器的侧轴起始内容边界，最后一行的侧轴结束边界紧靠住弹性盒容器的侧轴结束内容边界，剩余的行则按一定方式在弹性盒窗口中排列，以保持两两之间的空间相等。 | [测试 »](https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=space-between) |
| space-around  | 元素位于各行之前、之间、之后都留有空白的容器内。各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于'center'。在其它情况下，各行会按一定方式在弹性盒容器中排列，以保持两两之间的空间相等，同时第一行前面及最后一行后面的空间是其他空间的一半。 | [测试 »](https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=space-around) |
| initial       | 设置该属性为它的默认值。请参阅 [*initial*](https://www.runoob.com/cssref/css-initial.html)。 | [测试 »](https://www.runoob.com/try/playit.php?f=playcss_align-content&preval=initial) |
| inherit       | 从父元素继承该属性。请参阅 [*inherit*](https://www.runoob.com/cssref/css-inherit.html)。 |                                                              |


### Flex概念知识

采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

![img](https://upload-images.jianshu.io/upload_images/18253298-f356148f9acc05c3?imageMogr2/auto-orient/strip|imageView2/2/w/563/format/webp)

**容器默认存在两根轴：**

水平的主轴（**main axis**）和垂直的交叉轴（**cross axis**）。主轴的开始位置（与边框的交叉点）叫做**main start**，结束位置叫做**main end**；交叉轴的开始位置叫做**cross start**，结束位置叫做**cross end**。

项目默认沿`主轴`排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做**cross size**。

