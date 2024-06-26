import { Observable } from "rxjs";
import { RestContext } from "./context";

export type RouteRequest = {
    method: string;
    route: string;
    parameters?: Record<string, any>;
    body: Record<string, any>;
}

export function requestRoute(context: RestContext, req: RouteRequest): Observable<Response> {
    const filledRoute = req.route.replace(/\{(\w+)\}/g, (_: any, key: string) => {
        if (req.parameters && req.parameters.hasOwnProperty(key)) {
            return encodeURIComponent(req.parameters[key]);
        }
        throw new Error(`Parameter '${key}' not found`);
    });
    const bodyText = JSON.stringify(req.body);

    return new Observable<Response>((observer) => {
        fetch(`${context.endpoint}${filledRoute}`, {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: bodyText,
        }).then((response) => {
            observer.next(response);
            observer.complete();
        })
        .catch((error) => {
            observer.error(error);
        });
    });

}