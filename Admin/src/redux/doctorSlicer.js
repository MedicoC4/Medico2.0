import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  oneDoc:{},
  idDoc:0,
  docId : '',
  error: null,
  loading: false,
};




export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await axios.get(
    `http://localhost:1128/api/doctor/getAll`
  ); 
  return response.data;
});

export const deleteDoctor = createAsyncThunk(
  "api/deleteDoctor",
  async (id, { dispatch }) => {
    const response = await axios.delete(
      `http://localhost:1128/api/doctor/deleteDoc/:${id}`
    );
  }
);

export const verificationDoc = createAsyncThunk(
  "api/verificationDoc" , 
  async(input)=>{
    const responce = await axios.patch(`http://localhost:1128/api/doctor/verficationDoc` , 
    input
    )
    return responce.data
  }
  )
  export const doctorDetails = createAsyncThunk(
    "api/doctorDetails",
    async (id) => {
      const response = await axios.get(
        `http://localhost:1128/api/doctor/getOneDoc/${id}`
      );
      return response.data
    }
  );




const DoctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    save:(state,action)=>{
      state.idDoc=action.payload
    },
    logOut:(state)=>{
       state.oneDoc={} 
    },
    docIdd : (state,action)=>{
      state.docId = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(verificationDoc.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(doctorDetails.fulfilled, (state, action) => {
      state.oneDoc= action.payload;
    });
  },
});
export const {save , docIdd}= DoctorSlice.actions;
export default DoctorSlice.reducer;