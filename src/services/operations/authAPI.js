import toast from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import { setUser } from "../../slices/profileSlice"


export function sendOTP(email, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading..")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", endpoints.SENDOTP_API, 
            {email, checkUserPresent: true})

            console.log("SENDOTP APi response...", response)
            console.log(response.data)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("OTP sent successfully")
            navigate("/verify-email")

        } catch(error){
            console.log("SENDOTP API ERROR",error)
            toast.error("COuld not send otp")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function login(email,password,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", endpoints.LOGIN_API, {email, password})
            console.log("Login api response...", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Login successfully")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image ?
            response.data.user.image :
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response, image: userImage}))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/dashboard/my-profile")
        } catch(error){
            console.log("Login api error...", error)
            toast.error("Login Failed")
        }   
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, {email})
            console.log("reset password token response", response)
            
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset email sent")
            setEmailSent(true)
        } catch(error){
            console.log(`Error in resetting the passsword ${error}`);
            toast.error("Failed to send the email")
        }
        setLoading(false)
    }
}

export function resetPassword(password, confirmPassword, token){
    return async(dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, { password, confirmPassword, token})
            console.log("Response of reset password", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password reset successfully")
        } catch(error){
            console.error(error)
            toast.error("Unable to reset password")
        }
        dispatch(setLoading(false))
    }
}