import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[],
}
export  const basketSlice=createSlice({
    name:'basket',
    initialState,
    reducers:{
        addToBasket:(state,action)=>{
       
            state.items = [...state.items,action.payload]
        },  
        initializeBasket:(state,action)=>{
       
            state.items = [...action.payload]
        },  
        removeFromBasket:(state,action)=>{
            const index=state.items.findIndex(basketItem => basketItem.id === action.payload.id)
            let newBasket=[...state.items];
            newBasket.splice(index,1)
             if(index > -1)
            state.items = newBasket;
        },
    }
})

export const {addToBasket,removeFromBasket,initializeBasket} = basketSlice.actions;

export const selectItems = (state) =>{
   return  state.basket.items;
}
export const selectTotal = (state) =>{

    const amount= state.basket.items.reduce((total ,  nextItem) =>{
   
       return total + nextItem.price
     }  ,0);
    return  Number(amount.toFixed(2))
} 

export default basketSlice.reducer;