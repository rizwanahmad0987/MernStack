import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function LoginPage() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      nav('/')
    } catch (e) {
      setError('Invalid credentials')
    }
  }

  return (
    <form className="card max400" onSubmit={onSubmit}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <label>Email<input value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button type="submit">Login</button>
    </form>
  )
}


