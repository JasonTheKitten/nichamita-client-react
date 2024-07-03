import { RestContext } from './context';
import { MessageService } from './service/MessageService';
import { UserService } from './service/UserService';

export class NichaRestClient {

    readonly messageService: MessageService;
    readonly userService: UserService;

    constructor(endpoint: string, token: string | null) {
        const context: RestContext = {
            endpoint: endpoint,
            token: token,
        };

        this.messageService = new MessageService(context);
        this.userService = new UserService(context);
    }

}