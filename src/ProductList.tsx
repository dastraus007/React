import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

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

  if (isLoading) return <div>Loading products...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.title} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
