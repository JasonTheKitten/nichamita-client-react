"use client";

import styles from './page.module.css';
import { ConnectionProvider } from '@/contexts/ConnectionContext';
import Messages from '@/components/messages';
import Sender from '@/components/sender';

export default function Chat() {
    return (
        <ConnectionProvider>
            <div className={styles.container}>
                <h1>Chat</h1>
                <Messages />
                <Sender />
            </div>
        </ConnectionProvider>
    );
}