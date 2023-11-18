import { Container, Logo, LogoutBtn } from '../index'
import {Link,  useNavigate} from "react-router-dom"
import React from 'react'
import { useSelector } from 'react-redux'

function Header() {
    const authStatus = useSelector((state)=> state.auth.status)
    const Navigate = useNavigate()
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
    <header className='py-3 shadow bg-gray-500'>
        <Container>
        <nav className='flex'>
          <div className='mr-4'>
                <Link to='/'>
                  <Logo width='70px'/>
                </Link>
              </div>
              <ul className='flex ml-auto'>
                {navItems.map((Item)=>
                  Item.active ?(
                   <li key={Item.name}>
                    <button onClick={()=> Navigate(Item.slug)}>
                      {Item.name}
                    </button>
                    </li>
                  ):null
                )}
                {authStatus && (
                  <li>
                    <LogoutBtn/>
                  </li>
                )}
              </ul>
            </nav>
        </Container>
    </header>
  )
}

export default Header