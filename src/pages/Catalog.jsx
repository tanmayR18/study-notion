import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlice from '../slices/courseSlice';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Footer from '../components/common/Footer';
import Course_Card from "../components/core/Catalog/Course_Card"

const Catalog = () => {

    const { catalogName } = useParams();
    const [ catalogPageData, setCatalogPageData ] = useState(null)
    const [ categoryId, setCategoryId] = useState("")

    
    const getCategories = async() => {
        try{
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            
            const category_id = res?.data?.data?.filter( ct => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id
            console.log("category Id",category_id)
            setCategoryId(category_id)
        }catch(error){
            console.log("error while fetching categories")
            console.log(error)
        }
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
    <div className=' text-white'>
        <div>
            <p>Home / Catalog
            <span>
                {catalogPageData?.data?.selectedCategory?.name}
            </span>
            </p>
            <p> {catalogPageData?.data?.selectedCategory?.name} </p>
            <p> {catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div>
            {/* Section1 */}
            <div>
                <div>Courses to get you started</div>
                <div className=' flex gap-x-3'>
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course} />
                </div>
            </div>

            {/* section2 */}
            <div>
            <div>Top Courses in {catalogPageData?.data?.differentCategory?.name}</div>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course}/>
                </div>
            </div>

            {/* section3 */}
            <div>
                <div>Frequently Bought</div>
                <div className='py-8'>

                    <div className='grid grid-cols-1 lg:grid-cols-2'>

                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course, index) => (
                                <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                            ))
                        }

                    </div>

                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Catalog