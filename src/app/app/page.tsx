"use client";

import ServerView from '@/components/serverview';
import { ConnectionProvider } from '@/contexts/ConnectionContext';
import styles from './page.module.css';

export default function Chat() {
    return (
        <ConnectionProvider>
            <div className={styles.container}>
                <ServerView className={styles.serverview} />
            </div>
        </ConnectionProvider>
    );
}