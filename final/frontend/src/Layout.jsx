import React from 'react'
import { Background, Header } from './components'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <Background />
        <Header />
        <Outlet />
    </>
  )
}

export default Layout