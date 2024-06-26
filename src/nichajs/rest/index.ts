import { MessageService } from './service/MessageService';
import { RestContext } from './context';

export class NichaRestClient {

    readonly messageService: MessageService;

    constructor(endpoint: string) {
        const context: RestContext = {
            endpoint: endpoint
        };

        this.messageService = new MessageService(context);
    }

}