import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Seminar {
  id: number;
  answer: string;
}

interface Issue {
  id: number;
  rawText: string;
  cleanText: string;
}

interface ClusterResult {
  cluster: number;
  count: number;
  issues: Issue[];
  seminars: Seminar[];
}

type HomeState = {
  data: ClusterResult[];
  firstLoad: boolean;
};


const initialState: HomeState = {
  data: [],
  firstLoad: true
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<HomeState["data"]>) {
      state.data = action.payload;
    },
    setFirstLoad(state, action: PayloadAction<HomeState["firstLoad"]>) {
      state.firstLoad = action.payload;
    },
  },
});

export const { setData, setFirstLoad } = homeSlice.actions;
export default homeSlice.reducer;
