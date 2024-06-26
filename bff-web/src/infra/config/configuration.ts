export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    baseUrl: process.env.URL_MOBI7
  });