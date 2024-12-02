import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages(state, action) {
      return action.payload;
    },
    addMessage(state, action) {
      state.push(action.payload);
    },
    updateMessageStatus(state, action) {
      const { id, status } = action.payload;
      const message = state.find(msg => msg.id === id);
      if (message) {
        message.lida = status;
      }
    },
    deleteMessage(state, action) {
      return state.filter(msg => msg.id !== action.payload);
    },
  },
});

export const { setMessages, addMessage, updateMessageStatus, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;
