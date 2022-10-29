import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import {IQuestion} from "../types/questions";

// Define a type for the slice state
interface QuestionState {
    selectedQuestion?: IQuestion;
}

// Define the initial state using that type
const initialState: QuestionState = {

};

export const questionsSlice = createSlice({
    name: 'local/questions',
    initialState,
    reducers: {
        setSelectedQuestion(state, action: PayloadAction<IQuestion>){
            state.selectedQuestion = action.payload;
        },
    },
});

export const {setSelectedQuestion} = questionsSlice.actions;
// selectors
export const getSelectedQuestion = (state: RootState) => state["local/questions"].selectedQuestion;

export default questionsSlice.reducer;