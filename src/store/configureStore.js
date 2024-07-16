import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import userSlice from "./reducers/userSlice";

// export function configureStore() {
//     return createStore(rootReducer, applyMiddleware(thunk))
// }


export const store = configureStore({
    reducer: {
        counter: counterSlice,
        user: userSlice
    }
})