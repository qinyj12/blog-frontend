<template>
    <div class="test">
        <button @click="demo()">隐藏</button>
        <transition-group name="list">
            <!-- <h1 v-for="item in items" :key="item.item" class="list-item" v-show="!item.IfShow">{{item.item}}</h1> -->
            <h1 key="1" class="list-item" v-show="!IfShow">1</h1>
            <h1 key="2" class="list-item">2</h1>
        </transition-group>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                items: [{item: 1}, {item: 2}],
                IfShow: true
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

    .list-item {
        transition all 1s
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    .list-leave-active {
        position: absolute;
    }
}

</style>