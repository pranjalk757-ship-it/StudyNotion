import React from 'react'
import Button from './Button'
import {TypeAnimation} from 'react-type-animation'
function CodeBlock({title,description,btn1,btn2,position,codeblock,codeColor,gradientcolor}) {
    const speed = 50;
    const pause = 60;
    let delay = 0;
  return (
    <div className={`flex ${position} mt-10 lg:max-h-[300px]  w-full  justify-center items-center max-h-[40rem]  md:mb-20 `}>
        {/* left part */}
        <div className='lg:w-[50%] w-full h-[15rem] mt-24 flex flex-col lg:ml-32 p-1   relative items-center  ml-auto'>
            <div className='text-3xl font-semibold md:text-center lg:text-start'>{title}</div>
            <div className='text-sm text-richblack-300 mt-6 lg:text-start '>
                {description}
            </div>
            <div className='flex flex-row  mt-10 gap-4'>
                <Button text={btn1.btntext} linkto={btn1.linkto} active={btn1.active} />
                <Button text={btn2.btntext} linkto={btn2.linkto} active={btn2.active} />
            </div>
            
        </div>
        {/* bg-[bg-gradient-to-r from-yellow-800 to-orange-500]   */}
        {/* right part */}
        <div className='md:w-[70%] lg:w-[60%] w-full relative mt-32 md:mx-auto lg:max-h-[300px]'>
           <div className={`${gradientcolor} absolute w-[15rem] h-[15rem] rounded-[60%] -top-10 left-40 opacity-60 blur-[80px]`} ></div>
            <div className='flex flex-row w-full lg:w-[85%]  lg:ml-10 text-xs md:text-sm gap-2 shadow-[-3px_0px_10px_1px_theme(colors.richblue.600)] pl-1  mb-36 h-[230px] lg:h-[280px]'>
                <div>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`flex flex-col w-[100%] min-w-[100%]  font-bold font-mono ${codeColor} pr-2 `}>

                    <TypeAnimation
                    sequence={[codeblock,2000,""]}
                    repeat={Infinity}
                    speed={100}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                    omitDeletionAnimation={true}
                    />
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default CodeBlock