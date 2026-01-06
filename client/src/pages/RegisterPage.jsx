import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function RegisterPage() {
  const { register } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await register(name, email, password)
      nav('/')
    } catch (e) {
      setError('Registration failed')
    }
  }

  return (
    <form className="card max400" onSubmit={onSubmit}>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <label>Name<input value={name} onChange={e => setName(e.target.value)} /></label>
      <label>Email<input value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button type="submit">Create account</button>
    </form>
  )
}


