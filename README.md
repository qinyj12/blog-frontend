## 开荒一个博客前端
- [x] 详情页loading
- [x] 显示copied-img => 卡片下沉/cover消失 => copied-img动画
- [x] 做footer
- [x] content页的推荐文章
- [x] cover组件动态展示文字
- [x] 点击avatar的动画，必须要有额外一层背景放在avatar的底部，以此来达到冒充cover的目的
- [x] 点击avatar的动画，做一个动态节点放在cover组件内，这个节点是用来展示avatar的，以此达到cover组件和articlecard组件的衔接
- [x] 当前要解决的是在cover组件内async computed的问题，在nextick之后再computed=>不解决了，不会做
- [x] author=>content时的动画
- [x] 防止在author组件内再次点击author
- [x] 点击recommended card后的动画，解决img的src留空时显示默认图标的问题

## 重开
- [x] 修改封装后的request库
- [x] 解决全局动画下，点击头像后缓缓消失的问题。要立刻消失
- [x] 解决cookie的传输问题
- [x] axios多线程demo
- [x] axios多线程加载所有tag
- [x] 获取所有标签，首页展示所有标签
- [x] 获取所有标签的后端接口加一个缓存
- [x] 首页骨架屏
- [x] 懒加载骨架屏，vue-lazy-component库
- [x] 点击进入文章详情，加载cover图（在content组件中获取文章的详细信息，然后通过prop传值给子组件，在前端展示内容(title,category,author,date)，category要单独调用api
- [x] 给cover也加一个骨架，因为读取加载的时候读取数据也要时间。并给cover加模糊
- [x] 加载文章详情
- [x] author，显示社交网络账号。（！还得保证空值不读取）
- [x] author，点击icon后浮窗显示二维码或网址。
- [x] 父组件content向子组件authorcard传值，好像涉及到async问题
- [x] 把contact社交账号做成单独的组件
- [x] 点击头像进入作者详情
- [x] 如果文章没有设置cover，单独访问文章页会没有背景
- [x] 点击标签展示所有tags的文章(要把获取语雀api文档的逻辑从articlecard中提取到父组件（home和tag）中)。
- [x] 切换tag，只重新生成articlecard组件（切换路由后，重新生成cover,card,footer,给card一个骨架屏）
- [x] 因为重构了articlecard，author组件也要重新写逻辑
- [x] author页
- [x] 文章内推荐模块（头图默认给个色块，还有头像的默认值）
- [x] 点击推荐模块后的跳转（路由复用问题）
- [x] 未分类标签未展示仍然loading
- [x] 解决home页keep-alive的问题，分析dom中
- [ ] 标签页坏了（tag=>tag时有问题，提示HideFeaturedImg undefined）
- [ ] 多个标签
- [ ] 热门文章组件
- [x] 首页加载模板，所有标签加载模板
- [ ] 分页
- [ ] 换一个cookie，不然点击量上不去
- [ ] 多人编辑后的显示作者
- [ ] 导航条的登录、注册换掉
- [ ] 首页banner位的slogan
- [ ] http.js的判断还需要优化
- [ ] 评论组件
- [ ] 选中console报错
- [ ] http.js中的console

## 以前的
- [ ] tag => content，动画没有
- [ ] 点击热门后的动画，简单的下沉就可以了
- [ ] 点击author card后的动画