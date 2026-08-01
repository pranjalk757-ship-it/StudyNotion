import React, { useRef,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Iconbtn from '../../common/Iconbtn';
import { update_profile_picture } from '../../../../services/operations/settingsApi';
import { FaFileUpload } from "react-icons/fa";
function UpdateProfilePicture() {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(false);
    const [imageFile,setImageFile] = useState(null);
    const [previewImage,setPreviewImage] = useState(null);
    const dispatch = useDispatch();
    const fileInputref = useRef();

    function handleClick(){
        fileInputref.current.click();
    }

    function changeHandler(e){
        const file = e.target.files[0];

        if(file){
            setImageFile(file);
            previewImageFile(file);
        }
    }

    function previewImageFile(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setPreviewImage(reader.result)
        }
    }

    async function fileUploadHandler(){
        try{
            setLoading(true);
            console.log("file upload started")
            const formData = new FormData();

            formData.append("displayPicture",imageFile);
            console.log("Ye form data",formData)
            const response = await dispatch(update_profile_picture({token,formData})).then(()=>{
                setLoading(false);
            })
            console.log("Yaha hu ji",response)

        }
        catch(err){
            console.log("Error occured in File upload Handler");
            setLoading(false);
        }
    }
  return (
    <div className='bg-richblack-800 w-full flex flex-row gap-6 py-4 items-center border-[1px] border-richblack-600 rounded-md pl-4'>
        <img
            src={previewImage || user ?.image}
            alt='profile picture'
            className='aspect-square w-20 rounded-full'
        ></img>
        <div>
            <p className='mb-2 text-sm text-white font-bold'>Change Profile Picture</p>
            <input
                type='file'
                ref={fileInputref}
                onChange={changeHandler}
                accept='image/png , image/jpeg , image/gif'
                className='hidden'
            ></input>
            <button
                onClick={handleClick}
                disabled={loading}
                className='bg-richblack-500 px-2 py-2 text-sm rounded-md font-bold text-white mr-2'
            >
                Select
            </button>
            <Iconbtn 
                text={`${loading ? 'Uploading...':'Upload'}`}
                onClick={fileUploadHandler}
                
            >
                {
                    !loading && (
                        <div className='flex flex-row items-center gap-2 text-sm font-bold'>
                            <p>Upload</p>
                            <FaFileUpload size={15}></FaFileUpload>
                        </div>
                    )
                }
            </Iconbtn>
        </div>
    </div>
  )
}

export default UpdateProfilePicture