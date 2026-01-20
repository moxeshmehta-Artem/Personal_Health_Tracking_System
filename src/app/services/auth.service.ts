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
        user.role = 'patient'; // Force role to patient
        users.push(user);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    public getUsers(): any[] {
        const usersStr = localStorage.getItem(this.USERS_KEY);
        let users = usersStr ? JSON.parse(usersStr) : [];

        // Seed Admin if not exists
        const adminExists = users.some((u: any) => u.email === 'admin@health.com');
        if (!adminExists) {
            const admin = {
                firstname: 'Super',
                lastname: 'Admin',
                email: 'admin@health.com',
                password: 'Admin123!',
                role: 'admin'
            };
            users.push(admin);
        }

        // Seed Dietitian if not exists
        const dietitianExists = users.some((u: any) => u.email === 'dietitian@health.com');
        if (!dietitianExists) {
            const dietitian = {
                firstname: 'Dr.',
                lastname: 'Dietitian',
                email: 'dietitian@health.com',
                password: 'Diet123!',
                role: 'dietitian'
            };
            users.push(dietitian);
        }

        if (!adminExists || !dietitianExists) {
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        }

        return users;
    }

    login(email: string, password: string): boolean {
        const users = this.getUsers();
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (user) {
            const role = user.role || 'patient'; // Default to patient if undefined
            const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                btoa(JSON.stringify({ email: user.email, role: role })) +
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

    getUserRole(): string | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            // Simplified decoding for our fake token structure: header.payload.signature
            const payload = atob(token.split('.')[1]);
            const parsed = JSON.parse(payload);
            return parsed.role;
        } catch (e) {
            return null;
        }
    }

    addDietitian(user: any): void {
        const users = this.getUsers();
        user.role = 'dietitian';
        users.push(user);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    getDietitians(): any[] {
        const users = this.getUsers();
        return users.filter((u: any) => u.role === 'dietitian');
    }

    getPatients(): any[] {
        const users = this.getUsers();
        return users.filter((u: any) => u.role === 'patient');
    }

    updatePatientNotes(email: string, notes: string): void {
        const users = this.getUsers();
        const userIndex = users.findIndex((u: any) => u.email === email);
        if (userIndex !== -1) {
            users[userIndex].notes = notes;
            users[userIndex].assignedDietitian = 'Dr. Dietitian'; // Simplified assignment
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        }
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
}
