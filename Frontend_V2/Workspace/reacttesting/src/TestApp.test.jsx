import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import TestApp from './TestApp'

test('button click shows Test Case Passed', () => {
  render(<TestApp />)

  // before click
  expect(screen.getByText(/click the button/i)).toBeInTheDocument()

  // click button
  fireEvent.click(screen.getByText('Test Button'))

  // after click
  expect(screen.getByText('Test Case Passed')).toBeInTheDocument()
})