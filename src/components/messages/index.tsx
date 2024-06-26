import { useState, useEffect } from "react";
import { useConnection } from "@/contexts/ConnectionContext";
import { MessageEvent, MessageEventTransformer } from "@/nichajs/gateway/event/MessageEvent";
import { MessageEntity } from "@/nichajs/entity/MessageEntity";

export default function Messages() {
    const connection = useConnection();
    const [ messages, setMessages ] = useState<MessageEntity[]>([]);

    useEffect(() => {
        const transformer = new MessageEventTransformer();
        connection?.gateway.onEvent<MessageEvent>(transformer).subscribe((event: MessageEvent) => {
            setMessages((prev) => [ ...prev, event.message ]);
        });
    }, [ connection ]);

    const formatTime = (timestamp: number): string => {
        const date = new Date(timestamp);
        let amPm = date.getHours() >= 12 ? 'PM' : 'AM';
        let hours = date.getHours() % 12;
        hours = hours !== 0 ? hours : 12;
        return `${hours}:${date.getMinutes()} ${amPm}`;
    }

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map((message, index) => (
                    
                    <li key={index}>{message.text} (today at { formatTime(message.createdAt) })</li>
                ))}
            </ul>
        </div>
    );
}