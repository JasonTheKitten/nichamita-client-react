import { useConnection } from "@/contexts/ConnectionContext";
import { MessageEntity } from "@/nichajs/entity/MessageEntity";
import { MessageEvent, MessageEventTransformer } from "@/nichajs/gateway/event/MessageEvent";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Message from "../message";
import styles from "./messages.module.css";

export default function Messages({className, sentTrigger, setSentTrigger}: {className?: string, sentTrigger: boolean, setSentTrigger: Dispatch<SetStateAction<boolean>>}) {
    const connection = useConnection();
    const [ messages, setMessages ] = useState<MessageEntity[]>([]);

    useEffect(() => {
        const transformer = new MessageEventTransformer();
        connection?.gateway.onEvent<MessageEvent>(transformer).subscribe((event: MessageEvent) => {
            setMessages((prev) => [ ...prev, event.message ]);
        });
    }, [ connection ]);

    useEffect(() => {
        if (!sentTrigger || !className) return;

        const messageList = document.querySelector(`.${className}`);
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }

        setSentTrigger(false);
    }, [ sentTrigger ]);
    
    const shouldCollapseMessage = (message: MessageEntity, prevMessage: MessageEntity): boolean => {
        return (
            message.authorId === prevMessage.authorId
            && message.createdAt - prevMessage.createdAt < 1000 * 60 * 3
        );
    }

    return (
        <div className={className}>
            <ul className={styles.messages}>
                {messages.map((message, index) => {
                    const isCollapsed = index > 0 && shouldCollapseMessage(message, messages[index - 1]);
                    return <Message key={index} isCollapsed={isCollapsed} index={index} message={message} />;
                })}
            </ul>
        </div>
    );
}