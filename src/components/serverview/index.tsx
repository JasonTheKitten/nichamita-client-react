import {useState} from 'react';
import Messages from '@/components/messages';
import Sender from '@/components/sender';
import styles from './serverview.module.css';

export default function ServerView({className}: {className?: string}) {
    const [ sentTrigger, setSentTrigger ] = useState<boolean>(false);

    return (
        <div className={`${styles.serverview} ${className}`}>
            <Messages className={styles.messages} sentTrigger={sentTrigger} setSentTrigger={setSentTrigger} />
            <Sender className={styles.sender} setSentTrigger={setSentTrigger} />
        </div>
    );
}