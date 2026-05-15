import { createSlice } from "@reduxjs/toolkit";


const messageFromRoomSlice = createSlice({
    name:"messageFromRoom",
    initialState:null,
    reducers:{
        addMessagesFromRoom:(state, action)=>{
            return action.payload;
        }
    }

})


export const {addMessagesFromRoom} = messageFromRoomSlice.actions;
export default messageFromRoomSlice.reducer;