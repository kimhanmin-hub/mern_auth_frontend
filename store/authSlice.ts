import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

interface AuthState {
    User: User | null;
}

const initialState: AuthState = {
    User: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<User | null>) => {
            state.User = action.payload;
        },
    },
});

export const { setAuthUser } = authSlice.actions;

export default authSlice.reducer;

