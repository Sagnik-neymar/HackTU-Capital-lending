import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    analysisData: null,
}

const analysisSlice = createSlice({
    name: "analysis",
    initialState,
    reducers: {
        setAnalysisData(state,action){
            state.analysisData = action.payload;
        },
        clearAnalysisData(state){
            state.analysisData = null;
        }
    }
})

export const { setAnalysisData, clearAnalysisData } = analysisSlice.actions;
export default analysisSlice.reducer;

