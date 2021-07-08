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
- [ ] 解决全局动画下，点击头像后缓缓消失的问题。要立刻消失
- [ ] 分页
- [ ] 多人编辑后的显示作者

## 以前的
- [ ] tag => content，动画没有
- [ ] 点击热门后的动画，简单的下沉就可以了
- [ ] 点击author card后的动画