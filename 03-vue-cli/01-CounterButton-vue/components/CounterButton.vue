<template>
    <button type="button" @click="onButtonClick">{{ count }}</button>
</template>

<script>
export default {
    name: 'counter-button',

    constants: {
        incrementValue: 1,
    },

    props: {
        count: {
            type: Number,
            default: 0,
        }
    },

    model: {
        prop: 'count',
        event: 'increment',
    },

    computed: {
        newCountValue() {
            return this.count + this.$options.constants.incrementValue;
        }
    },

    methods: {
        onButtonClick() {
            this.$emit('increment', this.newCountValue);
        },
    }
};
</script>

<style></style>
