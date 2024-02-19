import { useState } from 'react'
import './App.css'
import AddProduct from './components/AddProduct'

import ProductDetails from './components/ProductDetails'
import ProductList from './components/ProductList'

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null)
  return (
    <>
      <div className="flex m-2">
        <AddProduct />
        <ProductList onSelectedProduct={setSelectedProductId} />

        <ProductDetails id={selectedProductId} />
      </div>
    </>
  )
}

export default App
