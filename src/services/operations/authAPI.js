
export function sendOTP(email, navigate){
    return (dispatch) => {
        console.log("Otp send successfully")
    }
}


export function login(email,password,navigate){
    return (dispatch) => {
        console.log(`${email}
${password}`)
    }
    navigate("/dashboard")
}

