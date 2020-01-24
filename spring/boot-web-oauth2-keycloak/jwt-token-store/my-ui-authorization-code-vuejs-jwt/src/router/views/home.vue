<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import ProductDetails from '@components/product/product-details'
export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, ProductDetails },
}
</script>

<template>
  <Layout>
    <h1>Home Page</h1>
    <img
      src="@assets/images/logo.png"
      alt="Logo"
    >
    <product-details/>
  </Layout>
</template>
