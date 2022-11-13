import React, { useEffect } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Footer from './Components/Footer'
import Errors from './Pages/Errors'
import { useDispatch } from 'react-redux'
import { current } from './JS/Actions/user'
import NavBar from './Components/NavBar'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(current())
    }
  }, [dispatch]);

  return (
    <div className='App'>
      <NavBar />
      <h1>Authentification</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/*' element={<Errors />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
