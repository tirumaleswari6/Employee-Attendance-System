import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/apiClient";

export const checkIn = createAsyncThunk("attendance/checkIn", async (time) => {
  const res = await api.post("/attendance/check-in", { time });
  return res.data;
});

export const checkOut = createAsyncThunk("attendance/checkOut", async (time) => {
  const res = await api.post("/attendance/check-out", { time });
  return res.data;
});

export const getHistory = createAsyncThunk("attendance/history", async () => {
  const res = await api.get("/attendance/history");
  return res.data;
});

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: { history: [] },

  extraReducers: (builder) => {
    builder.addCase(getHistory.fulfilled, (state, action) => {
      state.history = action.payload;
    });
  },
});

export default attendanceSlice.reducer;
