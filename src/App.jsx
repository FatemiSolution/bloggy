import React,{ useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import {Footer, Header} from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  // this is for the pre login feature 
  const [loading, setLoading] = useState(true)
const dispatch = useDispatch();
useEffect(() => {
  // getting data from the backend
  authService.getCurrentUser()
  // if data is present than login
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }else{ // else logout
      dispatch(logout())
    }
  })// in eighter case turn the loading off
  .finally(()=> setLoading(false));
}, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>

    <div className='w-full block'>
      <Header/>
      <main>
        TODO: <Outlet/>
      </main>
      <Footer/>
    </div>
    </div>
  ):(null)
}

export default App
