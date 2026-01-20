import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
    isLoggedIn$ = this.loggedIn.asObservable();

    private readonly USERS_KEY = 'registered_users';

    constructor() { }

    register(user: any): void {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    private getUsers(): any[] {
        const usersStr = localStorage.getItem(this.USERS_KEY);
        return usersStr ? JSON.parse(usersStr) : [];
    }

    login(email: string, password: string): boolean {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                btoa(JSON.stringify({ email: user.email, role: 'user' })) +
                '.fakeSignature123456';

            localStorage.setItem(this.TOKEN_KEY, fakeToken);
            this.loggedIn.next(true);
            return true;
        }

        return false;
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.loggedIn.next(false);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
}
