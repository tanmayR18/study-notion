import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";



const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints

// get all the course 
export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response = await apiConnector("GET", GET_ALL_COURSE_API)
        if(!response?.data?.success){
            throw new Error('Could not fetch Course Categories')
        }
        result = response?.data?.data
    } catch(error){
        console.log("GET_ALL_COURSE_API error",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//Get course detials 
export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try{
        const response = await apiConnector("POST", COURSE_DETAILS_API,{courseId})
        console.log("COURSE_DETAILS_API__", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response.data

    } catch(error){
        console.log(":COURSE_DETAILS_API Error", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}

// fetch all the course categories
export const fetchCouseCategories = async () => {
    let result = []
    try{
        const response =  await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API RESPONSE", response)
        if(!response?.data?.success){
            throw new Error(`COuld not fetch course categories`)
        }
        result = response?.data?.data
    } catch(error){
        console.log("COURSE_CATEGORIES_API ERROR", error)
        toast.error(error.message)
    }
    return result
}


// TO add the course
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization:  `Bearer ${token}`
        })
        console.log("CREATE_COURSE_API RESPONSE", response)

        if(!response?.data?.success){
            throw new Error("Could not add course details")
        }
        toast.success("COurse detials added successfully")
        result = response?.data?.data
    } catch(error){
        console.log("CREATE COURSE API ERROR", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//edit the course detials
export const editCourseDetials = async( data, token) => {
    let result=null;
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("EDIT_COURSE_API Response", response)
         if(!response?.data?.success){
            throw new Error('couldnt update Course details')
         }
         toast.success("Course Detail updated successfully")
         result = response?.data?.data
    } catch(error){
        console.log("EDIT_COURSE_API error", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//Create a section
export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_SECTION_API Response", response)
        if(!response?.data?.success){
            throw new Error(`Couldn't Create Section`)
        }
        toast.success("Course Section Created")
        result =  response?.data?.updatedCourse
    } catch(error){
        console.log("CREATE_SECTION_API ERROR", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//create a subsection
export const createSubSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization:`Bearer ${token}`
        })
        console.log("CREATE SUBSECTION API RESOPONSE", response)
        if(!response?.data?.success){
            throw new Error("Could not add lectures to course")
        }
        toast.success("Lectures added")
        result = response?.data?.data
    } catch(error){
        console.log("CREATE SUB_SECTION API ERROR...", error)
        toast.dismiss(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// update a section 
export const updateSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization :`Bearer ${token}`
        })
        console.log("UPDATE_SECTION_API RESPONSE", response)
        if(!response.data.success){
            throw new Error('Could not update section')
        }
        toast.success("Course section updated")
        result = response?.data?.data
    } catch(error){
        console.log("UPDATE_SECTION_API ERROR", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//update a subsction
export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_SUBSECTION_API RESPOSNE", response)
        if (!response.data.success ){
            throw new Error ("could not lectures subsection ")
        }
        toast.success("Lecture updated")
        result = response?.data?.data
    } catch(error){
        console.log("UPDATE_SUBSECTION_API ERROR", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

//delete section
export const deleteSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        console.log("token inside course api delete seciton")
        const response=await apiConnector("DELETE", DELETE_SECTION_API,data,
         {Authorization:`Bearer ${token}`} )
         console.log("DELETE SECTION RESPONSE" ,response)
         if(!response?.data?.success){
            throw  new Error ('Could not delete course section ')
         }
         toast.success("Course section deleted")
         result = response?.data?.data
    } catch(error){
        console.log("ERROR IN DELETING SECTION ", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//Delete a subsection
export const deleteSubSection = async(data, token) => {
    let result =null ;
    const toastId = toast.loading("Loading")
    try{
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data,{
            Authorization :`Bearer ${token}`
        })

        console.log("DELETE_SUBSECTION_API RESPONSE", response)
        if ( !response.data.success ){
            throw new Error('Could not delete the lecture')
        }
        toast.success("Lecture deleted")
        result = response?.data?.data
    } catch(error){
        console.log("DELETE SUB-SECTION API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//fetching all course under a specific instuctor
export const fetchInstructorCourses = async(token) => {
    let result=[];
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null,
        {   Authorization: `Bearer ${token}`,})
        console.log("FETCH ALL COURSE BY INSTRUCTORS RESPONSE:", response );
        if (!response.data.success) {
            throw new Error ("Failed to get courses by instructor");
        }
        result=response?.data?.data;
    } catch(error){
        console.log("INSTRUCTOR COURSES API ERROR....", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return  result
}

// delete a courae '
export const deleteCourse = async( data, token) => {
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data,
        {    Authorization:`Bearer ${token}`} )
        console.log("DELETE COURSE API RESPONSE", response)
        if(!response.data.success){
            throw new Error ('could not delete this course');
        }
        toast.success("Course Deleted")
    } catch(error){
        console.log("DELETED COURSE API ERROR", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}   

//get full details of course
export const getFullDetailsOfCourse = async(courseId, token) => {
    const toastId = toast.loading("Loading....")
    let result = null
    try{
        console.log("Course id inside the course api", courseId)
        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId,
            },
            // headers
            {Authorization :`Bearer ${token}`},
        )
        console.log("COURSE FULL DETAILS API RESPONSE", response)
        if (!response.data.success ){
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } catch(error){
        console.log("COURSE FULL DETAILS API ERROR", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}

// mark a lecture as completed
export const markLectureAsCompleted = async(data, token) => {
    let result = null
    console.log("Marks complete data", data)
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, 
        {   Authorization: `Bearer ${token}`,})

        console.log("MARK LECTURE COMPLETED API RESPONSE...", response)
        toast.success("Lecture completed")
        result = "true"
    } catch(error){
        console.log("MARK LECRTURE AS COMPLETE API API ERROR...", error)
        toast.error(error.message)
    }   
    toast.dismiss(toastId)
    return  result
}

// create a rating for a cousre
export const createRating = async( data, token ) => {
    const toastId = toast.loading("Loading..")
    let success = false
    try{    
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`
        })

        console.log("Create Ratinf api response...", response)
        if(!response?.data?.success){
            throw new Error("Could not Create Rating")
        }
        toast.success("Rating created")
        success = true
    } catch(error){
        success = false
        console.log("CREATE RATING API ERROR..", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
}   