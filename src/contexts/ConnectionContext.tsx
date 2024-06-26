import { createContext, useContext, useEffect, useState } from 'react';
import { NichaGatewayClient } from '@/nichajs/gateway';

const ConnectionContext = createContext<NichaGatewayClient | null>(null);

export const ConnectionProvider = ({ children } : { children:  any}) => {
    const [ connection, setConnection ] = useState<NichaGatewayClient | null>(null);

    useEffect(() => {
        const client = new NichaGatewayClient('ws://localhost:8080/gateway');
        setConnection(() => client);
        client.connect();

        return () => {
            connection?.disconnect();
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