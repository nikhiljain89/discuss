import { Component, EventEmitter, OnInit, Output, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Comment } from '../../comments.model';

@Component({
    selector: 'app-comment-box',
    styleUrls: ['./comment-box.component.scss'],
    templateUrl: './comment-box.component.html',
    encapsulation: ViewEncapsulation.None
})

export class CommentBoxComponent implements OnInit {
    @Input() commentNo: any;
    @Output() usercomment = new EventEmitter();
    @Output() userReplycomment = new EventEmitter();
    @Output() deletNo = new EventEmitter();

    commentForm: FormGroup;
    commentInfo: Comment;
    isSubmitted: boolean;
    toBeShown: boolean;
    public id = 0;

    constructor(private formBuilder: FormBuilder) {
        this.commentForm = new FormGroup({});
        this.commentInfo = {
            comment: '',
            id: 0,
            count: 0,
            currentDate: new Date(),
            replyComment: []
          };
        this.isSubmitted = false;
        this.toBeShown = true;
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.commentForm = this.formBuilder.group({
            comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
        });
    }

    onSubmit(): void {
        this.isSubmitted = true;
        if (this.commentForm.invalid) {
            return;
        } else {
            this.commentInfo = {
                id: Math.random(),
                currentDate: new Date(),
                comment: this.commentForm.controls.comment.value,
                user: 'Nikhil Jain',
                replyComment: [],
                photo: 'assets/images/user-male.svg'
            };
            this.commentForm.reset();
            this.commentForm.markAsUntouched();
            this.usercomment.emit(this.commentInfo);
            this.deletNo.emit(this.commentNo);
        }
    }
}
