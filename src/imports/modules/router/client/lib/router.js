import VueRouter from 'vue-router';
import { requireAuth, requireNoAuth } from './auth-hooks';

const PageSignUpAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageSignUp.vue')
    .then(PageSignUp => resolve(PageSignUp.default));
};
const PageSignInAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageSignIn.vue')
    .then(PageSignIn => resolve(PageSignIn.default));
};
const PageResetPasswordAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageResetPassword.vue')
    .then(PageResetPassword => resolve(PageResetPassword.default));
};
const PageHomeAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageHome.vue')
    .then((PageHome) => resolve(PageHome.default));
};
const PagePrivateAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PagePrivate.vue')
    .then(PagePrivate => resolve(PagePrivate.default));
};

const createRouter = () => {
  const routes = [
    { path: '/sign-up', name: 'sign-up', component: PageSignUpAsync, beforeEnter: requireNoAuth },
    { path: '/sign-in', name: 'sign-in', component: PageSignInAsync, beforeEnter: requireNoAuth },
    { path: '/reset-password', name: 'reset-password', component: PageResetPasswordAsync, beforeEnter: requireNoAuth },
    { path: '/reset-password/:token', name: 'reset-password-token', component: PageResetPasswordAsync, beforeEnter: requireNoAuth },
    { path: '/home', name: 'home', component: PageHomeAsync },
    { path: '/private', name: 'private', component: PagePrivateAsync, beforeEnter: requireAuth },
    { path: '/', component: PageHomeAsync }
  ];

  const router = new VueRouter({
    routes,
    mode: 'history'
  });

  return router;
};

export {
  createRouter
};
