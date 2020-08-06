Vue.component('error', {
    data(){
        return {
            showError: false,
        }
    },
    methods:{
        showErrors(){
            this.showError= !this.showError;
        }
    },
    template: `<p v-show="showError">Ошибка загрузки</p>
`
})