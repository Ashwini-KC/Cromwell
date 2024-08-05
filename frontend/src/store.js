import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlices'
import userReducer from './slices/userSlice'

//For token and usereinfo
const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: true
})

export default store; 