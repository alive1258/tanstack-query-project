import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

const AddProduct = ({ initialProduct = null }) => {
  const queryClient = useQueryClient()

  const [state, setState] = useState(
    initialProduct || {
      title: '',
      description: '',
      price: 0,
      rating: 5,
      thumbnail: '',
    }
  )

  const isUpdate = !!initialProduct // Check if it's an update or addition

  const mutation = useMutation({
    mutationFn: product => {
      if (isUpdate) {
        // PATCH request for updating existing product
        return axios.patch(
          `http://localhost:3000/products/${product.id}`,
          product
        )
      } else {
        // POST request for adding new product
        return axios.post('http://localhost:3000/products', product)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products'])
    },
    onMutate: () => {
      return { greeting: 'Say hello' }
    },
  })

  const submitData = event => {
    event.preventDefault()
    mutation.mutate(state)
  }

  const handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  if (mutation.isLoading) {
    return <span>{isUpdate ? 'Updating...' : 'Adding...'}</span>
  }
  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>
  }

  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
      <h2 className="text-2xl my-2">{isUpdate ? 'Update' : 'Add'} Product</h2>
      {mutation.isSuccess && (
        <p>{isUpdate ? 'Product Updated!' : 'Product Added!'}</p>
      )}
      <form className="flex flex-col" onSubmit={submitData}>
        <input
          type="text"
          value={state.title}
          name="title"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product title"
        />
        <textarea
          value={state.description}
          name="description"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product description"
        />

        <input
          type="number"
          value={state.price}
          name="price"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product price"
        />
        <input
          type="text"
          value={state.thumbnail}
          name="thumbnail"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product thumbnail URL"
        />

        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-1 rounded-md"
        >
          {isUpdate ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  )
}

export default AddProduct
