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
- [ ] 点击进入文章详情
- [ ] 点击头像进入作者详情
- [ ] 点击标签展示所有tags的文章
- [ ] 首页加载模板，所有标签加载模板
- [ ] 分页
- [ ] 热门文章组件
- [ ] 多人编辑后的显示作者
- [ ] 导航条的登录、注册换掉
- [ ] 首页banner位的slogan
- [ ] http.js的判断还需要优化
- [ ] 评论组件

## 以前的
- [ ] tag => content，动画没有
- [ ] 点击热门后的动画，简单的下沉就可以了
- [ ] 点击author card后的动画