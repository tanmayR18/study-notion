import toast from "react-hot-toast";
import { profileEndPoints } from "../apis";
import { apiConnector } from "../apiconnector"
import { setLoading, setUser } from "../../slices/profileSlice"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } = profileEndPoints

export function getUserDetails( token, navigate){
    return async (dispatch) =>  {
        const toastid = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("GET", GET_USER_DETAILS_API, {
                Authorization: `Bearer ${token}`,
            })
            console.log("GET_USER_DETAILS API RESPONSE...",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            const userImage = response.data.data.image ?
            response.data.data.image :
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

            dispatch(setUser({...response.data.data, image: userImage}))
        } catch(error){
            dispatch(logout(navigate))
            console.log("GET_USER_DETAILS api error...", error)
            toast.error("Could Not get user details")
        }
        toast.dismiss(toastid)
        dispatch(setLoading(false))
    }
}

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        console.log("BEFORE CALLING BACKEND API FOR ENROLLED COURSES")
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {Authorization:`Bearer ${token}`}
        )
        console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    } 
    toast.dismiss(toastId)
    return result
}