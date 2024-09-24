import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
    role: 'user' | 'assistant';
    content: string;
};

interface ChatSlice {
    messages: Message[];
};

const initialState: ChatSlice = {
    messages: []
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        }
    }
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;