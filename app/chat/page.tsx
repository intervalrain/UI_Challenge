import ChatWindow from "@/components/chat/ChatWindow";

const ChatPage: React.FC = () => {
    return (
        <div className="h-full">
            <h1 className="text-2xl font-bold mb-4">Chat</h1>
            <ChatWindow />
        </div>
    );
};

export default ChatPage;