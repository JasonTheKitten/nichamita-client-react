import { useState, useEffect } from "react";
import { useConnection } from "@/contexts/ConnectionContext";
import { MessageEvent, MessageEventTransformer } from "@/nichajs/gateway/event/MessageEvent";

export default function Messages() {
    const connection = useConnection();
    const [ messages, setMessages ] = useState<string[]>([]);

    useEffect(() => {
        const transformer = new MessageEventTransformer();
        connection?.onEvent<MessageEvent>(transformer).subscribe((event: MessageEvent) => {
            setMessages((prev) => [ ...prev, event.message ]);
        });
    }, [ connection ]);

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}