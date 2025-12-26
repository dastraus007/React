# Store App - Advanced 1 Homework

## Starting Point

Starting Advanced 1 from commit `2197c7acc3def396adeb72e89940c9efeccf294e`.

**API used:** DummyJSON (https://dummyjson.com)

## Implementation Details

### Step 1 - i18n Setup

**Locales:** English (en), Hebrew (he)

**Namespaces:**
- `common` - Header, buttons, generic UI labels
- `products` - Catalog/list/detail strings

### Step 2 - i18n Features

**Example translation keys demonstrating required features:**

1. **Interpolation:** `products:showingCount` - "Showing {{count}} products" (used in ProductList header)
2. **Pluralization:** `products:productCount` - "{{count}} product" / "{{count}} products" (used in search results)
3. **Trans component:** `common:welcomeMessage` - Includes formatting with bold text in header

### Step 3 - Language Switcher + Persistence

**Persistence implementation:**
- Selected language is stored in `localStorage` under the key `i18n-language`
- On app initialization, i18n reads from `localStorage` and applies the stored language
- If no language is stored, defaults to English (en)
- Language switcher in header updates both i18n and `localStorage` simultaneously

### Step 4 - RTL Mode

**RTL implementation for Hebrew:**
- When Hebrew is active, `document.documentElement.dir` is set to "rtl" and `document.documentElement.lang` to "he"
- Fixed issues:
  1. **Navigation alignment** - Flexbox direction adjusted for RTL layout
  2. **Button spacing** - Margins switched from margin-left to margin-right in RTL mode

### Step 5 - PrimeReact DataTable

**DataTable columns:**
- Title
- Price
- Category
- Image (using cell template)
- Action column with "View Details" button

**Implemented features:**
1. **Sorting** - Price and Title columns are sortable
2. **Pagination** - 10 rows per page with pagination controls

### Step 6 - PrimeReact Theme Switcher

**Theme persistence:**
- localStorage key: `primereact-theme`
- Default theme: `lara-light-blue`
- Available themes: `lara-light-blue`, `lara-dark-blue`

### Bonus Features

**Bonus A - Locale-aware price formatting:**
- Implemented `Intl.NumberFormat` for price display based on current locale
- English shows: $99.99
- Hebrew shows: ‏99.99 ₪

**Bonus B - Complete translation coverage:**
- All query states (loading, error, empty) are fully translated
- No hardcoded English strings remain in the UI
