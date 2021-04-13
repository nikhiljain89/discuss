import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor() { }

    authenticate(siteKey: string): Observable<any> {
        return siteKey ? of({ isValid: true, token: 'adsdassa#%6IGHJGhhgkgkhgghghgjg' }) : of({ isValid: false });
    }
}
