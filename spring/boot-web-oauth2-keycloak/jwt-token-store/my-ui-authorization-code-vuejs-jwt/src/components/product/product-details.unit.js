import ProductDetails from './product-details'

describe('@components/product/product-details', () => {
  it(`displays the product's name on the screen`, () => {
    const { vm } = shallowMount(
      ProductDetails,
      createComponentMocks({
        store: {
          product: {
            state: {
              currentProduct: {
                name: 'sample prod',
              },
            },
          },
        },
      })
    )
    const currentProduct = vm.currentProduct
    expect(currentProduct.name).toEqual('Logged in as My Name')
  })
})
