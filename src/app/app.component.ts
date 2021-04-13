import { Component, Input, OnInit } from '@angular/core';

import { UserService } from './modules/services/user.service';
import { ThemeService } from './modules/services/theme.service';
import { CommentService } from './modules/comments/components/comments/comments.service';
import { Comment } from './modules/comments/comments.model';

enum THEMES {
  'light' = 'light-theme',
  'dark' = 'dark-theme'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService, CommentService]
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('theme') themeToSet = 'light';
  @Input() siteKey = 'fafaasasadddlajladljdlajdaijdiolajdoisa';
  isValidUser: boolean;
  title = 'ng-discuss';
  comments: Array<Comment>;

  constructor(
    private readonly themeService: ThemeService,
    private commetService: CommentService,
    private userService: UserService) {
    this.themeService.setTheme(THEMES.light);
  }

  ngOnInit(): void {
    if (!this.siteKey) {
      this.isValidUser = false;
      return;
    }
    this.userService.authenticate(this.siteKey).subscribe(user => {
      this.isValidUser = user.isValid;
      this.getComments();
    });
    if (Object.keys(THEMES).includes(this.themeToSet)) {
      this.themeService.setTheme(THEMES[this.themeToSet]);
    }
  }

  private getComments(): void {
    this.commetService.getComments().subscribe(comments => {
      if (comments) {
        this.comments = comments;
      } else {
        this.comments = [];
      }
    });
  }

  receiveComment(comment: Comment): void {
    this.comments = [...this.comments, comment];
  }

  recieveCount(comments: Comment[]): void {
    this.comments = [...comments];
  }
}
