// import React,{ useState, useEffect } from 'react'
// import './App.css'
// import { useDispatch } from 'react-redux'
// import authService from './appwrite/auth'
// import { login, logout } from './store/authSlice'
// import {Header} from './components/index'

// function App() {
//   // this is for the pre login feature 
//   const [loading, setLoading] = useState(true)
// const dispatch = useDispatch();
// useEffect(() => {
//   // getting data from the backend
//   authService.getCurrentUser()
//   // if data is present than login
//   .then((userData)=>{
//     if(userData){
//       dispatch(login({userData}))
//     }else{ // else logout
//       dispatch(logout())
//     }
//   })// in eighter case turn the loading off
//   .finally(()=> setLoading(false));
// }, [])

//   return !loading ? (
//     <div>from app
//       <Header/>
//     </div>
    
//   ):(null)
// }

// export default App
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import {  Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  ) : null
}

export default App
