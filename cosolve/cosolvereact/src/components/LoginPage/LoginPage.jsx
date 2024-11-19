import React from 'react'
import './LoginPage.css'
import { NavLink, useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("nacigate")
        navigate('home');
    }

  return (
    <div>LoginPage
        <button onClick={handleLogin}>Home</button>
    </div>
    
  )
}

export default LoginPage