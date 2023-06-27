import React from 'react'
import { FooterLink2 } from '../../data/footer-links'
// Logo
import logo from '../../assets/Logo/Logo-Full-Light.png'
//Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className='bg-richblack-800'>
        <div className='flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14'>
            <div className='border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700'>
                {/* Section 1 */}
                <div className='lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3'>
                    <div className='w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0'>
                        <img src={logo} alt='' className='object-contain'/>
                        <h1 className='text-richblack-50 font-semibold text-[16px]'>
                            Company
                        </h1>
                        <div className='flex flex-col gap-2'>
                            {
                                ["About","Careers","Affiliates"].map( (elemnet, index) => (
                                        <div key={index}
                                        className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                            <Link to={elemnet.toLocaleLowerCase()} >{elemnet}</Link>
                                        </div>
                                ) )
                            }
                        </div>
                        <div className='flex gap-3 text-lg'>
                            <FaFacebook/>
                            <FaGoogle/>
                            <FaTwitter/>
                            <FaYoutube/>
                        </div>
                    </div>

                    <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
                        <h1 className='text-richblack-50 font-semibold text-[16px]'>
                            Resources
                        </h1>
                        <div className='flex flex-col gap-2 mt-2'>
                            {
                                Resources.map((element, index) => (
                                    <div
                                    key={index}
                                    className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={element.split(" ").join("-").toLocaleLowerCase()}>
                                            {element}
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>

                        <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>
                            Support 
                        </h1>
                        <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2'>
                            <Link to={"/help-center"}>Help Center</Link>
                        </div>
                    </div>

                    <div className='w-[40%] lg:w-[30%] mb-7 lg:pl-0'>
                        <h1 className='text-richblack-50 font-semibold text-[16px]'>
                            Plans
                        </h1>
                        <div className='flex flex-col gap-2 mt-2'>
                            {
                                Plans.map( (element, index) => (
                                    <div
                                    key={index}
                                    className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={element.split(" ").join("-").toLocaleLowerCase()}>
                                            {element}
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>

                        <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>
                            Community
                        </h1>
                        
                        <div className='flex flex-col gap-2 mt-2'>
                            {
                                Community.map((element, index) => (
                                    <div
                                    key={index}
                                    className='text-[14px] cursor-pointer hover:text-richblue-50 transition-all duration-200'>
                                        <Link to={element.split(" ").join("-").toLocaleLowerCase()}>
                                            {element}
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>

                {/* Section 2 */}
                <div className='lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3'>
                    {
                        FooterLink2.map((element, index) => (
                            <div key={index} className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
                                <h1 className="text-richblack-50 font-semibold text-[16px]">
                                    {element.title}
                                </h1>
                                <div className='flex flex-col gap-2 mt-2'>
                                    {
                                        element.links.map((link, index) => (
                                            <div
                                            key={index}
                                            className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                                <Link to={link.link}>{link.title}</Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

         <div className='flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sms'>
            {/* Section 1 */}
            <div className='flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full'>
                <div className='flex flex-row'>
                    {
                        BottomFooter.map((element, index) => (
                            <div
                            key={element}
                            className={` ${
                                BottomFooter.length - 1 === index
                                ? ""
                                : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                            } px-3 `}
                            >
                            <Link to={element.split(" ").join("-").toLocaleLowerCase()}>
                                {element}
                            </Link>
                            </div>
                        ))
                    }
                </div>
                <div className='text-center'>Made with ❤️ by Tanmay © 2023 Studynotion</div>
            </div>
         </div>
    </div>
  )
}

export default Footer