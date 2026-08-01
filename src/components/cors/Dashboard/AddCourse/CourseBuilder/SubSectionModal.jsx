import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ThumbnailUploader from '../CourseInformation/ThumbnailUploader';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { create_subsection,update_subsection } from '../../../../../services/operations/courseDetailsApi';
import { setCourse } from '../../../../../slices/courseSlice';
import Iconbtn from '../../../common/Iconbtn';
function SubSectionModal({modalData,setModalData,add=false,view=false,edit=false}) {

    const {register,formState:{errors},setValue,getValues,handleSubmit} = useForm();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth) 
    const [loading,setLoading] = useState(false);

    function formUpdated(){
        const currentValue = getValues();

        if(currentValue.lectureTitle !== modalData.title ||
            currentValue.lectureDesc !== modalData.description ||
            currentValue.lectureVideo !== modalData.videoUrl
        ){
            return true;
        }
        else{
            return false;
        }
    }

    async function handleEditSubsection(){
        const currentValue = getValues();
        const formData = new FormData();

        formData.append('sectionId',modalData.sectionId);
        formData.append('subSectionId',modalData._id);

        if(currentValue.lectureTitle !== modalData.title){
            formData.append('title',currentValue.lectureTitle)
        }
        if(currentValue.lectureDesc !== modalData.description){
            formData.append('description',currentValue.lectureDesc)
        }
        if(currentValue.lectureVideo !== modalData.videoUrl){
            formData.append('videoFile',currentValue.lectureVideo)
        }
        setLoading(true);
        const result = await dispatch(update_subsection({data:formData,token}));

        if(result){
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    }
    async function submitHandler(data){
        if(view){
            return;
        }
        if(edit){
            if(!formUpdated){
                toast.error("No field is updated")
            }
            else{
                handleEditSubsection();
            }
        }
        else{
            const formData = new FormData();
            formData.append('sectionId',modalData)
            formData.append('title',data.lectureTitle);
            formData.append('description',data.lectureDesc);
            formData.append('videoFile',data.lectureVideo)

            setLoading(true);
            const result = await dispatch(create_subsection({data:formData,token}));

            if(result){
                dispatch(setCourse(result));
            }
            setLoading(false);
            setModalData(null);
        }
    }

    useEffect(()=>{
     if(view || edit){
        setValue('lectureTitle',modalData.title);
        setValue('lectureDesc',modalData.description);
        setValue('lectureVideo',modalData.videoUrl);
     }   
    },[])
  return (
    <div>
        <h2>
            {add && "Add"} {view && "View"} {edit && "Edit"} Lectures
        </h2>
        <form onSubmit={handleSubmit(submitHandler)}>
            <ThumbnailUploader
                name={"lectureVideo"}
                label={"Lecture Video"}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                video={true}
                viewData={view ? modalData.videoUrl : null}
                editData={edit ? modalData.videoUrl : null}
            ></ThumbnailUploader>
            <div>
                <label htmlFor='lectureTitle'>Lecture Title</label>
                <input
                    name='lectureTitle'
                    id='lectureTitle'
                    {...register('lectureTitle',{required:true})}
                ></input>
                {
                    errors.lectureTitle &&
                    <p>Lecture Title is required</p>
                }
            </div>

            <div>
                <label htmlFor='lectureDesc'>Lecture Description</label>
                <textarea
                    name='lectureDesc'
                    id='lectureDesc'
                    {...register('lectureDesc',{required:true})}
                ></textarea>
                {
                    errors.lectureDesc &&
                    <p>Lecture Description</p>
                }
            </div>
            {
                !view &&
                <Iconbtn
                    type={"submit"}
                    text={`${edit ? 'Save Changes':"Save"}`}
                ></Iconbtn>
            }
        </form>
    </div>
  )
}

export default SubSectionModal