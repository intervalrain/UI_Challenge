import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { setTheme, Theme } from "./themeSlice";
import { addMessage, Message, setMessages } from "./chatSlice";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

// chat
const selectChat = (state: RootState) => state.chat.messages;

export const useChat = () => {
    const messages = useAppSelector(selectChat);
    const dispatch = useAppDispatch();

    const addMessageValue = (newMessage: Message) => {
        dispatch(addMessage(newMessage));
    }

    const setMessagesValue = (newMessages: Message[]) => {
        dispatch(setMessages(newMessages));
    }
    
    return { messages, addMessage: addMessageValue, setMessages: setMessagesValue };
}

// theme
const selectTheme = (state: RootState) => state.theme.theme;

export const useTheme = () => {
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();

    const setThemeValue = (newTheme: Theme) => {
        dispatch(setTheme(newTheme));
    }

    return { theme, setTheme: setThemeValue };
}