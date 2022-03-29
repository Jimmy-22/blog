### css布局

#### 布局的两个共同点：

1. 大多数用于PC端，因为空间大
2. 布局是有限空间内的元素排列方式。因为页面设计横向不滚动，纵向无线延伸。所以大多数时候讨论的布局都是水平方向进行切割

#### 单列布局

实现效果就是将一个元素作为布局容器。通常设置一个较小的（最大）宽度，保证不同像素宽度屏幕下显示一致

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220330001331065.png" alt="image-20220330001331065" style="zoom: 50%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220330001458105.png" alt="image-20220330001458105" style="zoom:50%;" />

**优势**在于基本上可以适配超过布局容器宽度的各种显示屏幕

**缺点**也是源于此，过度的冗余设计必然会浪费。有时候屏幕宽度可以显示更多内容，但是页面两侧出现了大量空白区域



#### 2列布局

列布局的实现效果就是将页面分割成左右宽度不等的两列。宽度较小的列设置为固定宽度，剩余宽度由另一列撑满。宽度较小的列父元素为次要布局容器，宽度较大的列父元素为主要布局容器

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220330002027755.png" alt="image-20220330002027755" style="zoom:50%;" />

 

#### 3列布局

按照左中右的顺序进行布局，通常中间最宽

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220330002306749.png" alt="image-20220330002306749" style="zoom:50%;" />



#### 布局的实现

单列布局通过设置布局容器最大宽度，以及左右边距为auto即可实现

 

