import { createRouter, createWebHistory } from 'vue-router'
import currencyList from '@/components/pages/CurrencyList'
import currencyConverter from '@/components/pages/СurrencyConverter'


const routes = [
    { path: '', redirect: '/CurrencyList' },

    {
        path: '/CurrencyList',
        name: 'currencyList',
        component: currencyList,
    },
    {
        path: '/CurrencyConverter',
        name: 'currencyConverter',
        component: currencyConverter
    },    



]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
