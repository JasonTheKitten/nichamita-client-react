import { GatewayEvent, GatewayEventTransformer } from './event/GatewayEvent';

import { Observable } from 'rxjs';

type Listener = (event: Record<string, any>) => void;
type CloseHook = () => void;

export class NichaGatewayClient {

    readonly #endpoint: string;
    readonly #token: string;
    readonly #listeners: Listener[] = [];
    readonly #closeHooks: CloseHook[] = [];

    #connection: WebSocket | null = null;

    constructor(endpoint: string, token: string) {
        this.#endpoint = endpoint;
        this.#token = token;
    }

    connect() {
        if (this.#connection) {
            return;
        }
        this.#startConnection();
    }

    disconnect() {
        this.#connection?.close();
    }

    onEvent<Target extends GatewayEvent>(transform: GatewayEventTransformer<Target>): Observable<Target> {
        return new Observable<Target>((observer) => {
            const listener: Listener = (event) => {
                if (event.type === transform.getType()) {
                    observer.next(transform.transform(event));
                }
            };
            const closeHook: CloseHook = () => {
                observer.complete();
            }

            this.#listeners.push(listener);
            this.#closeHooks.push(closeHook);
        });
    }

    quit() {
        this.disconnect();
        this.#closeHooks.forEach((hook) => hook());
    }

    #startConnection() {
        this.#connection = new WebSocket(this.#endpoint);

        this.#connection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.#listeners.forEach((listener) => listener(data));
        };

        this.#connection.onclose = () => {
            this.#connection = null;
        };

        this.#connection.onopen = () => {
            this.#connection?.send(JSON.stringify({
                type: 'authenticate',
                token: this.#token
            }));
        };
    }

}