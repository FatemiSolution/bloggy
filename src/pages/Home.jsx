import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'

import {Postcard, Container} from '../components'

function Home() {
  // creating useState for local Home Page 
  const [posts, setposts] = useState([]);
  // using service from appwrite to get the post stored in the database 
  useEffect(() => {
    service.getPosts().then((posts) =>{
      if(posts){
        // setting the post into the local variable
        setposts(posts.documents)
      }
    })
  }, [])
  // if no post is stored in the database 
if(posts.length === 0){
  return(
    <div className="w-full py-8 mt-4 text-center">
    <Container>
        <div className="flex flex-wrap">
            <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    Login to read posts
                </h1>
            </div>
        </div>
    </Container>
  </div>
  )
}
// else show the list of posts
return (
  <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
)
}

export default Home