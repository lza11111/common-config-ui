import { defineConfig } from 'umi';

export default defineConfig({
  // routes: [
  //   { path: '/', redirect: '/app' },
  // ],
  theme: {
    'primary-color': '#1590ff'
},
  proxy: {
    '/api': {
      target: 'http://192.168.101.218:8888/',
      changeOrigin: true,
    },
  },
});
