import React from 'react'
import logo from '../../../assets/Logo/Logo-Full-Light.png'
import { FooterLink2 } from '../../../data/footer-links'
import { Link } from 'react-router-dom'
import { TiHeartFullOutline } from "react-icons/ti";
function Footer() {
    const company = [
        "About",
        "Careers",
        "Affilates"
    ]
    const resources = [
        "Articles",
        "Blog",
        "Chart Sheet",
        "Code Challenges",
        "Docs",
        "Project",
        "Videos",
        "Workspace"
    ]

    const plans = [
        "Paid Membership",
        "For Students",
        "Business Solutions",
    ]

    const community = [
        "Forums",
        "Chapters",
        "Events"
    ]

    const support = [
        "Help Center"
    ]

    const condition = [
        "Privacy Policy",
        "Cookie Policy",
        "Terms"
    ]
  return (
    <div className=' w-11/12 mx-auto pt-[10%]'>
        <div className='text-white px-10 flex flex-row'>
            {/* left part */}
            <div className='w-[50%] flex flex-row justify-between px-4'>
                <div>
                    <img src={logo} alt='footer logo'></img>
                    <div className='space-y-3 mt-6'>
                        <h2 className='text-md text-richblack-5'>Company</h2>
                        {
                            company.map((elements,index)=>(
                                <div key={index} >
                                    <p className='text-xs text-richblack-300'>{elements}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='space-y-4'>
                    <div className='space-y-3'>
                        <h2 className='text-md text-richblack-5'>Resources</h2>
                        <div className='space-y-3'>
                            {
                                resources.map((element,index)=>(
                                    <div key={index}>
                                        <p className='text-xs text-richblack-300'>{element}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='space-y-3'>
                        <h2 className='text-md text-richblack-5'>Support</h2>
                        <div className='space-y-3'>
                            {
                                support.map((element,index)=>(
                                    <p className='text-xs text-richblack-300'>{element}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='space-y-4'>
                    <div className='space-y-3'>
                        <h2 className='text-md text-richblack-5'>Plans</h2>
                        {
                            plans.map((element,index)=>(
                                <div key={index}>
                                    <p className='text-xs text-richblack-300'>{element}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='space-y-3'>
                        <h2 className='text-md text-richblack-5'>Community</h2>
                        {
                            community.map((element,index)=>(
                                <div key={index}>
                                    <p className='text-xs text-richblack-300'>{element}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* right part */}
            <div className='w-[50%]  grid grid-cols-3 px-4'>
                {
                    FooterLink2.map((heading,index)=>(
                        <div key={index} className='space-y-3'>
                            <h2 className='text-md text-richblack-5'>{heading.title}</h2>
                            <div className='space-y-2'>
                                {
                                    heading.links.map((element,index)=>(
                                        <div key={index}>
                                            <Link to={`${element.link}`} className='text-xs text-richblack-300'>{element.title}</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
        <div className='w-full h-[1px] bg-richblack-300 mt-10'></div>
        <div className='pt-4 flex flex-col items-center'>
            <div className='flex flex-row gap-2 text-richblack-300'>
                {
                    condition.map((element,index)=>(
                        <div key={index}>
                            <p>{element}</p>
                        </div>
                    ))
                }
            </div>
            <div className='text-richblack-300 flex flex-row items-center gap-2 pb-10'>
                Made with <TiHeartFullOutline className='text-[#ff0c0c]' size={20}></TiHeartFullOutline> pranjalk757@gmail.com
            </div>
        </div>
    </div>
  )
}

export default Footer