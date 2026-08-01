import {createSlice} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    cart : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    totalPrice : localStorage.getItem('totalPrice') ? JSON.parse(localStorage.getItem('totalPrice')) : 0,
    totalItems : localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
}

const cartSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        addToCart:(state,action)=>{
            const course = action.payload;
            const index = state.cart.findIndex((item)=> (item._id === course._id));

            if(index >= 0){
                // already in cart
                toast.error("Course is already present in cart")
                return;
            }

            // if not present add into cart
            state.cart.push(course);
            state.totalItems++;
            state.totalPrice += course.price;

            // update to local storage
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice",JSON.stringify(state.totalPrice));

            toast.success("Course added to cart")
        },
        removeFromCart:(state,action)=>{
            const course = action.payload;
            const index = state.cart.findIndex((item)=>(item._id === course._id));

            if(index >= 0){
                // course is found in a cart
                state.totalItems--;
                state.totalPrice -= course.price;
                state.cart.splice(index,1);

                // update to local storage
                localStorage.setItem("cart",JSON.stringify(state.cart));
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
                localStorage.setItem("totalPrice",JSON.stringify(state.totalPrice));

                toast.success("Course removed from cart")
            }
        },
        resetCart:(state,action)=>{
            state.cart = [];
            state.totalItems = 0;
            state.totalPrice = 0;

            // update to local storage
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice",JSON.stringify(state.totalPrice));
        }
    }
})

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;