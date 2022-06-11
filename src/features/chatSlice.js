import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatID: null,
    chatName:null
  },
  reducers: {
    setChat : (state,{payload}) => {

      state.chatID = payload.chatID;
      state.chatName = payload.chatName;
    },

  },
});

export const { setChat } = chatSlice.actions;

export const selectchatID = state=>state.chat.chatID
export const selectchatName = state=>state.chat.chatName



export default chatSlice.reducer;
