import React ,{useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    // this is for receiving and sending details to the form
    const {register, handleSubmit} = useForm();
    const [error, seterror] = useState('');
// creating a login function 
    const login = async(data) =>{
        // setting error null in the start 
        seterror('');
        try {
            // sending the login details to the server
          const session = await authService.login(data);
        //   if the details are correct and we have been loggedin we would get the session
          if(session){
            // once we got the session we will now get the details about the currentuser 
            const userData = await authService.getCurrentUser();
            // now since in the backend we are loggedin we will now use Dispatch to get loggedin in the front end using the redux
            if(userData) dispatch(authLogin(userData));
            // in the end we will navigate to the login page 
            Navigate('/');
          }
        } catch (error) {
            seterror("The Authentication is invalid please try again");
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]"></span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
        Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {/* if there is an error  */}
       {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
       {/* with the help of the handleSubmit all the data stored in register will be send to the login function  */}
       <form onSubmit={handleSubmit(login)}
       className='mt-8'>
        <div className='space-y-5'>
          <Input
          label='Email: '
          placeholder='Enter your email address'
          type='email'
          // setting data into the register form
          {...register('email',{
            required:true,
            validate:{
              matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
            }
          })}
          />
          {/* password Input */}
          <Input 
          label='password: '
          type='password'
          placeholder='Enter your password'
          {...register('password',{
            required: true,
          
          })}
          />
          {/* submitting the form button */}
          <Button 
          type='submit'
          className='w-full'
          >Sign In</Button>
        </div>
       </form>
        </div>
    </div>
  )
}

export default Login