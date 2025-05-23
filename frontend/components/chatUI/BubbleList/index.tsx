import UserBubble from "../UserBubble";
import SystemBubble from "../SystemBubble";
import PlanBubble from "../PlanBubble";
import type { Message } from '../type';

interface BubbleListProps {
    messages: Message[];
}

function renderMessage(message: Message) {
    if (message.type === 'message' && message.role === 'user') {
        return <UserBubble content={message.content} />
    } else if (message.type === 'plan') {
        return <PlanBubble planList={message.plan} />
    } else {
        return <SystemBubble content={message.content} loading={message.loading} />
    }
}

const BubbleList = ({
    messages 
}: BubbleListProps) => {
    return (
        <div className="flex flex-col space-y-4 p-4">
            {messages.map((message, index) => (
                <div key={message.id || index} className="w-full">
                    {renderMessage(message)}
                </div>
            ))}
        </div>
    );
}

export default BubbleList;