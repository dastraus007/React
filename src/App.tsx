import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProductList from './ProductList'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import CartSidebar from './CartSidebar'
import ToastHost from './ToastHost'
import { useCartStore } from './store/cartStore'
import { SidebarProvider, useSidebar } from './context/SidebarContext'
import './App.css'

function AppContent() {
  const getTotalItems = useCartStore((state) => state.getTotalItems())
  const { toggle } = useSidebar()

  return (
    <div>
      <nav style={{ display: 'flex', gap: '20px', padding: '10px', borderBottom: '2px solid #333', alignItems: 'center' }}>
        <Link to="/">Products</Link>
        <Link to="/cart">Cart ({getTotalItems})</Link>
        <button
          onClick={toggle}
          style={{
            marginLeft: 'auto',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          🛒 Cart Sidebar
        </button>
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
