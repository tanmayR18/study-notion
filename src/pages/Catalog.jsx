import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlice from '../slices/courseSlice';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Footer from '../components/common/Footer';
import Course_Card from "../components/core/Catalog/Course_Card"
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../slices/profileSlice';
import Spinner from '../components/common/Spinner';

const Catalog = () => {

    const dispatch = useDispatch()
    const {loading} = useSelector( state => state.profile)
    const { catalogName } = useParams();
    const [ catalogPageData, setCatalogPageData ] = useState(null)
    const [ categoryId, setCategoryId] = useState("")
    const [active, setActive] = useState(1)

    
    const getCategories = async() => {
        dispatch(setLoading(true))
        try{
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            
            const category_id = res?.data?.data?.filter( ct => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id
            console.log("category Id",category_id)
            setCategoryId(category_id)
        }catch(error){
            console.log("error while fetching categories")
            console.log(error)
        }
        dispatch(setLoading(false))
    }

    const getCatagoryDetails = async() => {
        try{
            console.log("Category id inside the page details", categoryId)
            const res = await getCatalogPageData(categoryId)
            console.log("Printing res:", res)
            setCatalogPageData(res)
        } catch(error){
            console.log(error)
        }
    }

    // Fetch all categories
    useEffect( () => {
        getCategories()
        console.log("Category Id", categoryId)
    },[catalogName])

    useEffect( () => {
        if(categoryId){
            getCatagoryDetails()
        }
    }, [categoryId])

  return (
    loading ?
    <Spinner/> : 
    <div className=' px-4'>
        <div className=' flex flex-col items-center box-content w-full bg-richblack-800 px-4 lg:px-8 md:px-8 ml-[-16px]'>
        <div className='  flex min-h-[260px] max-w-maxContentTab flex-col justify-center  gap-4 lg:max-w-maxContent md:lg:max-w-maxContent'>
            <p className=' text-sm text-richblack-300'>
            Home / Catalog
            <span className=' to-yellow-25'>
                {catalogPageData?.data?.selectedCategory?.name}
            </span>
            </p>
            <p className=' text-3xl text-richblack-5'> {catalogPageData?.data?.selectedCategory?.name} </p>
            <p className=' max-w-[870px] text-richblack-200'> {catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        
            {/* Section1 */}
            <div className='box-content w-full  max-w-maxContentTab  py-12 lg:max-w-maxContent md:ml-[-30px] '>
                <div className=' section_heading'>Courses to get you started</div>
                <div className=' my-4 mr-4 flex border-b border-b-richblack-600 text-sm'>
                    <p
                    className={` px-4 py-2 cursor-pointer ${
                        active === 1 ?
                        "border-b border-b-yellow-25 text-yellow-25" : 
                        " text-richblack-50"
                    }`}
                    onClick={() => setActive(1)}
                    >Most Popular</p>
                    <p 
                    className={` px-4 py-2 cursor-pointer ${
                        active === 2 ?
                        "border-b border-b-yellow-25 text-yellow-25" : 
                        " text-richblack-50"
                    }`}
                    onClick={() => setActive(2)}
                    >New</p>
                </div>
                <div className=' w-full'>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course} />
                </div>
            </div>

            {/* section2 */}
            <div className="box-content w-full max-w-maxContentTab py-12 lg:max-w-maxContent md:ml-[-30px] lg:ml-[-30px]">
            <div className="section_heading">Top Courses in {catalogPageData?.data?.differentCategory?.name}</div>
                <div className="py-8">
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course}/>
                </div>
            </div>

            {/* section3 */}
            <div className="box-content w-full max-w-maxContentTab  py-12  lg:max-w-maxContent md:ml-[-30px] lg:ml-[-30px]">
                <div className="section_heading">Frequently Bought</div>
                <div className='py-8'>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course, index) => (
                                <Course_Card course={course} key={index} Height={"lg:h-[400px] md:h-[400px] h-[200px]"}/>
                            ))
                        }

                    </div>

                </div>

                <Footer/>
            </div>
        
        
    </div>
    
    </div>
  )
}

export default Catalog