import { useToastStore } from './store/toastStore'

export default function ToastHost() {
  const toasts = useToastStore((state) => state.toasts)
  const removeToast = useToastStore((state) => state.removeToast)

  const getToastStyles = (type: 'success' | 'error' | 'info') => {
    const baseStyles: React.CSSProperties = {
      padding: '16px 20px',
      marginBottom: '10px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: '300px',
      maxWidth: '500px',
      animation: 'slideIn 0.3s ease-out',
    }

    switch (type) {
      case 'success':
        return {
          ...baseStyles,
          backgroundColor: '#4caf50',
          color: 'white',
        }
      case 'error':
        return {
          ...baseStyles,
          backgroundColor: '#f44336',
          color: 'white',
        }
      case 'info':
        return {
          ...baseStyles,
          backgroundColor: '#2196f3',
          color: 'white',
        }
    }
  }

  if (toasts.length === 0) return null

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} style={getToastStyles(toast.type)}>
            <div style={{ flex: 1 }}>
              <strong style={{ marginRight: '8px' }}>
                {toast.type === 'success' && '✓'}
                {toast.type === 'error' && '✕'}
                {toast.type === 'info' && 'ℹ'}
              </strong>
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                marginLeft: '10px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '0 8px',
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
