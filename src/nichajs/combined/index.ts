import { NichaGatewayClient } from '../gateway';
import { NichaRestClient } from '../rest';

export class NichaClient {

    readonly gateway: NichaGatewayClient;
    readonly rest: NichaRestClient;

    constructor(gatewayEndpoint: string, restEndpoint: string, token: string) {
        this.gateway = new NichaGatewayClient(gatewayEndpoint, token);
        this.rest = new NichaRestClient(restEndpoint, token);
    }
    
}