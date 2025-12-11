import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProductList from './ProductList'
import ProductDetail from './ProductDetail'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Products</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
