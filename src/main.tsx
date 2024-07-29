import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.scss'
import CategoryContextProvider from './contexts/categoryContext.tsx'
import ProductContextProvider from './contexts/productContext.tsx'
import AuthContextProvider from './contexts/authContext.tsx'
import CartProvider from './contexts/cartContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ProductContextProvider>
          <CategoryContextProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoryContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
