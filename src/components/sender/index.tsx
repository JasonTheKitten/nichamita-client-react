import { useConnection } from "@/contexts/ConnectionContext";
import { useState } from "react";

export default function Sender() {
    const connection = useConnection();
    const [ message, setMessage ] = useState<string>('');
    const [ sent, setSent ] = useState<boolean>(false);

    const sendMessage = () => {
        if (connection) {
            const service = connection.rest.messageService;
            service.sendMessage(message).subscribe(() => {
                setSent(true);
            });
        }
    }

    const updateMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
        setSent(false);
    }

    return (
        <div>
            <h1>Sender</h1>
            <input type="text" value={message} onChange={updateMessage} />
            <button onClick={sendMessage}>Send</button>
            {sent && <p>Message sent!</p>}
        </div>
    );
}