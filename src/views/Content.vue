<template>
    <div id="main-content">
        <!-- 判断要不要隐藏cover，给隐藏过程添加动画 -->
        <transition name="cover-move">
            <Cover 
                v-show="!IfSink" 
                v-bind="{
                    CoverImg: CoverImg, 
                    CoverShowArticleDetail: true,
                    Category: Category,
                    Title: Title,
                    Author: Author,
                    PublishDate: PublishDate,
                    CoverBlur: '5px'
                }"
                :key="ReRenderCover"
            />
        </transition>

        <div class="component-wrap">
            <!-- 判断要不要隐藏content，给隐藏过程添加动画 -->
            <transition name="components-move">
                <ArticleContent 
                    v-show="!IfSink" 
                    v-bind="{
                        ArticleContentByFather: ArticleContentHtml
                    }"
                />
            </transition>

            <!-- 判断要不要隐藏author，给隐藏过程添加动画 -->
            <transition name="components-move">
                <AuthorCard 
                    v-show="!IfSink" 
                    v-bind="{
                        avatar: AuthorAvatar,
                        name: AuthorName,
                        description: AuthorDescription,
                        contacts: AuthorContacts
                    }" 
                />
            </transition>

            <!-- recommended组件的隐藏动画在组件内判断，不需要在content父组件中判断 -->
            <ArticlesRecommended />

            <!-- 判断要不要隐藏comments，给隐藏过程添加动画 -->
            <transition name="components-move">
                <Comments v-show="!IfSink" />
            </transition>
        </div>

        <!-- 判断要不要隐藏footer，给隐藏过程添加动画 -->
        <transition name="components-move">
            <Footer v-show="!IfSink" />
        </transition>

    </div>
</template>
<script>
import Cover from '@/components/Cover.vue';
import Footer from '@/components/Footer.vue';
import AuthorCard from '@/components/AuthorCard.vue';
import ArticlesRecommended from '@/components/ArticlesRecommended.vue';
import Comments from '@/components/Comments.vue';
import ArticleContent from '@/components/ArticleContent.vue';
import { DocInfo, DocTags } from '@/api/api.js'
export default {
    components: {
        Cover,
        Footer,
        AuthorCard,
        ArticlesRecommended,
        Comments,
        ArticleContent
    },
    data() {
        return {
            // 传值给cover组件
            CoverImg: undefined, // 不要传值给Cover组件，因为进入Cover组件时会先渲染props默认值，导致动画撕裂。要放到vuex里面
            Category: undefined,
            Title: undefined,
            Author: undefined,
            PublishDate: undefined,
            // 这个值是用来重新渲染cover组件的
            ReRenderCover: 0,
            ArticleContentHtml: undefined, // 正文内容
            AuthorAvatar: undefined, // 用户头像
            AuthorName: undefined, // 用户昵称
            AuthorDescription: undefined, // 用户简介
            AuthorContacts: {}, // 用户通讯录
            AuthorLogin: undefined, // 用户在语雀的login
        }
    },
    computed: {
        // 判断要不要隐藏cover和footer组件
        IfSink() {
            return this.$store.state.IfSinkSomething
        },

    },
    methods: {
        // 承接docInfo api返回的值，加工后赋值给各个参数（doc的内容（正文、作者、时间等））
        GetDocInfo(resp) {
            const { data } = resp
            // 先存到vuex仓库里，这样Cover组件渲染时可以先从vuex仓库里找到对象，而不是因为调用props默认值导致动画撕裂
            // 从语雀api读取文章cover，如果有，赋值给vuex（cover组件再从vuex里读取）。如果没有，就赋值默认的cover
            this.$store.commit('ChangeCoverImg', data.cover? data.cover : require('@/assets/featured-image.png'))
            this.Title = data.title
            this.Author = data.book.user.name

            // 因为接口获取的img都自带width和height属性，会溢出容器，所以移除height属性
            let TempDiv = document.createElement('div')
            TempDiv.innerHTML = data.body_html
            for (let i of TempDiv.getElementsByTagName('img')) {
                i.style.height = ''
            }
            this.ArticleContentHtml = TempDiv.innerHTML

            this.PublishDate = data.created_at.substr(0,10) // 格式为2021-07-08T15:23:00.000Z，截取从第0个开始后10位的字符串
            this.AuthorAvatar = data.creator.avatar_url
            this.AuthorName = data.creator.name
            this.AuthorDescription = data.creator.description
            this.AuthorLogin = data.creator.login
            console.log(data)

            DocTags(data.id).then(resp => {
                this.Category = resp.data[0].title
            })
        },
        // 承接docInfo api返回的值，加工后赋值给各个参数（作者的通讯录）
        GetAuthorContacts(resp) {
            // 因为通讯录是以<table></table>的形式，所以先转化成html，再获取
            let TempDiv = document.createElement('div')
            TempDiv.innerHTML = resp.data.body_html
            let TempTable = TempDiv.getElementsByTagName('table')[0]

            // 代表表头，格式[id, weixin, weibo]
            let TableHeader = []
            for (let i of TempTable.rows.item(0).cells) {
                TableHeader.push(i.innerText)
            }
            // 代表表身，格式[{id:xx, weixin:xx, weibo:xx}]
            let TableBody = []
            // 从表身第一行开始，循环获取每行的数据(rows为行)
            for (let i = 1; i < TempTable.rows.length; i++) {
                // 代表每一行，格式{id:xx, weixin:xx}
                let EveRow = {}
                // 代表获取第几列
                let EveCell = 0
                // 循环获取当前这一行的所有单元格（cells为列）
                for (let j of TempTable.rows.item(i).cells) {
                    // 把表头[EveCell]和单元格的数据结合起来赋值给EveRow，格式{id:xx, weixin:xx}
                    EveRow[TableHeader[EveCell]] = j.outerText
                    // 表头[EveCell+1]
                    EveCell ++
                }
                // 把每一行的数据添加给TableBody，构成所有作者的contacts[{id:xx, weixin:xx, weibo:xx}]
                TableBody.push(EveRow)
            }
            // 从所有作者的contacts中，找到当前作者的信息，格式为{id:xx, weixin:xx, weibo:xx}
            let TargetAuthorContacts = TableBody.find(o => o.id == this.AuthorLogin)
            // 删除id的键值对
            delete TargetAuthorContacts.id
            // 删除值为空的键值对，因为空值代表没有这个社交账号
            Object.keys(TargetAuthorContacts).forEach(item => {
                if(!TargetAuthorContacts[item]) {
                    delete TargetAuthorContacts[item];
                }
            })
            this.AuthorContacts = TargetAuthorContacts
        }
    },
    async mounted() {
        // 从home=>content时的瞬间变成的scroll，目的是防止动画撕裂。进入content后，重新变成auto
        this.$store.commit('ChangeBodyScrollStatus', 'auto');
        // 从home=>content时会给home组件留500ms的缓冲时间，目的是给home留一些动画时间。进入content后清零
        this.$store.commit('ChangeHomeBuffer', 0);
        // 先调用docInfo api，获取到doc的各种信息
        let DocResp = await DocInfo('qinyujie-067rz/rkckig', this.$route.params.slug)
        // 使用GetDocInfo函数，加工doc信息
        await this.GetDocInfo(DocResp)
        // 再调用docInfo api，获取作者的contacts通讯录
        let ContactsResp = await DocInfo('qinyujie-067rz/yfezmc', 'xoql7l')
        // 使用GetAuthorContacts函数，加工contact信息
        await this.GetAuthorContacts(ContactsResp)
    },
    // 路由复用时，即/content/1 => /content/2
    beforeRouteUpdate (to, from, next) {
        next(
            // 把router.push的延时时间归零
            this.$store.commit('ChangeHomeBuffer', 0),
            // sinksomething是用来判断要不要隐藏除recommended之外的其他组件的，路由复用后，这些组件要回复原位
            this.$store.commit('SinkSomething', false),
            // 改变key，强制重新渲染cover组件，触发cover组件内部定义的mounted时的动画
            this.ReRenderCover += 1
        )
    },
}
</script>
<style lang="stylus" scoped>
sink-time = 0.2s
#main-content {
    .component-wrap {
        max-width 720px
        margin 0 auto
        padding 20px
        box-sizing border-box

        >* {
            margin-bottom 32px
        }
    }

    .cover-move-leave-to, .components-move-leave-to, .components-move-enter {
        transform translateY(100px)
        opacity 0
    }
    .cover-move-leave-active, .components-move-leave-active, .components-move-enter-active {
        transition all sink-time
    }
}
</style>