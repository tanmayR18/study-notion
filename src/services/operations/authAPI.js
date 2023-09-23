import toast from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import { setUser } from "../../slices/profileSlice"
import { resetCart } from "../../slices/cartSlice"



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

export function signup(accountType, firstName,lastName, email, password, confirmPassword, otp,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            console.log("Ye otp ja raha he frontend se", otp )
            const response = await apiConnector("POST", endpoints.SIGNUP_API,
            {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            console.log("SIGN API RESPONSE", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Signup Failed")
            navigate("/login")

        } catch(error){
            console.log("SIGNUP API ERROR....", error)
            toast.error("Signup Failed")
            navigate("/signup")
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
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
        } catch(error){
            console.log("Login api error...", error)
            toast.error("Login Failed")
        }   
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email, setEmailSent, loading){
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, {email})
            console.log("reset password token response", response)
            console.log("Loading in try", loading)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset email sent")
            setEmailSent(true)
        } catch(error){
            console.log(`Error in resetting the passsword ${error}`);
            toast.error("Failed to send the email")
        }
        dispatch(setLoading(false))
    }
}

export function resetPassword(password, confirmPassword, token, setPasswordUpdated){
    return async(dispatch) =>{
        dispatch(setLoading(true))
        try{
            console.log("Frontend se ye ja raha he ",{ password, confirmPassword, token})
            const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, { password, confirmPassword, token})
            console.log("Response of reset password", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            setPasswordUpdated(true)
            toast.success("Password reset successfully")
        } catch(error){
            console.error(error)
            toast.error("Unable to reset password")
        }
        dispatch(setLoading(false))
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }
  