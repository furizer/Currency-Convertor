<template>
    <div class="converter">

        <div class="convert_from converter_item">
            <select 
                v-model="from"   
                @change="convertVlaute"
            >
                <option 
                    v-for="item in currencies" 
                    :key="item.id" 
                    :value="item"
                >
                    {{ item.Name }}
                </option>
            </select>

            <div class="convertor__input">
                <input type="number" min="0" @input="convertVlaute" v-model="quantity">
                <div></div>
            </div>
        </div>

        <div class="change__convert" @click="reverseConverter">
            <div class="convert__left-arrow">
                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                </svg>
            </div>
            <div class="convert__right-arrow">
                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                </svg>
            </div>
        </div>

        <div class="convert_to converter_item">
            <select 
                v-model="to"
                @change="convertVlaute"
            >
                <option 
                    v-for="item in currencies" 
                    :key="item.id" 
                    :value="item"
                >
                    {{ item.Name }}
                </option>
            </select>

            <div class="convertor__input">
                <input type="number" min="0" disabled :value="result" placeholder="0,000">
                <div></div>
            </div>
        </div>
    </div>
    {{  }}

</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    export default {
        data() {
            return {
                from: {},
                to: {},
                quantity : null,
                result : null,
            }
        },
        computed: {
            ...mapGetters(["currencies"]),
        },
        methods: {
            ...mapActions(["fetchCurrency"]),

            // Конвертер
            convertVlaute() {
                this.result = (this.from.Value * this.quantity / this.to.Value).toFixed(3)
            },

            // функция смены блоков конвертора местами
            reverseConverter(){
                let temp = {}
                temp = this.to

                this.to = this.from
                this.from = temp

                this.convertVlaute()
            },

            // установка дефолтных занчений
            setDefoultValue(){
                this.from = this.currencies["RUB"]
                this.to = this.currencies["USD"]
            }

        },
        async created() {
            await this.fetchCurrency()
            // Добавление Российских рубелй
            this.currencies['RUB'] = {
                Name : 'Российский рубль',
                Value : 1,
                CharCode : 'RUB'

            }
            this.setDefoultValue()
        },

        
    }
</script>