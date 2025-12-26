import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useCartStore } from './store/cartStore'
import { useToastStore } from './store/toastStore'

interface Product {
  id: number
  title: string
  price: number
  category?: string
  thumbnail?: string
}

async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products')
  if (!res.ok) throw new Error('Failed to fetch')
  const data = await res.json()
  return data.products as Product[]
}

export default function ProductList() {
  const { t, i18n } = useTranslation(['products', 'common'])
  const navigate = useNavigate()
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
  
  const addItem = useCartStore((state) => state.addItem)
  const addToast = useToastStore((state) => state.addToast)

  const handleAddToCart = (product: Product) => {
    addItem({ id: product.id, title: product.title, price: product.price })
    addToast('success', t('common:addedToCart', { title: product.title }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language === 'he' ? 'he-IL' : 'en-US', {
      style: 'currency',
      currency: i18n.language === 'he' ? 'ILS' : 'USD',
    }).format(price)
  }

  // Column templates
  const imageBodyTemplate = (rowData: Product) => {
    return (
      <img 
        src={rowData.thumbnail} 
        alt={rowData.title} 
        style={{ width: '64px', height: '64px', objectFit: 'cover' }} 
      />
    )
  }

  const priceBodyTemplate = (rowData: Product) => {
    return formatPrice(rowData.price)
  }

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button 
          label={t('common:viewDetails')} 
          icon="pi pi-eye" 
          onClick={() => navigate(`/products/${rowData.id}`)}
          size="small"
        />
        <Button 
          label={t('common:addToCart')} 
          icon="pi pi-shopping-cart" 
          onClick={() => handleAddToCart(rowData)}
          size="small"
          severity="success"
        />
      </div>
    )
  }

  if (isLoading) return <div>{t('products:loadingProducts')}</div>
  if (error) {
    addToast('error', `${t('products:failedToLoad')}: ${error.message}`)
    return <div>{t('common:error')}: {error.message}</div>
  }

  const productCount = data?.length || 0

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t('products:title')}</h1>
      {/* Interpolation example */}
      <p>{t('products:showingCount', { count: productCount })}</p>
      {/* Pluralization example */}
      <p><em>{t('products:productCount', { count: productCount })}</em></p>
      
      <DataTable 
        value={data} 
        paginator 
        rows={10} 
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}
        sortMode="multiple"
        emptyMessage={t('common:noResults')}
      >
        <Column 
          field="thumbnail" 
          header={t('products:image')} 
          body={imageBodyTemplate}
          style={{ width: '100px' }}
        />
        <Column 
          field="title" 
          header={t('products:title')} 
          sortable
        />
        <Column 
          field="category" 
          header={t('products:category')} 
          sortable
        />
        <Column 
          field="price" 
          header={t('products:price')} 
          body={priceBodyTemplate}
          sortable
        />
        <Column 
          header={t('common:actions')} 
          body={actionBodyTemplate}
          style={{ width: '300px' }}
        />
      </DataTable>
    </div>
  )
}
