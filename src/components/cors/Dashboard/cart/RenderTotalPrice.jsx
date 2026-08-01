import React, { useState } from 'react'
import Iconbtn from '../../common/Iconbtn'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { buy_course } from '../../../../services/operations/paymentApi'
import { ACCOUNT_TYPE } from '../../../../utils/constants'
import { useNavigate } from 'react-router-dom'
function RenderTotalPrice() {
    const {totalPrice} = useSelector((state)=>state.cart)
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const {cart} = useSelector((state)=>state.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)

    const courseIds = cart.map(course=>course?._id)
    console.log("courseIds",courseIds)
    async function buyHandler(){
            setLoading(true);
            try{
                if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
                    toast.error("You are instructor, you can't buy course")
                }
                if(token){
                    await buy_course(token,courseIds,user,navigate,dispatch);
                    return;
                }
                else{
                    navigate('/login');
                    toast.success("Login First,to Buy course")
                }
            }
            catch(err){
                console.log("Error occurred in buy Course Handler")
            }
            setLoading(true);
        }
  return (
    <div>
        <div className='bg-richblack-800 border-2 border-richblack-700 rounded-md px-2 py-4'>
            <p className='text-sm font-bold text-richblack-100 mt-4'>Total:</p>
            <p className='text-3xl text-yellow-50 font-bold mb-4'>₹ {totalPrice}</p>
            <Iconbtn
                text={'Buy Now'}
                customClass={'w-full '}
                onClick={buyHandler}
            ></Iconbtn>
        </div>
    </div>
  )
}

export default RenderTotalPrice