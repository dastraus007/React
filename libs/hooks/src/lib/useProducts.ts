import { useQuery } from '@tanstack/react-query'

export interface Product {
  id: number
  title: string
  price: number
  category?: string
  thumbnail?: string
  description?: string
  stock?: number
  brand?: string
  rating?: number
}

async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products')
  if (!res.ok) throw new Error('Failed to fetch')
  const data = await res.json()
  return data.products as Product[]
}

async function fetchProduct(id: number) {
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json() as Promise<Product>
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}

export function useProductDetail(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProduct(id),
  })
}
