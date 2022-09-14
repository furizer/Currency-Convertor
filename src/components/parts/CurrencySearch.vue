<template>
    <div class="currencies__search">
        <input type="text" placeholder="Введите название или символьный код валюты" v-model="search" @input="onSearchInput">
        <div class="currencies__search__info">
            <div>
                Курсы валют ЦБ РФ
            </div>    
            <div class="lastuppdate">
                
                <div class="currency__show_mark">Дата последнего обновления: </div>
                <span>{{updateData}}</span>
            </div>
        </div>
    </div>



</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        props: { currencies: { Object } },
        data() {
            return {
                search: '',
            }
        },

        computed: {
            ...mapGetters(['updateData'])
        },

        methods: {
            onSearchInput() {
                this.$store.commit('filteredValutes', this.search)
            }
        },
    }
</script>