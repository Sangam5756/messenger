import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "./App.css"
const App = () => {
  return (

    <>
        <ToastContainer position="top-center" />

      <main>

        <Outlet />

      </main>
    </>
  )
}

export default App