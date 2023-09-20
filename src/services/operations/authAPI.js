import toast from "react-hot-toast"
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"


export function sendOTP(email, navigate){
    return (dispatch) => {
        console.log("Otp send successfully", email)
    }
}


export function login(email,password,navigate){
    return (dispatch) => {
        console.log(`${email}
${password}`)
    }
    navigate("/dashboard")
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