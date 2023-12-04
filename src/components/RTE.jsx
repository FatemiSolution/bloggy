import React from 'react'
import { Controller } from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'
function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div>
        <div>
            {label && <label className='inline mb-1 pl-1'>{label}</label>}
            <Controller
            name= {name || "Content"}
            control={control}
            // setting tracking on the field 
            render={({field: {onChange}})=>(
                <Editor
                initialValue={defaultValue}
                init={{
                    initialValue: defaultValue,
                    height: 500,
                    menubar: true,
                    //setting plugins
                    plugins:[
                        "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
                    ],
                    //setting toolbars
                    toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    //setting content styles
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }}
                //setting onchange on the editor
                onEditorChange={onChange}
                />
            )}
            />
        </div>
    </div>
  )
}

export default RTE