import * as productModule from './product'

describe('@state/modules/product', () => {
  it('exports a valid Vuex module', () => {
    expect(productModule).toBeAVuexModule()
  })

  describe('in a store', () => {
    let store
    beforeEach(() => {
      store = createModuleStore(productModule)
      // window.localStorage.clear()
    })

    it('Curent product is initialized correctly', () => {
      expect(store.getters.currentProduct.name).toEqual('sample prod')
    })

    it('mutations.SET_CURRENT_PRODUCT correctly saves currentProduct', () => {
      let savedCurrentUser = JSON.parse(
        window.localStorage.getItem('auth.currentUser')
      )
      expect(savedCurrentUser).toEqual(null)

      const expectedCurrentProduct = { product: 'some-product' }
      store.commit('SET_CURRENT_PRODUCT', expectedCurrentProduct)
      expect(store.getters.currentProduct.name).toEqual('some-product')
    })
  })
})
