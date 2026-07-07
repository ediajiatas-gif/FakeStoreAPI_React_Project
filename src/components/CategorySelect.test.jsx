import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// mock the productService module used by the component
jest.mock('../lib/productService', () => ({
  getCategories: jest.fn(),
}))

import { getCategories } from '../lib/productService'
import CategorySelect from './CategorySelect'

// helper to render with a fresh QueryClient
const renderWithClient = (ui) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

afterEach(() => {
  // reset mock implementations between tests to keep them isolated
  jest.resetAllMocks()
})

test('renders category options after getCategories resolves', async () => {
  // arrange: mock getCategories to resolve with sample categories
  getCategories.mockResolvedValue(['electronics', 'jewelery'])

  // act: render component with a no-op change handler
  renderWithClient(
    <CategorySelect selectedCategory="" onCategoryChange={() => {}} />
  )

  // assert: wait for category option text to appear
  const opt1 = await screen.findByText('electronics')
  expect(opt1).toBeInTheDocument()

  const opt2 = await screen.findByText('jewelery')
  expect(opt2).toBeInTheDocument()
})

test('selecting an option calls onCategoryChange with the selected value', async () => {
  // arrange: controlled mock data and spy for callback
  getCategories.mockResolvedValue(['books', 'toys'])
  const onChange = jest.fn()

  renderWithClient(
    <CategorySelect selectedCategory="" onCategoryChange={onChange} />
  )

  // wait for options to load
  await screen.findByText('books')

  // get the select element and change its value
  const select = screen.getByRole('combobox')
  fireEvent.change(select, { target: { value: 'toys' } })

  // onCategoryChange should be called with the selected value
  expect(onChange).toHaveBeenCalledWith('toys')
})
