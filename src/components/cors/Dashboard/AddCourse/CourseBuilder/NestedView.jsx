import React, { useState } from 'react'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import ConfirmationModal from '../../../common/ConfirmationModal'
import { useDispatch, useSelector } from 'react-redux';
import { delete_section, delete_subsection } from '../../../../../services/operations/courseDetailsApi';
import { setCourse } from '../../../../../slices/courseSlice';
import SubSectionModal from './SubSectionModal';
import { apiconnector } from '../../../../../services/apiconnector';
import { setLoading } from '../../../../../slices/authSlice';
function NestedView({editChangeHandler}) {
    const {course} = useSelector((state)=>state.course);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth)

    const [addSubSection,setAddSubSection] = useState(null);
    const [viewSubSection,setViewSubSection] = useState(null);
    const [editSubSection,setEditSubSection] = useState(null);



    async function sectionDeleteHandler(sectionId){
        const result = await dispatch(delete_section({
            data:{
                sectionId:sectionId,
                courseId:course?._id
            },
            token
        }));

        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    async function subSectionDeleteHandler({subSectionId,sectionId}){
        const result = await apiconnector('POST',delete_subsection({subSectionId,sectionId},token));

        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }
  return (
    <div>
        <div>
            {
                course.courseContent.map((section)=>(
                    <details className='bg-richblack-500' key={section._id}>
                        <summary className='flex flex-row justify-between text-white'>
                            <div className='flex'>
                                <RxDropdownMenu></RxDropdownMenu>
                                {section.sectionName}
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <button
                                    onClick={()=>editChangeHandler(section.sectionName,section._id)}
                                >
                                    <MdModeEditOutline></MdModeEditOutline>
                                </button>
                                <button
                                    onClick={()=>setConfirmationModal({
                                        text1:'Delete this section',
                                        text2:'All the lecture in this section will be deleted',
                                        btn1Text:"Delete",
                                        btn2Text:"Cancel",
                                        btn1Handler:(()=>sectionDeleteHandler(section._id)),
                                        btn2Handler:(()=>setConfirmationModal(null))
                                    })}
                                >
                                    <MdDeleteOutline></MdDeleteOutline>
                                </button>
                                <IoIosArrowDown></IoIosArrowDown>
                            </div>
                        </summary>

                        <div>
                            {
                                section?.subSection?.map((data)=>(
                                    <div key={data?._id} className='flex flex-row text-white px-4 justify-between mt-4'>
                                        <div className='flex flex-row text-white'>
                                            <RxDropdownMenu></RxDropdownMenu>
                                            {data.title}
                                        </div>
                                        <div>
                                            <button
                                                onClick={()=>setEditSubSection({...data,sectionId:section._id})}
                                            >
                                                <MdModeEditOutline></MdModeEditOutline>
                                            </button>
                                            <button
                                                onClick={()=>setConfirmationModal({
                                                    text1:'Delete this sub section',
                                                    text2:'lecture in this sub section will be deleted',
                                                    btn1Text:"Delete",
                                                    btn2Text:"Cancel",
                                                    btn1Handler:(()=>subSectionDeleteHandler(data._id,section._id)),
                                                    btn2Handler:(()=>setConfirmationModal(null))
                                                })}
                                            >
                                                <MdDeleteOutline></MdDeleteOutline>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button
                                onClick={()=>setAddSubSection(section._id)}
                            >
                                Add Lecture
                            </button>
                        </div>
                    </details>
                ))
            }
        </div>
        {
            addSubSection &&
            <SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
            ></SubSectionModal>
        }
        {
            viewSubSection &&
            <SubSectionModal
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
            ></SubSectionModal>
        }
        {
            editSubSection &&
            <SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
            ></SubSectionModal>
        }
        {
            confirmationModal && 
            <ConfirmationModal confirmationModal={confirmationModal}></ConfirmationModal>
        }
    </div>
  )
}

export default NestedView