import React, { useEffect, useState } from 'react'

function ChipInputs({name,label,register,setValue,getValues,errors,editData}) {
    const [tag,setTag] = useState('');
    const [chip,setChip] = useState([]);


    useEffect(()=>{
        register(name,{required:true})
    },[register,name])
    useEffect(()=>{
        setValue(name,chip);
    },[chip])

    useEffect(()=>{
        const tags = getValues(name)
        if(tags){
            setChip(tags)
        }
    },[])


    function enterHandler(event){
        if(event.key === 'Enter'){
            event.preventDefault();
            if(tag){
                setChip([...chip,tag]);
                setTag('');
            }
        }
    }
    function removeHandler(index){
        const updatedchip = [...chip];
        updatedchip.splice(index,1);
        setChip(updatedchip);
    }
  return (
   <div className='flex flex-col px-4 gap-2'>
        <label htmlFor={name} className='text-richblack-100 text-xs'>{label}</label>
        <div className='flex flex-row gap-5'>
            {
                chip?.length > 0 &&
                chip.map((element,index)=>(
                    <div className='text-white flex flex-row bg-yellow-900 w-fit px-2 py-1 border-[1px] border-yellow-700 rounded-md gap-2' key={index}>
                        <p className='text-yellow-100 text-xs'>{element}</p>
                        <button
                            type='button'
                            onClick={()=>removeHandler(index)}
                            className='text-[10px] h-fit w-2 text-yellow-500 font-bold hover:text-yellow-200 cursor-pointer'
                        >X</button>
                    </div>
                ))
            }
        </div>
        <input
            type='text'
            name={name}
            id={name}
            value={tag}
            onKeyDown={enterHandler}
            onChange={(e)=>setTag(e.target.value)}
            
            className='bg-richblack-700 rounded-md py-1 shadow-sm shadow-richblack-500 pl-2 text-md text-richblack-5 outline-none'
        ></input>
    </div>
  )
}

export default ChipInputs