import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children : [
      {
        path: "/",
        element: <Home/>
      },
      {
        path:"/Login",
        element: <Login/>
      },
      {
        path:"/SignUp",
        element: <Signup/>
      },
      {
        path:"/AllPost",
        element: <AllPosts/>
      },
      {
        path:"/AddPost",
        element: <AddPost/>
      },
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>

    <RouterProvider router={ router}/>
  </Provider>
  </React.StrictMode>,
)
