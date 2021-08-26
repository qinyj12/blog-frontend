// 关于作者的卡片，放在content里面
<template>
    <div id="author-card">
        <div class="author-card">
            <img :src="avatar" alt="avatar" class="author-avatar">
            <div class="author-introduction">
                <h4 class="author-name">{{name}}</h4>
                
                <v-clamp :max-lines="2" max-height="calc(100% - 44px)" autoresize class="author-self-introduction">
                    {{description}}
                </v-clamp>
                <!-- 从祖元素拿到值，不用props，直接用$attrs传给孙元素 -->
                <ContactsList v-bind="$attrs" v-on="$listeners"/>
            </div>
        </div>

    </div>
</template>
<script>
import ContactsList from '@/components/ContactsList.vue';
export default {
    components: {
        ContactsList
    },
    props: {
        avatar: {
            default: function(val) {
                return require('@/assets/avatar.png')
            }
        },
        name: String,
        description: String,
        // contacts: Object
    },
    methods: {
        VisitUrl(url) {
            window.open(url);
        }
    },
}
</script>
<style lang="stylus" scoped>
#author-card {
    .author-card {
        text-align left
        width 100%
        height 150px
        border-radius 4px
        box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)
        box-sizing border-box
        padding 24px
        display flex
        align-items center

        .author-avatar {
            width 96px
            height 96px
            object-fit cover
            margin-right 15px
            border-radius 4px
        }

        .author-introduction {
            flex 1
            height 96px
            display flex
            flex-direction column

            .author-name {
                margin 0
                height 24px
            }

            .author-self-introduction {
                box-sizing border-box
                flex 1
                padding 5px 0
            }
        }
    }
}
</style>