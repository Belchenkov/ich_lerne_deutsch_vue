import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Books from './views/Books'
import Book from './views/Book'
import BookPart from './views/BookPart'
import Words from './views/Words'
import Profile from './views/Profile'
import Signin from './views/Signin'
import Signup from './views/Signup'
import Store from './store';

Vue.use(Router);

let router = new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/books', name: 'books', component: Books },
    { path: '/book/:id', name: 'book', component: Book, props: true },
    { path: '/book/:bookId/part/:partId', name: 'bookPart', component: BookPart, props: true },
    { path: '/words', name: 'words', component: Words },
    { path: '/profile', name: 'profile', component: Profile, meta: { authRequired: true } },
    { path: '/signin', name: 'signin', component: Signin },
    { path: '/signup', name: 'signup', component: Signup }
  ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {
  Store.dispatch('INIT_AUTH')
      .then(user => {
        if (to.matched.some(route => route.meta.authRequired)) {
          return user ? next() : false;
        } else {
          next();
        }
      })
      .catch(err => console.error(err));
});

export default router;
