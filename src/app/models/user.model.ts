export interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    phone: string[];
    role?: 'admin' | 'dietitian' | 'patient';
    assignedDietitian?: string; // Email or ID of the assigned dietitian
    notes?: string; // Notes from the dietitian
}
