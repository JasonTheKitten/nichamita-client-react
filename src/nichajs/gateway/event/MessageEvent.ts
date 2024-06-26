import { GatewayEvent, GatewayEventTransformer } from "./GatewayEvent";
import { MessageEntity } from "@/nichajs/entity/MessageEntity";

export interface MessageEvent extends GatewayEvent {
    message: MessageEntity;
}

export class MessageEventTransformer implements GatewayEventTransformer<MessageEvent> {

    transform(event: Record<string, any>): MessageEvent {
        return {
            message: event.message
        };
    }

    getType(): string {
        return 'message';
    }

}