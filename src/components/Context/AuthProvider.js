import React, {useState, useEffect} from 'react'
import AuthContext from './AuthContext'

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(false)

  const updateToken = () => setToken(localStorage.getItem('userToken'))

  const signOut = () => {
    localStorage.removeItem('userToken')
    setToken('')
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    setToken(token)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        updateToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
