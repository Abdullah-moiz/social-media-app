import { UserReducer } from "@/utils/userSlice";
import { configureStore } from '@reduxjs/toolkit'



export const store = configureStore({
  reducer: {
    User: UserReducer, // UserReducer is a function that returns a slice of state
  },
})