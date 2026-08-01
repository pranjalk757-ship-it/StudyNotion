import React, { useEffect, useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../common/Spinner';
import SidebarLink from './SidebarLink';
import { VscSettingsGear } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authApi';
import ConfirmationModal from '../common/ConfirmationModal';
import { get_all_categories } from '../../../services/operations/courseDetailsApi';

function Sidebar() {
    const {loading: profileLoading,user} = useSelector((state)=>state.profile);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const [categoryDetail,setCategoryDetail] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    async function getCategoryDetail(){
        try{
            const result = await dispatch(get_all_categories())
            if(result?.length > 0){
                setCategoryDetail(result?.[0].categoryName)
            }
        }
        catch(err){
            console.log("Error occurred in fetching courses ",err)
        }
    }
    function logoutHandler(){
        setConfirmationModal({
            text1:'Are you sure?',
            text2:'You will be logged out of your account.',
            btn1Text:"Log Out",
            btn2Text:"Cancel",
            btn1Handler: (()=>dispatch(logout({navigate}))),
            btn2Handler:(()=>setConfirmationModal(null))
        })
    }
    useEffect(()=>{
        getCategoryDetail();
    },[]);


    if(profileLoading){
        return <div>
            <Spinner></Spinner>
        </div>
    }
  return (
    <div>
        {
            sidebarLinks.map((link)=>{
                if(link.type && user?.accountType !== link.type){
                    return null;
                }
                const dynamicPath = link.name === "Courses" ? `${link.path}/${categoryDetail?.toLowerCase().replaceAll(' ','-')}` : link.path
                return (
                    <SidebarLink link={link} path={dynamicPath} key={link.id} iconName={link.icon}></SidebarLink>
                )
            })
        }
        <div
         className='border-[1px] border-richblack-600 mb-5 mt-2'
        ></div>
        <div>
            <div>
                <SidebarLink 
                 link={{name:"Setting",path:'/dashboard/setting'}}
                 path={'/dashboard/setting'}
                 iconName={'VscSettingsGear'}
                ></SidebarLink>
            </div>
            <button
                onClick={logoutHandler}
                className='flex flex-row pl-4 gap-2 items-center h-10 text-richblack-5'
            >
                <VscSignOut className='text-lg'></VscSignOut>
                <div className='text-sm'>Log Out</div>
            </button>
        </div>
        {
            confirmationModal &&
            <ConfirmationModal confirmationModal={confirmationModal}></ConfirmationModal>
        }
    </div>
  )
}

export default Sidebar