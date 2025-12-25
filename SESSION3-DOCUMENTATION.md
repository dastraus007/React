# Session 3 - Global State Management

## Project Overview
This project demonstrates global state management in React using Zustand, a lightweight state management library.

## Implementation Details

### 1. State Management Library
- **Library Used**: Zustand
- **Installation**: `npm install zustand`
- **Reason**: Zustand provides a simple, hook-based API for managing global state without complex boilerplate

### 2. Cart Store (`src/store/cartStore.ts`)
Created a centralized store for managing shopping cart state with the following features:

#### State Structure
```typescript
interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
}
```

#### Store Methods
- `addItem()` - Adds a product to cart or increments quantity if already present
- `removeItem()` - Removes a product from the cart
- `updateQuantity()` - Updates the quantity of a cart item
- `clearCart()` - Empties the entire cart
- `getTotalPrice()` - Calculates and returns the total price of all items
- `getTotalItems()` - Calculates and returns the total number of items in cart

### 3. Component Integration

#### ProductList Component
- **Added**: "Add to Cart" button for each product
- **Functionality**: Clicking the button adds the product to the global cart state
- **Global State Access**: Uses `useCartStore` hook to access `addItem` action

#### ProductDetail Component
- **Added**: "Add to Cart" button on product detail page
- **Functionality**: Adds the currently viewed product to cart
- **Global State Access**: Uses `useCartStore` hook to access `addItem` action

#### Cart Component (New)
- **Purpose**: Dedicated page for viewing and managing cart contents
- **Features**:
  - Display all items in cart
  - Increase/decrease quantity with +/- buttons
  - Remove individual items
  - Clear entire cart
  - Show subtotal for each item
  - Display grand total
  - Empty cart message when no items

#### App Component Updates
- **Added**: Cart navigation link with item count badge
- **Route**: `/cart` route for the Cart component
- **Global State Display**: Shows total item count in navigation (updates automatically)

### 4. Global State Benefits Demonstrated

1. **State Persistence**: Cart data persists when navigating between pages
2. **Real-time Updates**: Navigation badge updates immediately when items are added
3. **Centralized Logic**: All cart operations are defined in one place
4. **No Prop Drilling**: Components access cart state directly without passing props through multiple levels
5. **Performance**: Only components using specific state slices re-render when state changes

### 5. User Flow

1. User views product list at `/`
2. User can add products to cart from the list
3. User can click on a product to view details at `/products/:id`
4. User can add product to cart from detail page
5. User can view cart at `/cart` to see all added items
6. User can modify quantities or remove items
7. Navigation shows live count of items in cart

### 6. Technical Implementation Notes

#### Zustand Store Pattern
- Uses `create` function to define the store
- Provides type-safe hooks for accessing state and actions
- State updates are immutable (creating new arrays/objects)
- Computed values (totals) are calculated using getter functions

#### Component-Store Connection
- Components subscribe to store using the `useCartStore` hook
- Can select specific state slices to minimize re-renders
- Actions are called directly without dispatch pattern

### 7. Project Structure
```
src/
├── store/
│   └── cartStore.ts        # Global cart state management
├── App.tsx                 # Main app with routing and navigation
├── ProductList.tsx         # Product listing with add to cart
├── ProductDetail.tsx       # Product details with add to cart
└── Cart.tsx                # Shopping cart page
```

### 8. Key Features Implemented

✅ Global state management with Zustand  
✅ Shopping cart functionality  
✅ Add products from multiple components  
✅ Cart page with full CRUD operations  
✅ Real-time cart count in navigation  
✅ Persistent state across route navigation  
✅ Type-safe TypeScript implementation  

### 9. Running the Application

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` (or the assigned port) to view the application.

### 10. Testing the Global State

1. **Test State Sharing**: Add item from product list, navigate to cart - item should be present
2. **Test State Updates**: Modify quantity in cart, navigate away and back - changes should persist
3. **Test Navigation Badge**: Add items and watch the cart count update in real-time
4. **Test State Isolation**: Open multiple browser tabs - each maintains its own state

## Conclusion

This implementation demonstrates effective global state management using Zustand, showing how to:
- Create a centralized store
- Share state across multiple components
- Update state from different parts of the application
- Compute derived values from state
- Maintain state persistence during navigation

The shopping cart pattern is a common real-world use case that benefits significantly from global state management.
