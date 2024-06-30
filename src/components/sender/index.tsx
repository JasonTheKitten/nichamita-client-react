import { useConnection } from "@/contexts/ConnectionContext";
import { Dispatch, SetStateAction, useState } from "react";
import { toggleSaveFormat } from "./textcontrols";
import styles from "./sender.module.css";

export default function Sender({className, setSentTrigger}: {className?: string, setSentTrigger: Dispatch<SetStateAction<boolean>>}) {
    const connection = useConnection();
    const [ message, setMessage ] = useState<string>('');

    const formatMap = {
        'b': '**',
        'i': '*',
        'u': '__',
        's': '~~'
    } as {[key: string]: string};

    const sendMessage = () => {
        let el = document.querySelector(`.${styles.messagefield}`) as HTMLTextAreaElement;

        if (message.trim() === '') return;
        if (connection) {
            const service = connection.rest.messageService;
            service.sendMessage(message.trim()).subscribe(() => {
                setMessage('');
                setSentTrigger(true);
                el.rows = 1;
            });
        }
    }

    const updateMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.currentTarget.rows = Math.min(e.currentTarget.value.split('\n').length, 25);
        setMessage(e.target.value);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && e.shiftKey) {
            return;
        } else if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        } else if (formatMap[e.key] && e.ctrlKey) {
            e.preventDefault();
            toggleSaveFormat(message, formatMap[e.key], e.currentTarget);
            setMessage(e.currentTarget.value);
        }
    }

    return (
        <div className={`${className} ${styles.sender}`}>
            <textarea className={styles.messagefield} value={message} onChange={updateMessage} onKeyDown={handleKeyPress} rows={1} />
            <button className={styles.sendbutton} onClick={sendMessage}>Send</button>
        </div>
    );
}