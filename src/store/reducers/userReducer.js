import { LOGINUSER, LOGOUTUSER } from "../actions/userActions";

const initialState = {
    user: {
        email: "db@gmail.com",
        name: "db",
        id: 0,        
    }
};

const userReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case LOGINUSER:
            return {
                ...state,
                user: {
                    ...state.user,
                    email: payload.email,
                    name: payload.name,
                    id: payload.userId
                }
            };

        case LOGOUTUSER:
            return {
                ...state,
                user: initialState.user
            };

        default:
            return state;
    }
}

export default userReducer;