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
                    AuthorDetailAvatar: AuthorAvatar,
                    AuthorAvatarPlaceholder: AvatarPlaceholder
                }" 
            />
        </transition>

        <ArticleCard />

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
import { UserInfo } from '@/api/api.js'
export default {
    components: {
        Cover,
        ArticleCard,
        Footer
    },
    data() {
        return {
            AuthorName: '……',
            AuthorAvatar: undefined,
            AvatarPlaceholder: undefined,
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
        GetUserInfo(usid) {
            UserInfo(usid).then(res => {
                const data = res.data
                this.AuthorName = data.name
                this.AuthorAvatar = data.avatar_url
            })
        },
    },
    mounted() {
        // 加载author页面时，使得author头像不能被点击，因为已经在author页面里了
        this.$store.commit('DisableClickAuthor', true),

        this.GetUserInfo('22012465')
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