import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (t && u) {
      setToken(t)
      setUser(JSON.parse(u))
    }
  }, [])

  function saveAuth(nextToken, nextUser) {
    setToken(nextToken)
    setUser(nextUser)
    localStorage.setItem('token', nextToken)
    localStorage.setItem('user', JSON.stringify(nextUser))
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  async function login(email, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        let errMsg = 'Login failed';
        try {
          const json = await res.json();
          errMsg = json.message || json.error || errMsg;
        } catch (e) {
          errMsg = `Server Error: ${res.status} ${res.statusText}`;
        }
        throw new Error(errMsg);
      }
      const data = await res.json()
      saveAuth(data.token, data.user)
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  }

  async function register(name, email, password) {
    const res = await fetch('/api/auth/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    if (!res.ok) throw new Error('Registration failed')
    const data = await res.json()
    saveAuth(data.token, data.user)
  }

  const value = { user, token, login, register, logout, saveAuth }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


