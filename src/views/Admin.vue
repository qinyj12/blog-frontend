<template>
    <div class="admin">
        <mavon-editor class="mavon-editor"  v-model="value"/>

        <div class="button-area">
            <button @click="publish">publish</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: ''
        }
    },
    methods: {
        publish() {
            console.log(this.value)
        }
    },
}
</script>
<style lang="stylus" scoped>
.admin {

    padding 64px 5%

    @media screen and (max-width 992px) {
        max-width 720px
        margin 0 auto
        padding 64px 0
    }

    .button-area {
        margin 30px 0
        text-align right
    }

}
</style>