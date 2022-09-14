<template>

    <div class="currency__show" v-if="selectedCurrency">

        <div class="currency__show-item">
            
            <div class="currency__show-item-info"><span class="currency__show_mark">Номер: </span>{{selectedCurrency.NumCode}}</div>
            
            <div class="currency__show-item-info"><span class="currency__show_mark">Название: </span>{{selectedCurrency.Name}}({{selectedCurrency.CharCode}})</div>

            <div class="currency__show_difference up" v-if="selectedCurrency.Difference > 0">
                <span class="currency__show_mark">Изменение курса: </span> +{{selectedCurrency.Difference}} ▲
            </div>

            <div class="currency__show_difference down" v-if="selectedCurrency.Difference <= 0">
                <span class="currency__show_mark">Изменение курса: </span> {{selectedCurrency.Difference}} ▼
            </div>

        </div> 
        
        <div class="currency__show-item currency__show-item_course">
            <div class="currency__show-item_course-block">
                <div v-if="rubTo == true">
                    <div><span>1</span>{{selectedCurrency.CharCode}}</div>
                </div>
                <div v-if="rubTo == false">
                    <div><span>{{ countRUBtoCurrency(selectedCurrency.Value) }}</span>{{selectedCurrency.CharCode}}</div>
                </div>
                
            </div>

            <div 
                :class=" rubTo == true ? 'currency__show-item__arrow' : 'currency__show-item__arrow active' "
                @click="rubToChange"
            >
                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
            </div>

            <div class="currency__show-item_course-block">

                <div v-if="rubTo == true">
                    <div>{{selectedCurrency.Value}} <span>RUB</span></div>
                </div>

                <div v-if="rubTo == false">
                    <div><span>1</span>RUB</div>
                </div>  

            </div>            
        </div>

    </div>    
    
</template>

<script>
export default {
    props: { selectedCurrency: { Object } },
    data() {
        return {
            rubTo : true
        }
    },

    methods: {
        countRUBtoCurrency(vlaue) {
            let count = 1 / Number(vlaue)
            return count.toFixed(5)
        },
        rubToChange() {
            this.rubTo = !this.rubTo
        }
    },
}
</script>