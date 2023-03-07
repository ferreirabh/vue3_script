import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

import 'vant/lib/index.css';
import App from './App.vue';
import List from './components/List.vue';
import Details from './components/Details.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/characters' },
    { path: '/characters', component: List },
    { path: '/characters/:id', component: Details }
  ]
})

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

createApp(App)
  .use(router)
  .provide(DefaultApolloClient, apolloClient)
  .mount('#app');
