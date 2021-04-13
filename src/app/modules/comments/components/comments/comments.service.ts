import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { Comment } from '../../comments.model';

const URL = 'assets/mocks/comments.mock.json';

@Injectable()
export class CommentService {
    constructor(private http: HttpClient) { }

    getComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(URL);
    }
}
