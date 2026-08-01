import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { update_my_profile } from '../../../../services/operations/settingsApi';
import Iconbtn from '../../common/Iconbtn';
import { useNavigate } from 'react-router-dom';

function EditProfileInfo() {
    const {register,handleSubmit,formState:{errors},watch} = useForm();
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const navigate = useNavigate();
    const genders = ['Male','Female','Others'];
    const dispatch = useDispatch();
    const selectedGender = watch("gender");
    function profileSubmitHandler(data){
        try{
            console.log("data ye raha",data)
            dispatch(update_my_profile({token,formData: data}))
        }
        catch(err){
            console.log("Error occurred ",err)
        }
    }
  return (
    <div className='bg-richblack-800 mt-10 px-4 pt-4 rounded-md'>
        <div>
            <h2 className='text-md text-white font-bold mb-4'>Profile information</h2>
        </div>

        <form onSubmit={handleSubmit(profileSubmitHandler)}>
            <div className='grid grid-cols-2  gap-x-6'>
                <div className='flex flex-col text-xs text-richblack-100'>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                    type='text'
                    name='firstName'
                    className='bg-richblack-700 shadow-sm shadow-richblack-500 mt-1 rounded-md pl-2 py-2  outline-none'
                    id='firstName'
                    placeholder='*************'
                    {...register('firstName',{required:"true"})}
                    defaultValue={`${user?.firstName ? user.firstName : null}`}
                    ></input>
                    {
                        errors.firstName && 
                        <p>{errors.firstName.message}</p>
                    }
                </div>
                <div className='flex flex-col text-xs text-richblack-100'>
                    <label htmlFor='lastName'>First Name</label>
                    <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    className='bg-richblack-700 shadow-sm shadow-richblack-500 mt-1 rounded-md pl-2 py-2  outline-none'
                    placeholder='*************'
                    {...register('lastName',{required:"true"})}
                    defaultValue={`${user?.lastName ? user.lastName : null}`}
                    ></input>
                    {
                        errors.lastName && 
                        <p>{errors.lastName.message}</p>
                    }
                </div>
                <div className='flex flex-col text-xs text-richblack-100 mt-8'>
                    <label htmlFor='dateOfBirth'>Date Of Birth</label>
                    <input
                    type='date'
                    id='dateOfBirth'
                    name='dateOfBirth'
                    className='bg-richblack-700 shadow-sm shadow-richblack-500 mt-1 rounded-md pl-2 py-2 outline-none'
                    placeholder='dd/mm/yyyy'
                    {...register('dateOfBirth',{required:"true"})}
                    defaultValue={user?.additionalDetails?.dateOfBirth?.split("T")[0] || "2000-10-10"}
                    ></input>
                    {
                        errors.dateOfBirth && 
                        <p>{errors.dateOfBirth.message}</p>
                    }
                </div>
                <div className='flex flex-col text-xs text-richblack-100 mt-8'>
                    <label>Gender</label>
                    
                        <div className={`flex flex-row justify-between gap-4  bg-richblack-700 py-[9px] shadow-sm shadow-richblack-500 px-4  rounded-md  mt-1 `}>{
                            genders.map((gender,index)=>(
                                <label key={index} className={`flex items-center gap-2 ${ selectedGender === gender ? "accent-yellow-25 text-white font-bold":"accent-richblack-400"}`}>
                                    <input
                                        type='radio'
                                        name='gender'
                                        value={gender}
                                        {...register('gender',{required:true})}
                                        defaultChecked={user?.gender === gender}
                                    ></input>
                                    {gender}
                                </label>
                            ))}
                        </div>
                    
                    {
                        errors.gender &&
                        <p>{errors.gender.message} </p>
                    }
                    
                </div>
                <div className='flex flex-col text-xs text-richblack-100 mt-8'>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input
                    type='tel'
                    name='phoneNumber'
                    id='phoneNumber'
                    className='bg-richblack-700 shadow-sm shadow-richblack-500 mt-1 rounded-md pl-2 py-2  outline-none'
                    placeholder='123456789'
                    {...register('phoneNumber',{required:"true"})}
                    defaultValue={`${user?.phoneNumber ? user.phoneNumber : ''}`}
                    ></input>
                    {
                        errors.phoneNumber && 
                        <p>{errors.phoneNumber.message}</p>
                    }
                </div>
                <div className='flex flex-col text-xs text-richblack-100 mt-8'>
                    <label htmlFor='about'>About</label>
                    <input
                    type='text'
                    name='about'
                    id='about'
                    className='bg-richblack-700 shadow-sm shadow-richblack-500 mt-1 rounded-md pl-2 py-2  outline-none'
                    placeholder='Enter Bio Details'
                    {...register('about',{required:"true"})}
                    defaultValue={`${user?.about ? user.about : ''}`}
                    ></input>
                    {
                        errors.about && 
                        <p>{errors.about.message}</p>
                    }
                </div>
            </div>
            <div className='flex flex-row gap-4 justify-end mt-10 pb-4'>
                <button 
                    className='bg-richblack-600 px-2 py-2 rounded-md text-white text-sm font-bold'
                    onClick={()=>{navigate('/dashboard/my-profile')}} >
                    Cancel
                </button>
                <Iconbtn type={'submit'} text={'Save'}></Iconbtn>
            </div>
        </form>
    </div>
  )
}

export default EditProfileInfo