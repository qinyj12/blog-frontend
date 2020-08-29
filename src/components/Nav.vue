<template>
    <div id="nav">
        <div id="nav-left">
            <div id="nav-logo"><img src="../assets/logo.png" alt="LOGO"></div>
            <div id="nav-route">
                <div>首页</div>
                <div>论坛</div>
                <div>关于</div>
                <div>友链</div>
                <div>联系我</div>
            </div>
        </div>
        <div id="nav-right">
            <button class="login-and-signup login">登录</button>
            <button class="login-and-signup signup">注册</button>
            <i class="icon-menu"></i>
        </div>
    </div>
</template>
<script>
export default {
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
    background-color rgba(255, 255, 255, 0.9)
    backdrop-filter blur(10px)
    position sticky
    top 0

    * {
        // border 1px solid
        // box-sizing border-box
    }

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
            margin-right 10px
            border-radius 4px
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
        .icon-menu {
            display block
            width 30px
            height 30px
            background url('../assets/menu.png') no-repeat
            background-size contain
            border-radius 50%
            
        }
        .icon-menu:hover {
            background-color rgb(220, 220, 220)
            cursor pointer
        }
        @media screen and (max-width: 850px) {
            .login-and-signup {
                // display none
                color red
            }
       }
    }

}
</style>
