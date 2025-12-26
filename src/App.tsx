import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import ProductList from './ProductList'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import CartSidebar from './CartSidebar'
import ToastHost from './ToastHost'
import { useCartStore } from './store/cartStore'
import { SidebarProvider, useSidebar } from './context/SidebarContext'
import { useTheme } from './hooks/useTheme'
import './App.css'

function AppContent() {
  const { t, i18n } = useTranslation()
  const totalItems = useCartStore((state) => state.getTotalItems())
  const { toggle } = useSidebar()
  const { theme, setTheme } = useTheme()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div>
      <nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <Link to="/">{t('products')}</Link>
          <Link to="/cart">{t('cart')} ({totalItems})</Link>
          <button onClick={toggle}>
            🛒 {t('cartSidebar')}
          </button>
          
          {/* Language Switcher */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span>{t('languageSwitcher')}:</span>
            <button 
              onClick={() => changeLanguage('en')}
              style={{ fontWeight: i18n.language === 'en' ? 'bold' : 'normal' }}
            >
              English
            </button>
            <button 
              onClick={() => changeLanguage('he')}
              style={{ fontWeight: i18n.language === 'he' ? 'bold' : 'normal' }}
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
      <CartSidebar />
      <ToastHost />
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
