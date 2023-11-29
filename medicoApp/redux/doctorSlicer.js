import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  idDoc:0,
  error: null,
  loading: false,
};




export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await axios.get(
    `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/getAll`
  ); 
  return response.data;
});


export const addDoctor = createAsyncThunk(
  "addDoctor",
  async (input, { dispatch }) => {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/addDoc`,
      input
    );
    dispatch(fetchDoctors());
    return response.data;
  }
);

const deleteDoctor = createAsyncThunk(
  "api/deleteDoctor",
  async (id, { dispatch }) => {
    const response = await axios.delete(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/deleteDoc/:${id}`
    );
    dispatch(fetchDoctors());
    return response.data;
  }
);

export const updateDoctor = createAsyncThunk(
  "api/updateDoctor",
  async (id, input, { dispatch }) => {
    const response = await axios.delete(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/updateDoc/:${id}`,
      input
    );
    dispatch(fetchDoctors());
    return response.data;
  }
);
export const migrateDoctor = createAsyncThunk(
  "api/migrateDoctor",
  async (input) => {
    const doc = await axios.post(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor//migrationDoctor`,
      input
    );
    return doc.data;
  }
);
export const updateLocation = createAsyncThunk(
  "api/updateLocation" , 
  async(input)=>{
    const responce = await axios.patch(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/updateLocation` , 
    input
    )
    return responce.data
  }
  )
  export const updateSpeciality = createAsyncThunk(
    "api/updateSpeciality",
    async(input)=>{
      const responce = await axios.patch(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/updateSpeciality`,
      input
      )
      return responce.data
    }
  )
  export const updateRecords = createAsyncThunk(
    "api/updateRecords",
    async(input)=>{
      const responce = await axios.post(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/updateRecords`,
      input
      )
      return responce.data
    }
  )

const DoctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    save:(state,action)=>{
      state.idDoc=action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addDoctor.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateDoctor.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(migrateDoctor.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateLocation.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    // builder.addCase(updateRecords.fulfilled, (state, action) => {
    //   state.data = action.payload;
    // });
  },
});
export const {save}= DoctorSlice.actions;
export default DoctorSlice.reducer;