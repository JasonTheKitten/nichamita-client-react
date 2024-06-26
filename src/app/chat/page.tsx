"use client";

import styles from './page.module.css';
import { ConnectionProvider } from '@/contexts/ConnectionContext';
import Messages from '@/components/messages';

export default function Chat() {
    return (
        <ConnectionProvider>
            <div className={styles.container}>
                <h1>Chat</h1>
                <Messages />
            </div>
        </ConnectionProvider>
    );
}