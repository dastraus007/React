import { useSidebar } from './context/SidebarContext'
import { useCartStore } from './store/cartStore'
import { Link } from 'react-router-dom'

export default function CartSidebar() {
  const { isOpen, close } = useSidebar()
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice())

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
        }}
      />

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '400px',
          maxWidth: '90vw',
          height: '100vh',
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '-2px 0 5px rgba(0,0,0,0.3)',
          zIndex: 1000,
          overflowY: 'auto',
          padding: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: 'black' }}>Shopping Cart</h2>
          <button
            onClick={close}
            style={{
              fontSize: '24px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'black',
            }}
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p style={{ color: 'black' }}>Your cart is empty</p>
        ) : (
          <>
            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    borderBottom: '1px solid #eee',
                    padding: '15px 0',
                    color: 'black',
                  }}
                >
                  <h4 style={{ margin: '0 0 10px 0', color: 'black' }}>{item.title}</h4>
                  <p style={{ margin: '5px 0', color: 'black' }}>Price: ${item.price}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '5px 12px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                    >
                      -
                    </button>
                    <span style={{ color: 'black', minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        padding: '5px 12px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        marginLeft: 'auto',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', color: 'black' }}>
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: 'black' }}>Total: ${getTotalPrice.toFixed(2)}</h3>
              <Link to="/cart" onClick={close} style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#0066cc',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                  }}
                >
                  View Full Cart
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
