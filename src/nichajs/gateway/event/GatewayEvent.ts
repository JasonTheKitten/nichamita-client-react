export interface GatewayEvent {

}

export interface GatewayEventTransformer<Target extends GatewayEvent> {

    transform(event: Record<string, any>): Target;
    
    getType(): string;

}