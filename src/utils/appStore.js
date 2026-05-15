import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from './connectionSlice'
import otherUserReducer from './otherUserSlice'
import requestReducer from './requestSlice'
import messageFromRoomReducer from './messageFromRoomSlice'

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        otherUser:otherUserReducer,
        requests: requestReducer,
        messageFromRoom: messageFromRoomReducer

    }

})
export default appStore;