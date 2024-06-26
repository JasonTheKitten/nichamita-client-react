import { RestContext } from "../context";
import { Observable, map } from "rxjs";
import { RouteRequest, requestRoute } from "../routeutil";


export class MessageService {

    readonly #context: RestContext;

    constructor(context: RestContext) {
        this.#context = context;
    }

    sendMessage(message: string): Observable<void> {
        const body = {
            message: message
        };
        const req: RouteRequest = {
            method: "POST",
            route: "/message",
            body: body,
        }

        return requestRoute(this.#context, req).pipe(
            map(() => {})
        );
    }

}