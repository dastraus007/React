# Advanced 1 - Screenshots and Documentation

## How to Test the Application

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Open http://localhost:5173/ in your browser

## Screenshots Required

Please capture the following screenshots to complete the homework submission:

### Step 1 - i18n Setup
- **Screenshot 1:** Products list page in English
- **Screenshot 2:** Products list page in Hebrew

### Step 3 - Language Switcher + Persistence
- **Screenshot 3:** Language switcher in action (before switching)
- **Screenshot 4:** After switching to Hebrew and refreshing the page (to show persistence)

### Step 4 - RTL Mode
- **Screenshot 5:** Full page view in Hebrew showing RTL layout
  - Notice the navigation alignment (right-to-left)
  - Button spacing adjustments

### Step 5 - PrimeReact DataTable
- **Screenshot 6:** Products list with PrimeReact DataTable showing:
  - Multiple rows
  - Image column
  - Sortable columns (click on Title or Price headers)
  - Pagination controls at the bottom

### Step 6 - PrimeReact Theme Switcher
- **Screenshot 7:** Products page with Light theme (lara-light-blue)
- **Screenshot 8:** Same page with Dark theme (lara-dark-blue)

### Bonus - Locale-aware Price Formatting
- **Screenshot 9:** Products showing prices in USD format (English locale)
- **Screenshot 10:** Products showing prices in ILS format (Hebrew locale)

## Testing Checklist

- [ ] Language switcher works (EN ↔ HE)
- [ ] Language persists after page refresh
- [ ] RTL mode activates for Hebrew
- [ ] DataTable displays all products
- [ ] Sorting works on Title and Price columns
- [ ] Pagination works (10 items per page)
- [ ] Theme switcher works (Light ↔ Dark)
- [ ] Theme persists after page refresh
- [ ] Price formatting changes based on locale
- [ ] All UI text is translated (no hardcoded English strings)
- [ ] Loading states are translated
- [ ] Error states are translated
- [ ] Empty states are translated
- [ ] "View Details" button navigates to product detail page
- [ ] "Add to Cart" button shows success toast message
- [ ] Trans component renders with bold formatting in welcome message

## Implementation Notes

### i18n Features Demonstrated

1. **Interpolation** (`products:showingCount`):
   - Located in ProductList.tsx
   - Shows: "Showing 30 products" (count is interpolated)

2. **Pluralization** (`products:productCount`):
   - Located in ProductList.tsx
   - Shows: "1 product" vs "30 products" (plural form changes)

3. **Trans Component** (`common:welcomeMessage`):
   - Located in App.tsx navigation bar
   - Shows: **Welcome** to our store! (with bold formatting)

### DataTable Features

1. **Sorting**: Click on "Title" or "Price" column headers to sort
2. **Pagination**: 10 rows per page with controls at bottom

### Theme Persistence

- localStorage key: `primereact-theme`
- Default theme: `lara-light-blue`
- Available themes:
  - `lara-light-blue` (Light)
  - `lara-dark-blue` (Dark)

### Language Persistence

- localStorage key: `i18n-language`
- Default language: `en` (English)
- Available languages: `en`, `he`

### RTL Fixes Applied

1. **Navigation alignment**: Flexbox direction adjusted for RTL
2. **Button spacing**: Margins switched appropriately in RTL mode

## API Information

- API: DummyJSON
- Base URL: https://dummyjson.com
- Endpoints used:
  - `/products` - List all products
  - `/products/:id` - Get product details
