import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { useCartStore } from './store/cartStore'
import { useToastStore } from './store/toastStore'

interface ProductDetail {
  id: number
  title: string
  description: string
  price: number
  brand: string
  category: string
}

async function fetchProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json() as Promise<ProductDetail>
}

export default function ProductDetail() {
  const { id } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  })
  
  const addItem = useCartStore((state) => state.addItem)
  const addToast = useToastStore((state) => state.addToast)

  const handleAddToCart = () => {
    if (data) {
      addItem({ id: data.id, title: data.title, price: data.price })
      addToast('success', `${data.title} added to cart!`)
    }
  }

  if (isLoading) return <div>Loading product details...</div>
  if (error) {
    addToast('error', `Failed to load product: ${error.message}`)
    return <div>Error: {error.message}</div>
  }
  if (!data) return <div>No product found</div>

  return (
    <div>
      <Link to="/">← Back to Products</Link>
      <h1>{data.title}</h1>
      <p><strong>Price:</strong> ${data.price}</p>
      <p><strong>Brand:</strong> {data.brand}</p>
      <p><strong>Category:</strong> {data.category}</p>
      <p><strong>Description:</strong> {data.description}</p>
      <button 
        onClick={handleAddToCart}
        style={{ marginTop: '10px' }}
      >
        Add to Cart
      </button>
    </div>
  )
}
