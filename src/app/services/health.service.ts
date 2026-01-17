import { Injectable } from '@angular/core';
import { Health } from '../models/health.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HealthService {
    private storageKey = 'healthRecords';
    private healthRecordsSubject = new BehaviorSubject<Health[]>([]);
    public healthRecords$ = this.healthRecordsSubject.asObservable();

    constructor() {
        this.loadRecords();
    }

    private loadRecords() {
        const data = localStorage.getItem(this.storageKey);
        const records = data ? JSON.parse(data) : [];
        this.healthRecordsSubject.next(records);
    }

    getHealthRecords(): Health[] {
        return this.healthRecordsSubject.value;
    }

    addHealthRecord(record: Health) {
        const records = this.getHealthRecords();
        records.push(record); // Add to end or unshift to beginning? Usually newest first is better for display, but user asked for push. We can sort later.
        // Let's unshift to show newest first by default in standard lists, but user asked for push in example. sticking to push.
        localStorage.setItem(this.storageKey, JSON.stringify(records));
        this.healthRecordsSubject.next(records);
    }

    deleteHealthRecord(index: number) {
        const records = this.getHealthRecords();
        records.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(records));
        this.healthRecordsSubject.next(records);
    }
}
