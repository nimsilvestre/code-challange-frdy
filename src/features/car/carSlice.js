import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  status: "idle",
  models: null,
  makes: [],
  vehicles: null,
};

// Async thunk action
export const fetchMakesFromApi = createAsyncThunk(
  "cars/fetchMakes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/makes",
      });
      return response.data;
    } catch (err) {
      
      // any HTTP error is caught here
      // can extend this implementation to customiz the error messages
      // ex: dispatch(loadTodoError("Sorry can't talk to our servers right now"));
      // console.log("ERROR 5XXX & 400 MAKES!3", err.response.status);
      let errorObject = `MAKES ERROR: ${err.response.status}`;
      return rejectWithValue(errorObject);
    }
  }
);

export const fetchModelsFromApi = createAsyncThunk(
  "cars/fetchModels",
  async (makeId, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/api/models", {
        params: { make: makeId },
      });
      return response.data;
    } catch (err) {
      let errorObject = `MODELS ERROR: ${err.response.status}`;
      return rejectWithValue(errorObject);
    }
  }
);

export const fetchVehiclesFromApi = createAsyncThunk(
  "cars/fetchVehicles",
  async (queryParams, { rejectWithValue }) => {
    const { make, model } = queryParams;
    try {
      const response = await axios.get("http://localhost:8080/api/vehicles", {
        params: { make: make, model: model },
      });

      return response.data;
    } catch (err) {
      let errorObject = `VEHICLES ERROR: ${err.response.status}`;
      return rejectWithValue(errorObject);
    }
  }
);

//RTK Slice
const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    resetErrors: (state, { payload }) => {
      state.loading = false;
      state.apiErrors = null;
    },
  },
  extraReducers: {
    [fetchMakesFromApi.pending]: (state, action) => {
      state.status = "loading";
      state.apiErrors = null;
    },
    [fetchMakesFromApi.fulfilled]: fetchMakesFromApiSuccessful,
    [fetchMakesFromApi.rejected]: (state, action) => {
      state.status = "failed";
      state.apiErrors = action.payload;
      state = initialState;
    },
    [fetchVehiclesFromApi.pending]: (state, action) => {
      state.status = "loading";
      state.apiErrors = null;
    },
    [fetchVehiclesFromApi.fulfilled]: fetchVehiclesFromApiSuccessful,
    [fetchVehiclesFromApi.rejected]: (state, action) => {
      state.status = "failed";
      state.apiErrors = action.payload;
      state = initialState;
    },
    [fetchModelsFromApi.pending]: (state, action) => {
      state.status = "loading";
      state.apiErrors = null;
    },
    [fetchModelsFromApi.fulfilled]: fetchModelsFromApiSuccessful,
    [fetchModelsFromApi.rejected]: (state, action) => {
      state.status = "failed";
      state.apiErrors = action.payload;
      state = initialState;
    },
  },
});

function fetchMakesFromApiSuccessful(state, action) {
  state.makes = action.payload;
  state.apiErrors = null;
  state.status = "successful";
}

function fetchModelsFromApiSuccessful(state, action) {
  state.models = action.payload;
  state.apiErrors = null;
  state.status = "successful";
}

function fetchVehiclesFromApiSuccessful(state, action) {
  state.vehicles = action.payload;
  state.apiErrors = null;
  state.status = "successful";
}

// Three actions generated from the slice
export const { resetErrors } = carSlice.actions;

export const clearErrors = () => async (dispatch) => {
  dispatch(resetErrors());
};

export default carSlice.reducer;
