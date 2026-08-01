import React, { useEffect, useState } from 'react'

function Requirements({name,label,register,setValue,getValues,errors}) {
    const [requirement,setRequirement] = useState('');
    const [requirementsList,setRequirementsList] = useState([]);
    

    useEffect(()=>{
        register(name,{required:true})
    },[register,name])

    useEffect(()=>{
        setValue(name,requirementsList)
    },[requirementsList])

    useEffect(()=>{
        const values = getValues(name)
        if(values){
            setRequirementsList(values)
        }
    },[])


    function addHandler(event){
        if(requirement){
            setRequirementsList([...requirementsList,requirement])
            setRequirement('');
        }
    }

    function removeHandler(index){
        const updateRequirementList = [...requirementsList];
        updateRequirementList.splice(index,1);
        setRequirementsList(updateRequirementList);
    }
  return (
   <div className='flex flex-col px-4 gap-2'>
        <label htmlFor={name}  className='text-richblack-100 text-xs'>{label}</label>
        <input
            type='text'
            name={name}
            id={name}
            value={requirement}
            onChange={(e)=>setRequirement(e.target.value)}
           className='bg-richblack-700 rounded-md py-1 shadow-sm shadow-richblack-500 pl-2 text-md text-richblack-5 outline-none'
        ></input>
        <button
            type='button'
            className='text-sm font-bold text-yellow-100  w-fit'
            onClick={addHandler}
        >
            Add
        </button>
        <ul className='list-disc pl-2 text-white'>
            {
                requirementsList.length > 0 &&
                requirementsList.map((requirement,index)=>(
                    <li key={index} className='flex flex-row gap-20 mt-2'>
                        <div className='text-richblack-50 text-md'>
                        {requirement}
                        </div>
                        <button
                            type='button'
                            onClick={()=>removeHandler(index)}
                            className='bg-richblack-900 px-2 py-1 text-xs text-richblack-100 rounded-md
                            hover:text-richblack-5 transition-all duration-200'
                        >
                            Clear
                        </button>
                    </li>
                ))
            }
        </ul>
        {
            errors[name] &&
            requirementsList.length === 0 &&
                (<p className='text-pink-200 text-xs'>Requirements/Instructions are mandatory</p>)
        }
    </div>
  )
}

export default Requirements