import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  data: [],
  error: null,
  loading: false,
};



export const fetchUsers = createAsyncThunk('api/fetchUsers', async () => {
  const response = await axios.get(`http://localhost:1128/api/user/getAll`); // Replace with your API endpoint
  return response.data;
});

export const fetchUserNames=createAsyncThunk('api/fetchUserName',async(id)=>{
  const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/getUser/${id}`); // Replace with your API endpoint
  return response.data;
})

export const addUser = createAsyncThunk(
    "addUser",
    async (input, { dispatch }) => { 
     const response = await axios.post(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/createUser`, input);
  return response.data
    }
  );

const deleteUser = createAsyncThunk('api/deleteUser',async(id, {dispatch})=>{
    const response = await axios.delete(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/deleteUser/:${id}`)
    dispatch(signIn())
    return response.data
})

const updateUser=createAsyncThunk('api/updateUser',async(id,input,{dispatch})=>{
  const response = await axios.put(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/updateUser/${id}`,input)
  // dispatch(signIn())
  return response.data
})

export const signIn = createAsyncThunk(
  "getUserfunc",
  async (input, { dispatch }) => {
   const response = await axios.post(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/signIn`, input);
   console.log(response.data.type,"this is from the store");

  
return response.data
  }
);



const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
     
    },
    extraReducers(builder) {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload;
      });
      builder.addCase(fetchUserNames.fulfilled, (state, action) => {
        state.data = action.payload;
      });
      builder.addCase(addUser.fulfilled, (state, action) => {
        state.data = action.payload;
      });
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      });
      builder.addCase(deleteUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
     
    }
  });
  const getUserSlice = createSlice({
    name: "getUser",
    initialState:{
      data: {},
      error: null,
      loading: false,
    },
    reducers: {
      logOut:(state)=>{
        state.data={} 
     }
    },
    extraReducers(builder) {
      builder.addCase(signIn.fulfilled, (state, action) => {
        state.data = action.payload;
      });
     
      builder.addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading=false
      });
      builder.addCase(signIn.pending, (state, action) => {
      
        state.loading=true

      })
     
    }
  });
  export const { logOut } = getUserSlice.actions
  export default {user:UserSlice.reducer,getUser:getUserSlice.reducer} 
