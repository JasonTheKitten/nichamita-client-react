import { MessageEntity } from "@/nichajs/entity/MessageEntity";
import { formatText } from "./textformatter";
import styles from "./message.module.css";

const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    let amPm = date.getHours() >= 12 ? 'PM' : 'AM';
    let hours = date.getHours() % 12;
    hours = hours !== 0 ? hours : 12;
    let hoursStr = hours < 10 ? `0${hours}` : hours;
    let minutes = date.getMinutes();
    let minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hoursStr}:${minutesStr} ${amPm}`;
}

const escapeHtml = (unsafe: string): string => {
    let div = document.createElement('div');
    div.innerText = unsafe;
    let safe = div.innerHTML;
    div.remove();

    return safe;
}

const prepareText = (text: string): string => {
    return formatText(escapeHtml(text), styles["multiline-code"]);
}

function ExpandedMessage({ className, index, message }: { className?: string, index: number, message: MessageEntity }) {
    return (
        <li key={index} className={`${styles.message} ${styles["message-expanded"]} ${className}`}>
            <div className={styles["message-avatar"]}></div>
            <div className={styles["message-content-group"]}>
                <div className={styles["message-author"]}>Author</div>
                <div className={styles["message-text"]} dangerouslySetInnerHTML={{__html: prepareText(message.text)}}></div>
            </div>
            <div className={styles["message-time"]}>Today at {formatTime(message.createdAt)}</div>
        </li>
    );
}

function CollapsedMessage({ className, index, message }: { className?: string, index: number, message: MessageEntity }) {
    return (
        <li key={index} className={`${styles.message} ${styles["message-collapsed"]} ${className}`}>
            <div className={styles["message-content-group"]}>
                <div className={styles["message-text"]} dangerouslySetInnerHTML={{__html: prepareText(message.text)}}></div>
            </div>
            <div className={styles["message-time"]}>Today at {formatTime(message.createdAt)}</div>
        </li>
    );
}

export default function Message({ className, isCollapsed, index, message }: { className?: string, isCollapsed: boolean, index: number, message: MessageEntity }) {
    return (
        <div className={className}>
            {isCollapsed ? <CollapsedMessage index={index} message={message} /> : <ExpandedMessage index={index} message={message} />}
        </div>
    );
}