import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'
function Postcard({$id, title, featuredImage}) {
    return (
      // $id is used in the appwrite variable
 <Link to={`/post/${$id}`}>
  <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {/* setting the filePreview and featuredImage is used as it is the fileID string */}
                <img src={service.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
 </Link>
  )
}

export default Postcard