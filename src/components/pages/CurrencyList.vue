<template>
    <div class="currency__header">

        <CurrencySearch 
            v-if="currencies" 
            :currencies="currencies" 
        
        />
        <CurrencyShow :selectedCurrency="selectedCurrency"/>

    </div>

    <div v-if="noSearchResults" class="currencies__search-no-result">
        <span>Посиск не дал результатов...</span>
        <svg width="225" height="225" viewBox="0 0 225 225" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="225" height="225" fill="url(#pattern0)"/>
            <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_1_3" transform="scale(0.00444444)"/>
            </pattern>
            <image id="image0_1_3" width="225" height="225" xlink:href="data:image/png;base64,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"/>
            </defs>
        </svg>
    </div>

    <div v-if="currencies" class="currencies">

        <div v-for="item in currencies"
            :key="item.key" 
            class="currency" 
            v-on:click="selectCurrency(item)"
        >

            <div class="currency_name">
                {{ item.Name }}
                <span>({{ item.CharCode }})</span>
            </div>

        </div>


    </div>



</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    import CurrencyShow from '@/components/parts/CurrencyShow'
    import CurrencySearch from '@/components/parts/CurrencySearch'

    export default {
        components: { CurrencyShow, CurrencySearch },
       
        data() {
            return {
                selectedCurrency: JSON.parse(localStorage.getItem('selectedCurrency')) || undefined,
            }
        },

        computed: {
            ...mapGetters(['currencies', 'noSearchResults'])
            
        },
        methods: {
            ...mapActions(["fetchCurrency"]),

            selectCurrency(item) {
                this.selectedCurrency = item
                localStorage.setItem('selectedCurrency', JSON.stringify(item))
            },

        },
        created() {
            this.fetchCurrency()
        },

    }
</script>