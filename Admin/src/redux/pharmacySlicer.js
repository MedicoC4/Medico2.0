import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    data: [],
    onePharm: {},
    pharmaEmail: '',
    error: null,
    loading: false,
  };


export const fetchPharmacies = createAsyncThunk(
  'pharmacies/fetchPharmacies',
  async () => {
    const response = await axios.get(`http://localhost:1128/api/pharmacy/fetch`);
    return response.data;
  }
);
export const verificationPharm = createAsyncThunk(
  "api/verificationPharm" , 
  async(input)=>{
    const responce = await axios.patch(`http://localhost:1128/api/pharmacy/verficationPharm` , 
    input
    )
    return responce.data
  }
  )
  export const pharmacyDetails = createAsyncThunk(
    "api/pharmacyDetails",
    async (id) => {
      const response = await axios.get(
        `http://localhost:1128/api/pharmacy/getOnePharm/${id}`
      );
      return response.data
    }
  );


const pharmaciesSlice = createSlice({
  name: 'pharmacies',
  initialState,
  reducers: {
    pharmEmail : (state,action)=>{
      state.pharmaEmail = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPharmacies.fulfilled, (state, action) => {
        state.data = action.payload;
    });
    builder.addCase(verificationPharm.fulfilled, (state, action) => {
        state.data = action.payload;
    });
    builder.addCase(pharmacyDetails.fulfilled, (state, action) => {
        state.onePharm = action.payload;
    });
  },

});
export const {pharmEmail}= pharmaciesSlice.actions;
export default pharmaciesSlice.reducer;