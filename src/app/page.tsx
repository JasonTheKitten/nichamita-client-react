"use client";

import { NichaRestClient } from "@/nichajs/rest";

export default function Page() {
    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        const data = new FormData(form);
        const username = data.get('username') as string;
        const password = data.get('password') as string;
        
        const client = new NichaRestClient('http://localhost:8080', null);
        client.userService.login(username, password).subscribe(loginResult => {
            localStorage.setItem('token', loginResult.token);
            window.location.assign('/app');
        });

        event.preventDefault();
    }
    
    const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        const data = new FormData(form);
        const username = data.get('username') as string;
        const email = data.get('email') as string;
        
        const client = new NichaRestClient('http://localhost:8080', null);
        client.userService.register(username, email).subscribe(registerResult => {
            localStorage.setItem('token', registerResult.token);
            alert(`Your password is: ${registerResult.password}`);
            window.location.assign('/app');
        });

        event.preventDefault();
    }

    return (
        <div>
            <h1>Nichamita!</h1>
            <form onSubmit={handleLoginSubmit}>
                <h1>Login</h1>
                <input name="username" type="text" placeholder="Username" />
                <input name="password" type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <form onSubmit={handleRegisterSubmit}>
                <h1>Register</h1>
                <input name="username" type="text" placeholder="Username" />
                <input name="email" type="email" placeholder="Email" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}