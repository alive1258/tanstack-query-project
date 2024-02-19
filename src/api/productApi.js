import axios from 'axios'

const createProduct = async productData => {
  try {
    const response = await axios.post(
      'http://localhost:3000/products',
      productData
    )
    return response.data
  } catch (error) {
    throw new Error('Failed to create product')
  }
}

const deleteProduct = async productId => {
  try {
    await axios.delete(`http://localhost:3000/products/${productId}`)
  } catch (error) {
    throw new Error('Failed to delete product')
  }
}

export { createProduct, deleteProduct }
