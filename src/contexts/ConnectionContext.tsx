import { createContext, useContext, useEffect, useState } from 'react';
import { NichaClient } from '@/nichajs/combined';

const ConnectionContext = createContext<NichaClient | null>(null);

export const ConnectionProvider = ({ children } : { children:  any}) => {
    const [ connection, setConnection ] = useState<NichaClient | null>(null);

    useEffect(() => {
        const client = new NichaClient('ws://localhost:8080/gateway', 'http://localhost:8080');
        setConnection(() => client);
        client.gateway.connect();

        return () => {
            connection?.gateway.disconnect();
        }
    }, []);
    
    return (
        <ConnectionContext.Provider value={ connection }>
            {children}
        </ConnectionContext.Provider>
    );
}

export const useConnection = () => {
    return useContext(ConnectionContext);
}

export default ConnectionContext;