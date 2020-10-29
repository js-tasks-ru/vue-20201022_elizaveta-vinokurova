import Vue from './vue.esm.browser.js';

const app = new Vue({
    el: "#app",

    data() {
        return {
            btnValue: 0,
        }
    },

    methods: {
        countClicks() {
            this.btnValue++;
        }
    },
});