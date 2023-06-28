const { createSlice } = require("@reduxjs/toolkit")
const { toast } = require("react-hot-toast")

const initialState = {
    cart: localStorage.getItem("cart") ?
        JSON.parse(localStorage.getItem("cart")) :
        [],
    total: localStorage.getItem("total") ?
        JSON.parse(localStorage.getItem("total")) :
        0,
    totalItems: localStorage.getItem("totalItems") ?
        JSON.parse(localStorage.getItem("totalItems")) :
        0,

}   


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)

            if(index) {
                //if the course is already in the cart, do not modifify the quantity
                toast.error("Course already in cart")
                return
            }
            //If the course is note in the cart, add it to the cart
            state.cart.push(course)
            //update the total quantity and price
            state.totalItems++
            state.total += course.price
            //update to localstorage
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
        },

        removeFromCart: (state, action) => {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)
            if(index){
                //if the course is found in the cart, remove it
                state.totalItems--,
                state.total -= state.cart[index].price
                state.cart.splice(index,1)
                //update to local storage
                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("total",JSON.stringify(state.total))
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
                //shoe toast
                toast.success("couse removed from cart")

            }
        },
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            //update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
})


export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer