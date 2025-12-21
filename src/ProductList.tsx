import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useCartStore } from './store/cartStore'
import { useToastStore } from './store/toastStore'

interface Product {
  id: number
  title: string
  price: number
}

async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products')
  if (!res.ok) throw new Error('Failed to fetch')
  const data = await res.json()
  return data.products as Product[]
}

export default function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
  
  const addItem = useCartStore((state) => state.addItem)
  const addToast = useToastStore((state) => state.addToast)

  const handleAddToCart = (product: Product) => {
    addItem({ id: product.id, title: product.title, price: product.price })
    addToast('success', `${product.title} added to cart!`)
  }

  if (isLoading) return <div>Loading products...</div>
  if (error) {
    addToast('error', `Failed to load products: ${error.message}`)
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.map((product) => (
          <li key={product.id} style={{ marginBottom: '10px' }}>
            <Link to={`/products/${product.id}`}>
              {product.title} - ${product.price}
            </Link>
            <button 
              onClick={() => handleAddToCart(product)}
              style={{ marginLeft: '10px' }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
