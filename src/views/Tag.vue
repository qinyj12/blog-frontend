<template>
    <div class="tag">
        <!-- 判断要不要隐藏cover，如果隐藏cover，给隐藏过程添加动画 -->
        <transition-group name="tag-content-sink">
            <Cover 
                v-show="!IfSink" 
                v-bind="{
                    CoverImg: require('../assets/featured-image.png'), 
                    CoverShowArticleDetail: false, 
                    //CoverShowAuthorDetail: true
                }" 
                key="cover"
            />
            <!-- 一定要加vif，等待父组件tag拿到api返回的值后，子组件articlecard才能加载 -->
            <ArticleCard 
                :key="ArticleCardKey" 
                :DocsRes="RepoDocsFromAPI"
                v-if="RepoDocsFromAPI"
            />

        <!-- 判断要不要隐藏footer组件，如果隐藏，给隐藏过程添加动画 -->
            <Footer v-show="!IfSink" key="footer" />
        </transition-group>
    </div>
</template>
<script>
import Cover from '@/components/Cover.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import Footer from '@/components/Footer.vue';
import { RepoDocs, TagDocs, UserInfo } from '@/api/api.js';
export default {
    components: {
        Cover,
        ArticleCard,
        Footer
    },
    data() {
        return {
            RepoDocsFromAPI: undefined,
            ArticleCardKey: 0
            // ReloadArticleCard: 0
        }
    },
    computed: {
        // 判断要不要隐藏cover和footer组件
        IfSink() {
            return this.$store.state.IfSinkCover
        }
    },
    watch: {
        
    },
    methods: {
        // 这个函数是用来刷新articlecard组件的
        ReloadArticleCard() {
            this.ArticleCardKey ++
        },
        async InitializeData(api) {
            // 从语雀api拿到值，复制给子组件articlecard
            let DocsResp = await TagDocs(api);
            // 此时拿到的结构为{data:[0:{doc:{id:xx,...}}, 1:{doc:{id:xx,...}}]}，要转为[0:{id:xx,...},...]
            let TempArr = new Array();
            // 遍历[0:{doc:{id:xx,...}}]
            for (let i in DocsResp.data) {
                // 因为这个语雀api（tagDocs）拿到的返回值是不带last_editor字段的，这会让articlecard出错，因为articlecard组件靠此字段拿到用户信息
                // 所以再凭借usid去调用userinfo api，获取用户信息
                let TempUserInfo = await UserInfo(DocsResp.data[i].doc.user_id)
                // 直接把用户信息赋值到docsresp中
                DocsResp.data[i].doc.last_editor = TempUserInfo.data
                // 最后组成一个复合articlecard要求的新数组
                TempArr.push(DocsResp.data[i].doc)
            }
            // 把数组传给articlecard组件
            this.RepoDocsFromAPI = TempArr;
            // 刷新articlecard子组件，因为该子组件承接了本父组件的数据
            await this.ReloadArticleCard()
        }
    },
    async created() {
        await this.InitializeData(this.$route.params.tag)
    },
    mounted() {
        // 恢复滚动条为默认
        this.$store.commit('ChangeBodyScrollStatus', 'auto');

    },
    // tag => tag时触发。其实不是tag=>tag，只是复用tag组件而已，router不会有任何变化
    async beforeRouteUpdate (to, from, next) {
        // 给0.5s动画时间
        setTimeout(() => {
            // 0.5s后，进入下一个路由
            next(
                // 进入下一个路由后，重新从api获取数据
                this.InitializeData(to.params.tag),
            )
        }, this.$store.state.HomeBuffer);   
    }
}
</script>
<style lang="stylus" scoped>
sink-time = 0.2s
.tag {
    .tag-content-sink-enter, .tag-content-sink-leave-to {
        opacity 0
        transform translateY(100px)
    }
    .tag-content-sink-enter-active, .tag-content-sink-leave-active {
        transition all sink-time
    }
}
</style>