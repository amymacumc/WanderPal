import UserBubble from "../UserBubble";
import SystemBubble from "../SystemBubble";
import type { Message } from '../type';

interface BubbleListProps {
    messages: Message[];
}

const BubbleList = ({
    messages 
}: BubbleListProps) => {
    return (
        <div className="flex flex-col space-y-4 p-4">
            {messages.map((message, index) => (
                <div key={message.id || index} className="w-full">
                    {message.role === 'user' ? (
                        <UserBubble content={message.content} />
                    ) : (
                        <SystemBubble content={message.content} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default BubbleList;