import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import ProductList from './ProductList'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import { CartSidebar, ToastHost } from '@react-app/ui'
import { useCartStore } from './store/cartStore'
import { useToastStore } from './store/toastStore'
import { SidebarProvider, useSidebar } from './context/SidebarContext'
import { useTheme } from '@react-app/hooks'
import type { Language } from '@react-app/i18n'
import './App.css'

function AppContent() {
  const { t, i18n } = useTranslation()
  const totalItems = useCartStore((state) => state.getTotalItems())
  const { toggle, isOpen, close } = useSidebar()
  const { theme, setTheme } = useTheme()
  
  // Cart state
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice())
  
  // Toast state
  const toasts = useToastStore((state) => state.toasts)
  const removeToast = useToastStore((state) => state.removeToast)

  const changeLanguage = (lng: Language) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div>
      <nav>
        <div className="nav-controls">
          <Link to="/">{t('products')}</Link>
          <Link to="/cart">{t('cart')} ({totalItems})</Link>
          <button onClick={toggle}>
            🛒 {t('cartSidebar')}
          </button>
          
          {/* Language Switcher */}
          <div className="language-switcher">
            <span>{t('languageSwitcher')}:</span>
            <button 
              onClick={() => changeLanguage('en')}
              className={i18n.language === 'en' ? 'active' : ''}
            >
              English
            </button>
            <button 
              onClick={() => changeLanguage('he')}
              className={i18n.language === 'he' ? 'active' : ''}
            >
              עברית
            </button>
          </div>

          {/* Theme Switcher */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span>{t('themeSwitcher')}:</span>
            <button 
              onClick={() => setTheme('lara-light-blue')}
              style={{ fontWeight: theme === 'lara-light-blue' ? 'bold' : 'normal' }}
            >
              {t('lightTheme')}
            </button>
            <button 
              onClick={() => setTheme('lara-dark-blue')}
              style={{ fontWeight: theme === 'lara-dark-blue' ? 'bold' : 'normal' }}
            >
              {t('darkTheme')}
            </button>
          </div>
        </div>
        
        {/* Trans component example with formatting */}
        <div style={{ fontSize: '14px', marginTop: '10px', fontStyle: 'italic' }}>
          <Trans i18nKey="welcomeMessage" components={[<strong key="0" />]} />
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <CartSidebar 
        isOpen={isOpen}
        close={close}
        items={items}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
      />
      <ToastHost toasts={toasts} removeToast={removeToast} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App
