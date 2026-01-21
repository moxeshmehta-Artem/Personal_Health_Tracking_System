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

        // Seed Frontdesk if not exists
        const frontdeskExists = users.some((u: any) => u.email === 'frontdesk@health.com');
        if (!frontdeskExists) {
            const frontdesk = {
                firstname: 'Front',
                lastname: 'Desk',
                email: 'frontdesk@health.com',
                password: 'Frontdesk123!',
                role: 'frontdesk'
            };
            users.push(frontdesk);
        }

        // Seed Dietitian if not exists
        const dietitianExists = users.some((u: any) => u.email === 'dietitian@health.com');
        if (!dietitianExists) {
            const dietitian = {
                firstname: 'Sarah',
                lastname: 'Dietitian',
                email: 'dietitian@health.com',
                password: 'Dietitian123!',
                role: 'dietitian'
            };
            users.push(dietitian);
        }

        if (!adminExists || !frontdeskExists || !dietitianExists) {
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
            // Removed hardcoded assignment so it keeps the real assigned doctor
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        }
    }

    removeUser(email: string): void {
        const users = this.getUsers();
        const filteredUsers = users.filter((u: any) => u.email !== email);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(filteredUsers));
    }

    assignDietitian(patientEmail: string, dietitianEmail: string): void {
        const users = this.getUsers();
        const userIndex = users.findIndex((u: any) => u.email === patientEmail);
        if (userIndex !== -1) {
            users[userIndex].assignedDietitian = dietitianEmail;
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        }
    }

    updateConsultationStatus(patientEmail: string, status: 'active' | 'inactive'): void {
        const users = this.getUsers();
        const userIndex = users.findIndex((u: any) => u.email === patientEmail);
        if (userIndex !== -1) {
            users[userIndex].consultationStatus = status;
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        }
    }

    updateAvailability(dietitianEmail: string, availability: any[]): void {
        const users = this.getUsers();
        const userIndex = users.findIndex((u: any) => u.email === dietitianEmail);
        if (userIndex !== -1) {
            users[userIndex].availability = availability;
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        }
    }

    updateDoctorStatus(dietitianEmail: string, isAvailable: boolean): void {
        const users = this.getUsers();
        const userIndex = users.findIndex((u: any) => u.email === dietitianEmail);
        if (userIndex !== -1) {
            users[userIndex].isAvailable = isAvailable;
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        }
    }

    getMyPatients(dietitianEmail: string): any[] {
        const users = this.getUsers();
        return users.filter((u: any) => u.role === 'patient' && u.assignedDietitian === dietitianEmail);
    }

    // Helper to get current user email from token
    getCurrentUserEmail(): string | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            return JSON.parse(atob(token.split('.')[1])).email;
        } catch (e) { return null; }
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
}
