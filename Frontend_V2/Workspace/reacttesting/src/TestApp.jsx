import { useState } from 'react'

export default function TestApp() {
  const [message, setMessage] = useState('Click the button to test')

  return (
    <div>
      <button onClick={() => setMessage('Test Case Passed')}>
        Test Button
      </button>
      <p>{message}</p>
    </div>
  )
}