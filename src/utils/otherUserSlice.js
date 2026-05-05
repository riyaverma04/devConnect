import { createSlice } from "@reduxjs/toolkit";

const otherUserSlice = createSlice({
    name:"otherUser",
    initialState: null,
    reducers:{
        addOtherUser:(state,action)=>{
            return action.payload;
        }
    }
});

export const{addOtherUser} = otherUserSlice.actions;
export default otherUserSlice.reducer;