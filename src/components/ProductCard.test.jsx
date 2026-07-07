import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'

describe('ProductCard', () => {
  const placeholder = 'https://via.placeholder.com/200x200?text=No+Image'

  test('renders product title and formatted price', () => {
    // create a mock product for this test
    const product = { id: 'abc123', title: 'Test Product', price: 9.5, image: 'http://example.com/img.jpg' }

    // render the component wrapped in a router
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    )

    // assert title is rendered
    const title = screen.getByText('Test Product')
    expect(title).toBeInTheDocument()

    // assert price is formatted to two decimals
    const price = screen.getByText('$9.50')
    expect(price).toBeInTheDocument()
  })

  test('View Details link points to the correct product route', () => {
    const product = { id: 'xyz789', title: 'Another', price: 5, image: 'http://example.com/a.jpg' }

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    )

    // find the link by its accessible name and verify href
    const link = screen.getByRole('link', { name: /view details/i })
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe(`/products/${product.id}`)
  })

  test('falls back to placeholder image on error', () => {
    const product = { id: 'img001', title: 'Img Test', price: 1, image: 'http://example.com/broken.jpg' }

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    )

    // get the image element
    const img = screen.getByRole('img', { name: /img test/i })
    expect(img).toBeInTheDocument()

    // trigger an error event to simulate broken image
    fireEvent.error(img)

    // after the error, the src should be the placeholder
    expect(img).toHaveAttribute('src', placeholder)
  })
})
