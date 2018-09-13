
### editor-ui

**vue 集成 tinymce**


怎么集成参考: https://segmentfault.com/a/1190000012791569


自定义 tinymce 富文本编辑器,

在原来的编辑器中增加上传 word 模板

最终展示效果:

![image](https://github.com/haoxiaoyong1014/editor-service/raw/master/src/main/java/com/liumapp/demo/docker/editor/image/editor.gif)

**主要代码:**

<a href="https://github.com/haoxiaoyong1014/editor-ui/blob/master/src/views/index.vue">index.vue</a>

**整体思路:**

1,在编辑器原来的基础上增加上传模板按钮

2, 前端上传 word 模板

3, 服务端接收将 word 转换为html 返回前端

4, 前端拿到我返回的值,将其放到富文本编辑器中

4.1, 在 data 的中定义个 customEditor 变量,值可以为空

4.2, 填充值的方式: 拿到服务端上传成功之后的返回参数,将其填充到<textarea>标签中,

你所编辑的所有东西都会呈现在这个标签中,所有富文本编辑器千篇一律


```
<textarea  class='tinymce-textarea' id="tinymceEditer" style="height: 800px"></textarea>

```


```
   this.customEditor=res.content;
      console.log('haoxy'+this.customEditor)
      tinymce.get('tinymceEditer').setContent(this.customEditor);
```

5, 前端点击submit,服务端将其转换成 pdf文件

服务端代码: <a href="https://github.com/haoxiaoyong1014/editor-service">editor-service</a>

**更详细内容见博客:** https://blog.csdn.net/haoxiaoyong1014/article/details/82683428
