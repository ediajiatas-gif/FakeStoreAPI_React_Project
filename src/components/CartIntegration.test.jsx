// src/components/CartIntegration.test.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'
import cartReducer from '../features/cart/cartSlice'
import ProductDetailCard from './ProductDetailCard'
import ShoppingCart from './ShoppingCart'

// Mock Firebase and orderService since ShoppingCart imports them at module
// level, but they're not needed for the add-to-cart flow being tested here
jest.mock('../lib/firebase', () => ({
  auth: { currentUser: null },
}))

jest.mock('../lib/orderService', () => ({
  createOrder: jest.fn(),
}))

const mockProduct = {
  id: 'prod1',
  title: 'Integration Test Sneaker',
  price: 25,
  image: 'http://example.com/sneaker.jpg',
  category: 'shoes',
  description: 'A sneaker for testing',
}

const renderWithStore = () => {
  const store = configureStore({
    reducer: { cart: cartReducer },
  })

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductDetailCard product={mockProduct} isDeleting={false} onDelete={jest.fn()} />
        <ShoppingCart />
      </MemoryRouter>
    </Provider>
  )
}

describe('Cart integration', () => {
  test('cart is empty before adding a product', () => {
    renderWithStore()

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
  })

  test('clicking "Add to Cart" updates the ShoppingCart with the product', () => {
    renderWithStore()

    const addButton = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(addButton)

    expect(screen.queryByText('Your cart is empty.')).not.toBeInTheDocument()
    const cartHeading = screen.getByRole('heading', { level: 6, name: 'Integration Test Sneaker' })
    expect(cartHeading).toBeInTheDocument()
    const cartItem = cartHeading.closest('.list-group-item')
    expect(cartItem).toHaveTextContent('Count: 1')
    expect(cartItem).toHaveTextContent('$25.00')
  })

  test('clicking "Add to Cart" twice increments the count instead of duplicating', () => {
    renderWithStore()

    const addButton = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(addButton)
    fireEvent.click(addButton)

    expect(screen.getByText('Count: 2')).toBeInTheDocument()
    expect(screen.getByText('$50.00')).toBeInTheDocument()
  })
})