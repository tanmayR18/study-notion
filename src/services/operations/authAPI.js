



export function login(email,password,navigate){
    return (dispatch) => {
        console.log(`${email}
${password}`)
    }
    navigate("/dashboard")
}

export function signUp({accountType,firstName,lastName,email,password,confirmPassword,otp, navigate}){
    return (dispatch) => {
        console.log(`${accountType}
    ${firstName}
    ${lastName}
    ${email}
    ${password}
    ${confirmPassword}
    ${otp}`)
    navigate("/login")
    }
}