# Homework 3 - Reflection & Notes

## State Architecture Summary

### States Living in TanStack Query:
- **Product List Data** - Fetched from `https://dummyjson.com/products`, cached with `['products']` query key
- **Individual Product Details** - Fetched per ID, cached with `['product', id]` query key
- **Loading States** - `isLoading` and `isFetching` automatically managed by Query
- **Error States** - `error` object automatically managed by Query

### States Living in React Context:
- **Cart Sidebar Open/Closed** - Boolean state with `open()`, `close()`, `toggle()` functions
  - **Why Context?** Pure UI state that needs to be shared between navigation button and sidebar component
  - **Persisted** via custom `useLocalStorage` hook with key `'sidebar-open'`

### States Living in Zustand:
- **Cart Contents** - Array of cart items with `addItem`, `removeItem`, `updateQuantity`, `clearCart` actions
  - **Why Zustand?** Complex state updates (calculating totals, managing quantities), needs global access from multiple routes
- **Toast Notifications** - Queue of notifications with `addToast`, `removeToast`, `clearAll` actions
  - **Why Zustand?** Need to trigger from anywhere in app (success/error handlers), auto-timeout logic

### States Living in Local useState:
- None currently in this simple app
- **Future examples**: Form input draft values, dropdown open states, hover effects

## Example: Global State Was Clearly Correct

**Cart Contents (Zustand)**
- The shopping cart needs to be accessed from:
  - ProductList component (add items)
  - ProductDetail component (add items)
  - Cart page (view/edit items)
  - App navigation (display item count)
  - CartSidebar (quick view)
- Making this global prevents prop drilling through 5+ component layers
- Cart operations (add, update quantity, calculate totals) are complex and belong in a centralized store

## Example: Local State Was Intentionally NOT Global

**Individual Component Hover States** (if we had them)
- If we added hover effects on product cards, that state would stay local with `useState`
- No other component cares if a product card is being hovered
- Making it global would pollute the store and cause unnecessary re-renders

**Form Input Draft Values** (if we had search)
- A search input's current text value while typing should be local
- Only when submitted should it affect global state (like a filter in Context)

## What I Learned About State Architecture

1. **Server State Belongs in TanStack Query**
   - Query handles caching, revalidation, loading, and error states automatically
   - Don't duplicate server data in Zustand/Context - it creates sync issues
   - Query's `isLoading` and `error` are sufficient for most UI feedback

2. **UI State Can Live in Context**
   - Simple toggles (sidebar open/closed, theme) work well in Context
   - Context + localStorage = persistent UI preferences
   - Custom hooks like `useLocalStorage` keep Context clean

3. **Complex Client State Needs Zustand/Jotai**
   - Shopping carts, notifications, and complex UI workflows benefit from dedicated stores
   - Zustand's devtools and computed values (like `getTotalPrice`) are powerful
   - Easier to test and debug than deeply nested Context

4. **Toast Notifications Bridge Query Events**
   - Connecting `onSuccess`/`onError` handlers to toast store provides user feedback
   - Complements Query's built-in error UI (not a replacement)
   - Auto-timeout in toast store keeps UI clean

5. **Persistence Requires Planning**
   - localStorage needs try/catch for SSR safety and quota errors
   - Only persist user preferences (theme, sidebar state), not data (that's for Query cache)
   - Validate localStorage values before using them

6. **Keep It Simple**
   - Start with local state (`useState`)
   - Move to Context when 2-3 components need it
   - Move to Zustand when logic gets complex or many components need it
   - Never skip TanStack Query for server data

## Implementation Details

### Step 1 - State Inventory
Created [State-Inventory.md](State-Inventory.md) documenting all state pieces and their classifications.

### Step 2 - Context-Based Sidebar
- **Sidebar Type**: Cart Sidebar (right-side overlay)
- **Opens From**: "🛒 Cart Sidebar" button in navigation
- **Context API**: 
  - `isOpen: boolean`
  - `open()`, `close()`, `toggle()` functions
- **Provider Location**: Wraps entire app inside `<BrowserRouter>`
- **Consumers**: App navigation (toggle button), CartSidebar component

### Step 3 - localStorage Persistence
- **Custom Hook**: `useLocalStorage<T>(key, defaultValue)`
  - On mount: Reads from `localStorage.getItem(key)`, falls back to `defaultValue`
  - On change: Saves to `localStorage.setItem(key, JSON.stringify(value))`
  - SSR-safe: Checks `typeof window === 'undefined'`
- **Test Results**:
  - ✓ Opened sidebar → refreshed page → sidebar remained open
  - ✓ Closed sidebar → refreshed page → sidebar remained closed
  - ✓ Works across browser sessions

### Step 4 - Global Toast Store
- **Library**: Zustand
- **Why**: Already using it for cart, familiar API, built-in devtools support
- **Store Location**: `src/store/toastStore.ts`
- **Notification Shape**:
  ```typescript
  {
    id: string           // unique identifier
    type: 'success' | 'error' | 'info'
    message: string      // display text
    timestamp: number    // Date.now()
    timeout: number      // auto-dismiss after ms
  }
  ```
- **Store Actions**:
  - `addToast(type, message, timeout)` - Creates toast with auto-remove
  - `removeToast(id)` - Manual dismiss
  - `clearAll()` - Remove all toasts

### Step 5 - Connect Toasts to TanStack Query

**Success Toasts**:
- Trigger: Adding product to cart (ProductList and ProductDetail)
- Message: "{Product Title} added to cart!"
- Appears as green toast with checkmark, auto-dismisses after 5 seconds

**Error Toasts**:
- Trigger: Failed product fetch (network error, invalid ID, API down)
- Message: "Failed to load products: {error.message}"
- Appears as red toast with X icon
- Complements Query's error UI in component

### Step 6 - Optional Bonuses
Not implemented (focusing on required tasks).

## Project Structure
```
src/
├── context/
│   └── SidebarContext.tsx      # Cart sidebar UI state
├── store/
│   ├── cartStore.ts            # Shopping cart (Zustand)
│   └── toastStore.ts           # Notifications (Zustand)
├── hooks/
│   └── useLocalStorage.ts      # localStorage persistence
├── App.tsx                      # Root with providers
├── ProductList.tsx              # + toasts on success/error
├── ProductDetail.tsx            # + toasts on success/error
├── Cart.tsx                     # Full cart page
├── CartSidebar.tsx              # Overlay sidebar (Context)
└── ToastHost.tsx                # Notification renderer
```

## Key Takeaways

1. **State classification is crucial** - Misplacing state leads to bugs and complexity
2. **TanStack Query is non-negotiable for server state** - Don't reinvent caching/sync
3. **Context is perfect for simple UI toggles** - But doesn't scale for complex logic
4. **Zustand/Jotai shine for client workflows** - Cart, notifications, wizards
5. **localStorage bridges sessions** - But validate and handle errors
6. **Toast notifications improve UX** - Real-time feedback for async operations

This architecture scales to real production apps because each state lives in the right place with clear responsibilities.
