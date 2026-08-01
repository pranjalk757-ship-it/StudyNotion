import React from 'react'

function ConfirmationModal({confirmationModal}) {
    const {text1,text2,btn1Text,btn2Text,btn1Handler,btn2Handler} = confirmationModal;
  return (
    <div className='fixed inset-0 z-[9999] overflow-auto !mt-0 grid place-items-center bg-white bg-opacity-10 
    backdrop-blur-sm '>
        <div className='text-white bg-richblack-900 px-6  rounded-md z-[1000]'>
            <h1 className='text-2xl pt-4'>{text1}</h1>
            <h2 className='text-sm mt-2 text-richblack-100' >{text2}</h2>
            <div className='flex flex-row gap-4 mt-10 pb-6'>
                <button onClick={btn1Handler}
                 className='bg-yellow-100 text-richblack-900  px-4 py-1 rounded-md font-semibold'
                >
                    {btn1Text}
                </button>
                <button onClick={btn2Handler}
                 className='bg-richblack-700 text-richblack-5  px-4 py-1 rounded-md font-semibold'
                >
                    {btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal