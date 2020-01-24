import axios from 'axios'

export const state = {
  currentProduct: {
    id: 2,
    version: 1,
    name: 'sample prod',
    available: false,
  },
}

export const getters = {
  currentProduct(state) {
    return state.currentProduct
  },
}

export const mutations = {
  SET_CURRENT_PRODUCT(state, newProduct) {
    state.currentProduct = newProduct
  },
}

export const actions = {
  getProduct({ commit }, { id, accessToken }) {
    var options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    }
    return axios
      .get(`http://localhost:8082/product/${id}`, options)
      .then(response => {
        const product = response.data
        commit('SET_CURRENT_PRODUCT', product)
        return product
      })
  },
}
