import React from 'react'
import Navbar from './components/Ui/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Ui/Footer'

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App