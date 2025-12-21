import { Link } from 'react-router-dom'
import { useCartStore } from './store/cartStore'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice())

  if (items.length === 0) {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
        <Link to="/">← Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <Link to="/">← Continue Shopping</Link>
      
      <div style={{ marginTop: '20px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            marginBottom: '10px',
            borderRadius: '5px'
          }}>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label>Quantity:</label>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button 
                onClick={() => removeItem(item.id)}
                style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white' }}
              >
                Remove
              </button>
            </div>
            <p><strong>Subtotal: ${(item.price * item.quantity).toFixed(2)}</strong></p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', border: '2px solid #333' }}>
        <h2>Total: ${getTotalPrice.toFixed(2)}</h2>
        <button 
          onClick={clearCart}
          style={{ backgroundColor: '#ff4444', color: 'white', marginTop: '10px' }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}
