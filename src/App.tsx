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
  const totalItems = useCartStore((state) => state.getTotalItems())
  const { toggle } = useSidebar()

  return (
    <div>
      <nav>
        <Link to="/">Products</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        <button onClick={toggle}>
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
