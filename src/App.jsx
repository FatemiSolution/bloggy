import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/header/Header'

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
    <div>from app
      <Header/>
    </div>
    
  ):(null)
}

export default App
