// 导航条
<template>
    <div id="nav">
        <!-- 包一个father class，这样就能和卡片区域保持在一条线上了 -->
        <div class="nav-left-right-father">
            <div id="nav-left">
                <router-link to="/"><div id="nav-logo"><img src="../assets/logo.png" alt="LOGO"></div></router-link>
                <div id="nav-route">
                    <router-link to="/"><div>首页</div></router-link>
                    <div>论坛</div>
                    <div>关于</div>
                    <div>友链</div>
                    <router-link to="/test"><div>测试页</div></router-link>
                    <router-link to="/admin"><div>管理员</div></router-link>
                </div>
            </div>
            <!-- 这是普通的注册、登录按钮，平时启用，窄屏时隐藏 -->
            <div id="nav-right">
                <button class="login-and-signup login waves" @click="login">登录</button>
                <button class="login-and-signup signup waves" ref="DemoColor">注册</button>
                <i class="icon-menu waves" @click="ShowSideBar"></i>
            </div>
        </div>


        <!-- 这是侧边栏，平时隐藏，宽屏时启用 -->
        <transition name="side-bar-fade">
            <div id="nav-side-bar" v-show="ShowMaskAndSideBar">
                <a href="https://baidu.com" target="_blank" class="side-bar-route">首页</a>
                <a class="side-bar-route">论坛</a>
                <a class="side-bar-route">关于</a>
                <a class="side-bar-route">友链</a>
                <a class="side-bar-route">联系我</a>
                <button class="login-and-signup login waves">登录</button>
                <button class="login-and-signup signup waves">注册</button>
            </div>
        </transition>

        <transition name="mask-fade">
            <div id="side-bar-mask" v-show="ShowMaskAndSideBar" @click="HideSideBarAndMask"></div>
        </transition>

    </div>
</template>
<script>
import TouchJs from '../utils/touch.js/touch-0.2.14.min.js'

export default {
    data() {
        return {
            TouchJs,
            ShowMaskAndSideBar: false,
            // 以下为新加
            continuedCount: 0,
            counter: 0
        }
    },
    mounted() {
        // 使用touch.js，监测到#nav-side-bar左滑就关闭side-bar
        this.TouchJs.on(
            '#nav-side-bar', // 监测#nav-side-bar
            'swipeleft', // 监测左滑事件
            ev => {
                if (ev.type == 'swipeleft') {
                    this.ShowMaskAndSideBar = !this.ShowMaskAndSideBar
                }
            }
        )
    },
    methods: {
        ShowSideBar() {
            this.ShowMaskAndSideBar = !this.ShowMaskAndSideBar
        },
        HideSideBarAndMask() {
            this.ShowMaskAndSideBar = !this.ShowMaskAndSideBar
        },
        // 以下为新加
        countP1(){
            this.counter++
        },
        async login(){
        }
    },
}
</script>
<style lang="stylus" scoped>
#nav {
    width 100%
    height 80px
    box-sizing border-box
    display flex
    justify-content space-around
    box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)
    // 如果不给导航栏设置z-index的话，其他元素用了.waves和swiper就会排在他前面
    z-index 2

    // 如果支持backdrop-filter
    @supports (backdrop-filter: blur(5px)) or (-webkit-backdrop-filter blur(5px)) {
        backdrop-filter blur(5px)
        -webkit-backdrop-filter blur(5px)
        background-color rgba(255, 255, 255, 0.9)
    }
    // 如果不支持backdrop-filter
    @supports not (backdrop-filter: blur(5px) or (-webkit-backdrop-filter blur(5px))) {
        background-color rgba(255, 255, 255, 0.99)
    }
    position sticky
    top 0

    .nav-left-right-father {
        width 100%
        max-width 1240px
        display flex
        justify-content space-between
        // 这是和卡片区域保持一致，对齐
        padding 0 4%

        #nav-left {
            width 40%
            height 80px
            display flex

            #nav-logo {
                width 80px
                height 80px

                img {
                    width 80px
                    height 80px
                    transform scale(0.7)
                }
            }

            #nav-route {
                width 100%
                display flex
                justify-content space-around
                align-items center
                font-size large
            }
        }

        #nav-right {
            width 30%
            height 80px
            display flex
            align-items center
            justify-content flex-end

            .login-and-signup {
                width 90px
                height 30px
                margin-left 10px
                border-radius 4px
                border 1px solid
            }
            .login {
                border-color rgb(221, 221, 221)
                background-color white
            }
            .signup {
                border-color rgb(25, 221, 196)
                background-color rgb(25, 221, 196)
                color white
            }
            .icon-menu {
                display block
                width 30px
                height 30px
                background url('../assets/menu.png') no-repeat
                background-size contain
                border-radius 50%
                display none
            }
            .icon-menu:hover {
                // background-color rgb(220, 220, 220)
                cursor pointer
            }
        }
    }

    // 当卡片区域2列、1列时，导航栏也要和卡片保持一致
    @media screen and (max-width 992px) {
        .nav-left-right-father {
            width 720px
            padding 0

            #nav-left {
                flex 0.8
            }
        }
    }
    @media screen and (max-width 768px) {
        .nav-left-right-father {
            padding 0 15px
        }
    }

    // 侧边栏
    #nav-side-bar {
        width 260px
        height 100vh
        position fixed
        left 0
        background-color white
        z-index 2
        display flex
        flex-direction column

        .side-bar-route {
            display block
            text-decoration none
            color black
            border-bottom 1px solid LightGrey
            height 50px
            line-height 50px
            text-align left
            padding 0 16px
        }
        .side-bar-route:visited {
            color rgb(44, 62, 80)
        }

        .login-and-signup {
            width 90%
            height 30px
            margin 15px auto 0 auto
            border-radius 3px
            border 0.5px solid
        }
        .login {
            border-color rgb(221, 221, 221)
            background-color white
        }
        .signup {
            border-color rgb(25, 221, 196)
            background-color rgb(25, 221, 196)
            color white
        }
    }
    .side-bar-fade-enter-active, .side-bar-fade-leave-active {
        transition: all 0.2s
    }
    .side-bar-fade-enter, .side-bar-fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
        transform translateX(-260px)
    }

    // 侧边栏展开时的蒙版
    #side-bar-mask {
        position fixed
        left 0
        width 100%
        height 100vh
        box-sizing border-box
        background-color rgba(0, 0, 0, 0.85)
        z-index 1
    }
    .mask-fade-enter-active, .mask-fade-leave-active {
        transition: all 0.2s
    }
    .mask-fade-enter, .mask-fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
        opacity: 0
    }
}

@media screen and (max-width: 850px) {
    #nav {
        .nav-left-right-father {
            #nav-left {
                // 改变宽度，这样就能减少因为space-around造成的两端的空白
                width 50%
                #nav-route {
                    display none
                }
            }
            #nav-right {
                // 改变宽度，这样就能减少因为space-around造成的两端的空白
                width 40%
                .login-and-signup {
                    display none
                    // color red
                }
                .icon-menu {
                    display block
                }
            }
        }
    }
}
</style>
