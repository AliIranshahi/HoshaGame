import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = {
  status: boolean;
  username: string;
};

type TQuestionStatus = {
  game: number;
  sport: number;
  history: number;
  science: number;
  geography: number;
  knowledge: number;
};

type TScore = {
  score: number;
  questionStatus: TQuestionStatus | null;
};
type TInitiaonSate = {
  status: boolean;
  username: string;
  loading: boolean;
  error: string | null;
  score: number;
  questionStatus: TQuestionStatus | null;
};
const initialState: TInitiaonSate = {
  status: false,
  username: "",
  loading: false,
  error: null,
  score: 0,
  questionStatus: null,
};

export const fetchUserStatus = createAsyncThunk(
  "AuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("api/user", { withCredentials: true });

      return response.data as TResponse;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data || { status: false, username: "" }
        );
      }

      return rejectWithValue({ action: false, username: "" });
    }
  }
);

export const fetchScoreStatus = createAsyncThunk(
  "ScoreStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("api/score", { withCredentials: true });
      console.log("Response data from /api/score:", response.data);

      return response.data as TScore;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.error || "خطا در دریافت امتیاز"
        );
      }
      return rejectWithValue("خطای ناشناخته");
    }
  }
);

export const authSlice = createSlice({
  name: "AuthSlice",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.status = false;
      state.username = "";
      state.error = null;
      state.loading = false;
      state.score = 0;
    },

    increseNumberAPI: (state, action) => {
      const type = action.payload;

      if (type == "game" && state.questionStatus) {
        state.questionStatus.game += 1;
        
      }
      if (type == "sport" && state.questionStatus) {
        state.questionStatus.sport += 1;
      }
      if (type == "history" && state.questionStatus) {
        state.questionStatus.history += 1;
      }
      if (type == "knowledge" && state.questionStatus) {
        state.questionStatus.knowledge += 1;
      }
      if (type == "geography" && state.questionStatus) {
        state.questionStatus.geography += 1;
      }
      if (type == "science" && state.questionStatus) {
        state.questionStatus.science += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUserStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.status = action.payload.status;
      state.username = action.payload.username;
    });

    builder.addCase(fetchUserStatus.rejected, (state, action) => {
      state.loading = false;
      state.username = "";
      state.status = false;
      state.error = action.payload ? String(action.payload) : "Unknow Error";
    });

    builder.addCase(fetchScoreStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchScoreStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.score = action.payload.score;
      state.questionStatus = action.payload.questionStatus;
    });
    builder.addCase(fetchScoreStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
        ? String(action.payload)
        : "خطا در دریافت امتیاز";
      state.score = 0;
      state.questionStatus = null;
    });
  },
});
