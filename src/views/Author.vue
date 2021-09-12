<template>
    <div class="author">
        <!-- 判断要不要隐藏cover，如果隐藏cover，给隐藏过程添加动画 -->
        <transition name="cover-footer-sink">
            <Cover 
                v-show="!IfSinkCover" 
                v-bind="{
                    CoverImg: require('../assets/featured-image.png'), 
                    CoverShowArticleDetail: false, 
                    CoverShowAuthorDetail: true,
                    AuthorDetailName: AuthorName,
                    AuthorDetailIntroduction: AuthorIntroduction,
                    contacts: AuthorContacts
                }" 
            />
        </transition>

        <ArticleCard :DocsRes="RepoDocsFromAPI" v-if="RepoDocsFromAPI" />

        <!-- 判断要不要隐藏footer组件，如果隐藏，给隐藏过程添加动画 -->
        <transition name="cover-footer-sink">
            <Footer v-show="!IfSinkCover" />
        </transition>
    </div>
</template>
<script>
import Cover from '@/components/Cover.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import Footer from '@/components/Footer.vue';
import { RepoDocs, UserInfo, DocInfo } from '@/api/api.js'
export default {
    components: {
        Cover,
        ArticleCard,
        Footer
    },
    data() {
        return {
            AuthorName: '……',
            AuthorIntroduction: undefined,
            AuthorContacts: {},
            AuthorLogin: undefined,
            RepoDocsFromAPI: undefined
        }
    },
    destroyed() {
        // 离开author页面时，恢复vuex为原状，使得author头像可以被点击
        this.$store.commit('DisableClickAuthor', false)
    },
    computed: {
        // 判断要不要隐藏cover和footer组件
        IfSinkCover() {
            return this.$store.state.IfSinkCover
        }
    },
    methods: {
        GetUserInfo(resp) {
            const { data } = resp
            this.AuthorName = data.name;
            this.AuthorIntroduction = data.description;
            this.AuthorLogin = data.login
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
    async created() {
        // 从语雀api拿到值，复制给子组件articlecard
        let DocsResp = await RepoDocs('20285594');
        // console.log(DocsResp)
        this.RepoDocsFromAPI = DocsResp.data
    },
    async mounted() {
        // 加载author页面时，使得author头像不能被点击，因为已经在author页面里了
        this.$store.commit('DisableClickAuthor', true);
        // 把usid传给api，去调取这个用户的信息
        let userResp = await UserInfo(this.$route.params.author);
        await this.GetUserInfo(userResp);

        // 再调用docInfo api，获取作者的contacts通讯录
        let ContactsResp = await DocInfo('qinyujie-067rz/yfezmc', 'xoql7l');
        // 使用GetAuthorContacts函数，加工contact信息
        await this.GetAuthorContacts(ContactsResp)
    },
}
</script>
<style lang="stylus" scoped>
sink-time = 0.2s
.author {
    .cover-footer-sink-leave-active {
        transition all sink-time
    }
    .cover-footer-sink-leave-to {
        transform translateY(100px)
        opacity 0
    }
    
}
</style>