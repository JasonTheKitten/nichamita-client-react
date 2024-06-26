import { GatewayEvent, GatewayEventTransformer } from "./GatewayEvent";

export interface MessageEvent extends GatewayEvent {
    readonly message: string;
}

export class MessageEventTransformer implements GatewayEventTransformer<MessageEvent> {

    transform(event: Record<string, any>): MessageEvent {
        return {
            message: event.message,
        };
    }

    getType(): string {
        return 'message';
    }

}