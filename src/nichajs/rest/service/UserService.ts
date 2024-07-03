import { Observable, mergeMap } from "rxjs";
import { RestContext } from "../context";
import { RouteRequest, requestRoute } from "../routeutil";

export type LoginResult = {
    token: string;
}

export type RegisterResult = {
    token: string;
    password: string;
}

export class UserService {

    readonly #context: RestContext;

    constructor(context: RestContext) {
        this.#context = context;
    }

    login(username: string, password: string): Observable<LoginResult> {
        const body = {
            username: username,
            password: password
        };

        const req: RouteRequest = {
            method: "POST",
            route: "/user/login",
            body: body,
        };

        return requestRoute(this.#context, req)
            .pipe(mergeMap(response => response.json()));
    }

    register(username: string, email: string): Observable<RegisterResult> {
        const body = {
            username: username,
            email: email
        };
        
        const req: RouteRequest = {
            method: "POST",
            route: "/user/register",
            body: body,
        };

        return requestRoute(this.#context, req)
            .pipe(mergeMap(response => response.json()));
    }

}