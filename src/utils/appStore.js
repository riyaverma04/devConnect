import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from './connectionSlice'
import otherUserReducer from './otherUserSlice'

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        otherUser:otherUserReducer,

    }

})
export default appStore;