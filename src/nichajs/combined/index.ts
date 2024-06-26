import { NichaGatewayClient } from '../gateway';
import { NichaRestClient } from '../rest';

export class NichaClient {

    readonly gateway: NichaGatewayClient;
    readonly rest: NichaRestClient;

    constructor(gatewayEndpoint: string, restEndpoint: string) {
        this.gateway = new NichaGatewayClient(gatewayEndpoint);
        this.rest = new NichaRestClient(restEndpoint);
    }
    
}