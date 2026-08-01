import React, { useEffect, useState } from 'react'
import logo from '../../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../../data/navbar-links'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { IoIosCart } from "react-icons/io";
import ProfileDropDown from '../auth/ProfileDropDown'
import { MdKeyboardArrowDown } from "react-icons/md";
import { apiconnector } from '../../../services/apiconnector'
import { categories } from '../../../services/apis'
import { TfiSearch } from "react-icons/tfi";
import { get_all_categories } from '../../../services/operations/courseDetailsApi'
function Navbar() {
    const [page,setPage] = useState('Home');
    function pageHandler(elememt){
        setPage(elememt);
    }

    const {token} = useSelector((state)=>state.auth);
    const {totalItems} = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.profile);
    const dispatch = useDispatch();

    const [sublinks,setSubLinks] = useState([]);

    async function fetchSublinks(){
        try{
            const result = await dispatch(get_all_categories());
            if(result){
                setSubLinks(result);
            }
        }
        catch(err){
            console.log("Could not fetch categoies api list",err)
        }
    }

    useEffect(()=>{
        fetchSublinks();
    },[])
  return (
    <div className='w-full flex justify-center bg-richblack-800 border-b-2 border-b-richblack-600 fixed z-[100]'>
        <div className='w-11/12 flex flex-row items-center justify-between h-12 '>
            <div>
                <Link to='/'>
                    <img src={logo} alt="" width={160}  />                
                </Link>
            </div>
            <div className='flex flex-row gap-10 '>
                {
                    NavbarLinks.map((elememt,index)=>{
                        return (
                            <div className=' text-md text-richblack-25 flex flex-row'>
                                {
                                    elememt.title === 'Catalog' ? 
                                    (
                                        <div className='relative group cursor-pointer'>
                                            <div className='flex flex-row justify-center items-center gap-1'>
                                                {elememt.title}
                                                <MdKeyboardArrowDown></MdKeyboardArrowDown>
                                            </div>
                                            <div className='absolute z-50 w-[15rem] h-fit bg-richblack-100 rounded-md  -right-10 top-8 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 flex flex-col  items-start py-4'>
                                                <div className='w-4 h-4 right-10 -top-2 bg-richblack-100 absolute rotate-45 '></div>
                                                {
                                                    sublinks.map((item,index)=>{
                                                        return (
                                                            <div className='ml-4 mt-1 text-richblack-700 text-lg font-semibold hover:text-richblack-600' key={index}>
                                                                <Link to={`/category/${item.categoryName.replace(" ","-").toLowerCase()}`}>{item.categoryName}</Link>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                    :

                                    (
                                        <div onClick={()=>pageHandler(elememt.title)} className={`${elememt.title === page ? 
                                        "text-yellow-100":"text-richblue-25 hover:text-richblack-5"}`}>
                                            <Link to={`${elememt.path}`}>{elememt.title}  </Link>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex flex-row gap-4 items-center'>
                {
                    user?.accountType !== "Instructor"  &&
                    <div className='relative text-white '>
                        <Link to={`${token ? '/dashboard/wishlist':'/login'}`}>
                            <IoIosCart size={15}></IoIosCart>
                            {
                                totalItems > 0 && 
                                <div className='absolute text-xs -top-2 -right-2  font-bold text-caribbeangreen-100 rounded-full 
                                duration-200 animate-bounce'>{totalItems} </div>
                            }
                        </Link>
                    </div>
                }
                {
                    token === null &&
                    <div >
                        <Link to='/login'>
                            <button className='px-2 py-1 bg-richblack-800 text-richblack-100 border  border-richblack-600 rounded-md hover:text-richblack-25 text-md hover:border-richblack-50 hover:border'>
                                Log in
                            </button>
                        </Link>
                    </div>
                }
                {
                    token === null &&
                    <div>
                        <Link to='/signup'>
                            <button className='px-2 py-1 bg-richblack-800 text-richblack-100 border  border-richblack-600 rounded-md text-md  hover:text-richblack-25 hover:border-richblack-50 hover:border' >
                                Sign in
                            </button>
                        </Link>
                    </div>
                }
                {
                    token !== null &&
                    <div className=' z-50  flex items-center'>
                        <ProfileDropDown></ProfileDropDown>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar