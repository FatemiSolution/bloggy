import React from 'react'
import { useId } from 'react'
// forward ref is used to get the accessibity from the parent to the child component this will send the ref which will enable us to add onclick onchange and other types of handlers
const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = "",
    ...props
    // the parennt component will automatically give the ref 
}, ref) {
    // it generates unique ID 
    const id = useId()
  return (
    <div>
    {label && <label className='inline-block mb-1 pl-1' htmlFor= {id}>
        {label}
        </label>
        }
        <input
        type={type}
        className = {`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}//giving parent ref to the input element
        // to add any additional property
        {...props}
        id={id}
        />
    </div>
  )
})

export default Input