export default {
  name: process.env.APP_NAME || 'app',
  port: process.env.APP_PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'my jwt secret',
};
