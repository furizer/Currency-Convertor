<template>
    <div class="app__header">
        
        <div class="main-nav">
            <router-link :to="{ name: 'currencyList' }" class="nav-item">Список валют</router-link>
            <router-link :to="{ name: 'currencyConverter' }" class="nav-item">Конвертер валют</router-link>
        </div>

    </div>
    <div class="container">
        <router-view/>
    </div>
</template>