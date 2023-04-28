import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
    'pages/Login.js',
    async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`);
        return await response.json();
    }
);

const initialState =  {
        id:"",
        username:"",
        email: "",
        role: "",
        isLogged: false
    };
    
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addUser: (state, action) => {
            return {
                ...state,
                id: action.payload.user.id,
                username: action.payload.user.username,
                email: action.payload.user.email,
                role: action.payload.user.role,
                isLogged: true

            };
        },
        removeUser: (state, action) => {
            return {
                ...initialState
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return {
                ...state
            };
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            return {
                ...state,
                error: {message: "an error occured", status: 500}
            };
        });
    },
});

export const {addUser , removeUser} = userSlice.actions;

export default userSlice.reducer;