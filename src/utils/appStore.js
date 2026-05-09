import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from './connectionSlice'
import otherUserReducer from './otherUserSlice'
import requestReducer from './requestSlice'

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        otherUser:otherUserReducer,
        requests: requestReducer,

    }

})
export default appStore;