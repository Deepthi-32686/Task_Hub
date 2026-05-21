import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
  const [name, setName] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (name.trim() === "") {
      alert("Please enter your name")
      return
    }

    navigate(`/dashboard/${name}`)
  }

  return (
    <div>
      <h2>Registration Page</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Registration
