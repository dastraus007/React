# State Inventory

## All Pieces of State in This Project

### 1. **Product List** - `data.products`
- **Type**: Server State
- **Lives in**: TanStack Query
- **Reason**: Fetched from API (`https://dummyjson.com/products`), cached, can be refreshed

### 2. **Individual Product Details** - `product data by id`
- **Type**: Server State
- **Lives in**: TanStack Query
- **Reason**: Fetched from API per product ID, cached with query keys

### 3. **Cart Contents** - `items[], addItem, removeItem, updateQuantity`
- **Type**: Global Client State
- **Lives in**: Zustand store
- **Reason**: Needs to be accessed and modified from multiple components (ProductList, ProductDetail, Cart page, App navigation)

### 4. **Cart Sidebar Open/Closed** - `isCartOpen`
- **Type**: Client/UI State (Global)
- **Lives in**: React Context + localStorage
- **Reason**: UI toggle that affects layout, needs to be accessed from header and sidebar component, should persist across page reloads

### 5. **Current Route/Navigation**
- **Type**: Router State
- **Lives in**: React Router
- **Reason**: Managed by routing library

### 6. **Loading States for Queries**
- **Type**: Server State Meta
- **Lives in**: TanStack Query (isLoading, isFetching)
- **Reason**: Automatically managed by Query library

### 7. **Error States for Queries**
- **Type**: Server State Meta
- **Lives in**: TanStack Query (error object)
- **Reason**: Automatically managed by Query library

### 8. **Toast Notifications** - `notifications[]`
- **Type**: Global Client State
- **Lives in**: Zustand store
- **Reason**: Need to trigger from anywhere in the app (success/error events), displayed globally

## Conclusion

**Server State (TanStack Query only):**
- Product listings and individual product data clearly belong in TanStack Query because they come from the backend API, need caching, automatic refetching, and synchronization. Query also handles loading and error states automatically.

**Global Client State (Context / Zustand):**
- Cart sidebar visibility makes sense as Context because it's pure UI state that needs to be shared between header button and sidebar component, and should persist via localStorage.
- Cart contents and toast notifications make sense in Zustand because they need global access across many components with more complex state updates (adding items, removing, calculating totals, managing notification queue).

**Local UI State (useState):**
- Any temporary form inputs, hover states, or single-component toggles should stay as local useState within individual components to avoid unnecessary global complexity. Currently, we haven't needed these yet, but examples would be a search input's draft value before submission or a dropdown menu's open state.
