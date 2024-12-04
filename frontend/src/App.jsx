import React from 'react'
import './App.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
    <Toaster/>
    <Routes>

    <Route path='/' element={<Home/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>

    </Routes>


    </BrowserRouter>
  )
}
