<template>
    <div class="test">
        <button v-on:click="shuffle">Shuffle</button>
        <transition-group name="flip-list" tag="ul">
            <li v-for="item in items" v-bind:key="item">
                {{ item }}
            </li>
        </transition-group>
    </div>
</template>
<script>
import _ from '@/static/lodash.min.js'
    export default {
        data() {
            return {
                items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                nextNum: 10
            }
        },
        methods: {
            shuffle: function () {
                this.items = _.shuffle(this.items)
            }
        },
    }
</script>
<style lang="stylus" scoped>
    .flip-list-move {
        transition: transform 1s;
    }
</style>