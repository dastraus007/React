import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Translation resources
const resources = {
  en: {
    common: {
      products: 'Products',
      cart: 'Cart',
      cartSidebar: 'Cart Sidebar',
      viewDetails: 'View Details',
      addToCart: 'Add to Cart',
      addedToCart: '{{title}} added to cart!',
      close: 'Close',
      loading: 'Loading...',
      error: 'Error',
      noResults: 'No results found',
      welcomeMessage: '<0>Welcome</0> to our store! Browse our amazing products.',
      languageSwitcher: 'Language',
      themeSwitcher: 'Theme',
      lightTheme: 'Light',
      darkTheme: 'Dark',
      actions: 'Actions',
    },
    products: {
      title: 'Products',
      showingCount: 'Showing {{count}} products',
      productCount_one: '{{count}} product',
      productCount_other: '{{count}} products',
      loadingProducts: 'Loading products...',
      failedToLoad: 'Failed to load products',
      productDetails: 'Product Details',
      loadingDetails: 'Loading product details...',
      productNotFound: 'Product not found',
      price: 'Price',
      category: 'Category',
      description: 'Description',
      stock: 'Stock',
      brand: 'Brand',
      rating: 'Rating',
      image: 'Image',
      backToProducts: 'Back to Products',
      search: 'Search',
      searchPlaceholder: 'Search products...',
    },
  },
  he: {
    common: {
      products: 'מוצרים',
      cart: 'עגלה',
      cartSidebar: 'סרגל עגלה',
      viewDetails: 'צפה בפרטים',
      addToCart: 'הוסף לעגלה',
      addedToCart: '{{title}} נוסף לעגלה!',
      close: 'סגור',
      loading: 'טוען...',
      error: 'שגיאה',
      noResults: 'לא נמצאו תוצאות',
      welcomeMessage: '<0>ברוכים הבאים</0> לחנות שלנו! עיינו במוצרים המדהימים שלנו.',
      languageSwitcher: 'שפה',
      themeSwitcher: 'ערכת נושא',
      lightTheme: 'בהיר',
      darkTheme: 'כהה',
      actions: 'פעולות',
    },
    products: {
      title: 'מוצרים',
      showingCount: 'מציג {{count}} מוצרים',
      productCount_one: 'מוצר {{count}}',
      productCount_other: '{{count}} מוצרים',
      loadingProducts: 'טוען מוצרים...',
      failedToLoad: 'טעינת המוצרים נכשלה',
      productDetails: 'פרטי מוצר',
      loadingDetails: 'טוען פרטי מוצר...',
      productNotFound: 'מוצר לא נמצא',
      price: 'מחיר',
      category: 'קטגוריה',
      description: 'תיאור',
      stock: 'מלאי',
      brand: 'מותג',
      rating: 'דירוג',
      image: 'תמונה',
      backToProducts: 'חזרה למוצרים',
      search: 'חיפוש',
      searchPlaceholder: 'חפש מוצרים...',
    },
  },
}

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18n-language') || 'en', // Read from localStorage or default to 'en'
    fallbackLng: 'en',
    ns: ['common', 'products'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  })

// Update document direction and language when language changes
i18n.on('languageChanged', (lng) => {
  const isRTL = lng === 'he' || lng === 'ar'
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  document.documentElement.lang = lng
  
  // Persist to localStorage
  localStorage.setItem('i18n-language', lng)
})

// Set initial direction and language
const initialLang = i18n.language
const isRTL = initialLang === 'he' || initialLang === 'ar'
document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
document.documentElement.lang = initialLang

export default i18n
