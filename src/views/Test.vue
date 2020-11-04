<template>
    <div class="test">
        <button @click="demo()">父元素</button>
        <button @click="son()">子元素</button>
        <div>
            <transition-group name="list">
                <!-- <h1 v-for="item in items" :key="item.item" class="list-item" v-show="!item.IfShow">{{item.item}}</h1> -->
                <h1 key="1" class="list-item">1</h1>
                <div key="2" class="list-item" v-show="IfShow">
                    <transition name="son-fade">
                        <h1 class="son" v-show="IfShowSon">2</h1>
                    </transition>
                    
                </div>
                <h1 key="3" class="list-item">3</h1>
            </transition-group>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                items: [{item: 1}, {item: 2}],
                IfShow: false,
                IfShowSon: true
            }
        },
        methods: {
            HideItem(index) {
                let TargetItem = this.items[index];
                TargetItem.IfShow = !TargetItem.IfShow;
                this.$set(this.items, index, TargetItem);
            },
            demo() {
                this.IfShow = !this.IfShow
            },
            son() {
                this.IfShowSon = !this.IfShowSon
            }
        },
        mounted() {
            this.$nextTick(
                () => {
                    this.demo()
                }
            )
        },
    }
</script>
<style lang="stylus" scoped>
.test {
    border 1px solid 
    width 100%
    height 300px
    box-sizing border-box
    text-align left
    position relative

    .list-item {
        transition all 1s
        border 1px solid
        height 50px
        // display inline-block
        text-align center
    }
    // 定义进入的初始状态
    .list-enter {
        // opacity 0;
        // transform translateY(-150px)
        // transform translateX(-150px)

    }
    // 进入阶段的持续状态
    .list-enter-active {

    }
    // 进入阶段的结束状态
    .list-enter-to {
        color red
    }

    // 定义离开的起始状态
    .list-leave {
        // transform translateX(50px)
    }
    // 离开阶段的持续状态：让动画元素脱离文档流，让非动画元素回到原来位置
    .list-leave-active {
        position: absolute;
    }
    // 定义离开的结束状态
    .list-leave-to {
        // opacity: 0;
        transform: translateY(50px);
    }

    .son {
        margin 0
        transition all 1s
    }
    .son-fade-enter {
        transform translateX(100px)
    }
    .son-fade-enter-active {

    }
    .son-fade-enter-to {
    
    }

    .son-fade-leave {

    }
    .son-fade-active {

    }
    .son-fade-leave-to {
        transform translateX(100px)
    }

}

</style>