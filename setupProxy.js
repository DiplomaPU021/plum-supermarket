import { createProxyMiddleware } from 'http-proxy-middleware';


app.use(
  '/api/3/checkout',
  createProxyMiddleware({
    target: 'https://www.liqpay.ua',
    changeOrigin: true,
  })
);

