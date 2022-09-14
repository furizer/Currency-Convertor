import { createStore } from 'vuex'

export default createStore({
    state: () => ({
        currencies: [],
        filteredCurrencies : [],
        updateData : '',

    }),

    mutations: {
        // установка и приведение к более читаймым числам значений валют
        setCurrencies(state, currencies) {
            
            let object = currencies.Valute
            for (const key in object) {
                object[key].Value = object[key].Value.toFixed(3)
                object[key].Previous = object[key].Previous.toFixed(3)
                object[key].Difference = object[key].Value - object[key].Previous
                object[key].Difference = object[key].Difference.toFixed(3)
            }
            state.currencies = currencies.Valute
            state.filteredCurrencies = state.currencies
        },

        createLastUpdateData(state, data) {
            state.updateData = data.toString().slice(0,10).split('-').reverse().join('.')
        },

        // фильтрация списка валют (поиск)
        filteredValutes(state, search) {

            state.filteredCurrencies = state.currencies
            let result = {};
            let condition = search.toLowerCase().trim().replaceAll(' ', '')

            for (let key in state.filteredCurrencies) {
                let exp = (state.filteredCurrencies[key].Name.replaceAll(' ', '') + state.filteredCurrencies[key].CharCode).toLowerCase()

                if (exp.match(condition) || exp.match(condition)) {
                    result[key] = Object.assign({}, state.filteredCurrencies[key]);
                }

            }
            state.filteredCurrencies = result;

        },

    },

    actions: {
        // получение данных с серва
        async fetchCurrency(context) {
            try {
                const resp = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
                const data = await resp.json();
                await context.commit('createLastUpdateData', data.Date)

                return await context.commit("setCurrencies", data);
            } catch (err) {
                return console.error(err);
            }
        },

    },

    getters: {
        currencies(state) {
            return state.filteredCurrencies
        },

        // показ блока "поиск без результатов"
        noSearchResults(state) {
            return Object.keys(state.filteredCurrencies).length == 0 
           
        },
        
        updateData(state) {
            return state.updateData
        }
    },
})
