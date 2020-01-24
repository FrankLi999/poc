const appConfig = require('./src/app.config')

module.exports = {
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appConfig.title,
    // Set up all the aliases we use in our app.
    resolve: {
      alias: require('./aliases.config').webpack,
    },
    devtool: 'source-map',
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
  // Configure Webpack's dev server.
  // https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md
  devServer: {
    //    ...(process.env.API_BASE_URL
    //      ? // Proxy API endpoints to the production base URL.
    //        { proxy: { '/api': { target: process.env.API_BASE_URL } } }
    //      : // Proxy API endpoints a local mock API.
    //        { before: require('./tests/mock-api') }),
    //	  proxy: {
    //		  '/api': { target: process.env.VUE_APP_API_BASE_URL },
    //		  '/auth': { target: process.env.VUE_APP_AUTH_BASE_URL },
    //	  }
    before: require('./tests/mock-api'),
  },
}
