import React, { useEffect } from 'react'
import { useCallback } from 'react'
import {useForm} from 'react-hook-form'
import service from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import {Button, Input, RTE, Select} from './index'
import {useSelector } from 'react-redux'
// requiring post incase comming for updating the post 
function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        // setting default value incase if we are coming for updating the post 
        defaultValues:{
            title:post?.title ||'',
            slug:post?.slug || '',
            content:post?.content || "",
            status:post?.status || "active",
        },
    });
    const navigate = useNavigate()
    // getting the userData from the state 
    const userData = useSelector(state => state.auth.userData);
    const submit = async(data) =>{
        // if we want to update the post 
        if(post) {
            // uploading image into the backend
            const file = data.image[0] ? service.uploadFile(data.image[0]):null
            // deleting the prev image of the post 
            if(file) {
                service.deleteFile(post.featuredImage)
            }
            // adding the new img into the post
            const dbPost = await service.updatePost(post.$id,
                {...data,
                featuredImage: file ? file.$id : undefined,
            });
            // if post is sucessfully updated
            if (dbPost){
                navigate(`/posts/${dbPost.$id}`)
            }
    }
    else{
        // uploading image into backend
        const file = await service.uploadFile(data.image[0]);
        if(file){
            // getting img id 
            const fileID =file.$id
            // adding imgID into the data 
            data.featuredImage = fileID
          const dbPost = await service.createPost({
                ...data,
                // giving userID is the userID 
                userID: userData.$id,
            })
            if (dbPost){
                //navigating to the Post page
                navigate(`/posts/${dbPost.$id}`)
            }
        }
    }
}
const slugTransform = useCallback((value)=>{
    if(value && typeof  value === 'string'){
        return  value.toLowerCase().replace(/ /g, '-');
       
    }return ''
},[]);
// creating auto slug generator
useEffect(() => {
    // getting the value stored in the form and name object 
  const subscription = watch((value,{name})=>{
// if name is equals to that of the title 
    if(name === 'title'){
        // then transform and store it in the slug 
        setValue('slug',slugTransform(value.title))
    }
  })
  return () => {
    // to avoid any unnecessary loop pnce it is completed
    subscription.unsubscribe()
  }
//   it will re run incase of any changes of the below
}, [watch, slugTransform,setValue ])

  return (
    <div>
        {/* with the help of handleSubmit all the register values are sent to the submit function              */}
    <form onSubmit={handleSubmit(submit)}
        className='flex flex-wrap'>
               <div className="w-2/3 px-2">
            <Input
            label="title"
            className="mb-4"
            // setting title on the register 
            {...register("title",{required: true})}
            />
             <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        // setvalue will take the register value and update it 
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                  <RTE label="Content :" name="content" 
                //   setting the default value fron the values 
                  control={control} defaultValue={getValues("content")} />
                </div>  
                <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    // setting the values in the register 
                    {...register("image", { required: !post })}//incase of new post it is required
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PostForm