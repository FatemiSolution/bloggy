import React,{useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login} from '../store/authSlice'
import {Button, Logo, Input} from "./index"
import { useDispatch } from 'react-redux'
import {useForm} from "react-hook-form"

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, seterror] = useState('')
    
  return (
    <div>
        
    </div>
  )
}

export default Signup