import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const { t, i18n } = useTranslation(['products', 'common'])

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
      addToast('success', t('common:addedToCart', { title: data.title }))
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language === 'he' ? 'he-IL' : 'en-US', {
      style: 'currency',
      currency: i18n.language === 'he' ? 'ILS' : 'USD',
    }).format(price)
  }

  if (isLoading) return <div>{t('products:loadingDetails')}</div>
  if (error) return <div>{t('common:error')}: {error.message}</div>
  if (!data) return <div>{t('products:productNotFound')}</div>

  return (
    <div>
      <Link to="/">← {t('products:backToProducts')}</Link>
      <h1>{data.title}</h1>
      <p><strong>{t('products:price')}:</strong> {formatPrice(data.price)}</p>
      <p><strong>{t('products:brand')}:</strong> {data.brand}</p>
      <p><strong>{t('products:category')}:</strong> {data.category}</p>
      <p><strong>{t('products:description')}:</strong> {data.description}</p>
      <button 
        onClick={handleAddToCart}
        style={{ marginTop: '10px' }}
      >
        {t('common:addToCart')}
      </button>
    </div>
  )
}
