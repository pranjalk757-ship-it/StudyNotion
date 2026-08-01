import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { LuCloudUpload } from "react-icons/lu";



const ThumbnailUploader = ({name,label,register,setValue,errors,video=null,editData=null,viewData=null}) => {
    const [selectedImage,setSelectedImage] = useState(null);
    const [previewImage,setPreviewImage] = useState(
        viewData ? viewData : editData ? editData : ''
    );
    const fileinput = useRef();



    const previewFile = (file)=>{
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setPreviewImage(reader.result)
        }
    }


    const onDrop = (acceptedFiles)=>{
        const file = acceptedFiles[0];
        if(file){
            setSelectedImage(file);
            previewFile(file);
        }
    }

    const {getRootProps,getInputProps,isDragActive} = useDropzone({
        accept: !video ?
        {'image/*':['.jpeg','.jpg','.png']}
        :
        {'video/*':['.mp4']},
        onDrop,
    });

    useEffect(()=>{
        register(name,{required:true})
    },[register])

    useEffect(()=>{
        setValue(name,selectedImage)
    },[selectedImage])
  return (
    <div className='flex flex-col px-4 gap-2'>
        <label htmlFor={name} className='text-richblack-100 text-xs'>{label}</label>

        <div className='bg-richblack-700 flex flex-row justify-center rounded-md h-[18rem] items-center border-2 border-dashed border-richblack-500 overflow-hidden'>
            {
                previewImage ?
                (
                    <div>
                        {
                            !video ?
                            <div className='w-[90%] h-full mx-auto'>
                                <img
                                    src={previewImage}
                                    className="w-[90%] h-full object-cover rounded-md mx-auto"
                                ></img>
                            </div>
                            :
                            <div>
                                <video
                                    src={previewImage}
                                    aspectRatio='16:9'
                                    playsInline
                                ></video>
                            </div>
                        }
                        
                    </div>
                    

                )
                :
                (
                    <div
                        {...getRootProps()}
                        className='w-[80%] flex  flex-col items-center'
                    >

                        <input
                            {...getInputProps()}
                        ></input>
                        <div className='bg-yellow-900  mx-auto w-fit p-1 rounded-full '>
                            
                            <LuCloudUpload size={24} className='text-yellow-200 font-bold'></LuCloudUpload>
                        </div>
                        <div className='text-xs text-richblack-300 flex flex-col items-center mt-2'>
                            <p >Drag and Drop an {!video ? 'image':'video'} ,or <span className='text-yellow-100 font-bold'>Browse</span></p>
                            <p>Max 6MB each (12MB for videos)</p>
                            <ul className='flex flex-row gap-10 list-disc mt-5'>
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>
                        </div>
                    </div>

                )
            }
        </div>
        {
            errors[name] &&
            <p className='text-pink-200 text-xs'>{label} is required</p>
        }
        <div>
            {
                !viewData &&
                <button
                    type='button'
                    onClick={(()=>{
                        setPreviewImage('')
                        setSelectedImage(null)
                        setValue(name,null)
                    })}
                    className='text-white text-sm'
                >
                    Cancel
                </button>
            }
        </div>
    </div>
  )
}

export default ThumbnailUploader