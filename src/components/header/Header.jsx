import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
// import {useNavigation } from 'react-router-dom'
function Header() {
    const authStatus = useSelector((state)=> state.auth.status)
    const navItems = [
        {name:'Home',
         slug: '/',
         active: true},
        {name:'Login',
         slug: '/Login',
         active: !authStatus},
        {name:'SignUp',
         slug: '/SignUp',
         active: !authStatus},
        {name:'All-Post',
         slug: '/AllPost',
         active: authStatus},
        {name:'Add-Post',
         slug: '/AddPost',
         active: authStatus},
    ]
  return (
    <>
        header
    </>
  )
}

export default Header