<script>
import { productComputed, productMethods } from '@state/helpers'
export default {
  // data() {
  //   return {
  //     currentProduct: {
  //       id: 2,
  //       version: 1,
  //       name: 'sample prod',
  //       available: false,
  //     },
  //   }
  // },
  computed: {
    ...productComputed,
  },
  methods: {
    ...productMethods,
    tryGetProduct() {
      this.getProduct({
        id: 2,
        accessToken: this.currentUser['access_token'],
      })
        .then(data => {
          console.log(this.currentProduct)
          this.currentProduct = data
        })
        .catch(error => {
          console.log(error)
          this.currentProduct.name = 'Error'
        })
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <h1 class="col-sm-12">product Details</h1>
    <div class="col-sm-12">
      <label class="col-sm-3">ID</label> <span>{{ currentProduct.id }}</span>
    </div>
    <div class="col-sm-12">
      <label class="col-sm-3">Name</label> <span>{{ currentProduct.name }}</span>
    </div>
    <div class="col-sm-12">
      <button
        class="btn btn-primary"
        type="submit"
        @click="tryGetProduct()">
        New product
      </button>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  padding: 0;
  margin: 0 0 $size-grid-padding;
  text-align: center;
  list-style-type: none;

  > li {
    display: inline-block;
    margin-right: $size-grid-padding;
  }
}
</style>
