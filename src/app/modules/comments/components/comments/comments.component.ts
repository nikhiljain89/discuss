import {
  Component, Input, Output, EventEmitter,
  ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver,
} from '@angular/core';

import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { Comment } from '../../comments.model';

@Component({
  selector: 'app-comments-container',
  template: ``
})
export class DataContainerComponent {
  @Input() post!: Comment;
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent {
  @Input() postComment: Comment[] = [];
  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex = 0;
  public reply: Comment;

  @ViewChildren(DataContainerComponent)
  entry!: QueryList<DataContainerComponent>;

  constructor(
    private resolver: ComponentFactoryResolver){
  }

  removeComment(num: number): void {
    this.postComment.splice(num, 1);
    this.countComments.emit(this.postComment);
  }

  replyComment(index: number): void {
    this.loadComponent = true;
    const myFactory = this.resolver.resolveComponentFactory(CommentBoxComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance.commentNo = index;
      myRef.instance.toBeShown = true;
      myRef.changeDetectorRef.detectChanges();
      myRef.instance.usercomment.subscribe(
        data => {
          this.receiveReplyComment(data, index);
          myRef.instance.toBeShown = false;
        }
      );
      myRef.instance.deletNo.subscribe(
        comment => {
          myRef.destroy();
        }
      );
    }
  }

  receiveReplyComment($event: Comment, i: number): void {
    this.reply = $event;
    this.postComment[i].replyComment.push($event);
    this.loadComponent = false;
  }

  removeReplyComment(post: Comment, index: number): void {
    post.replyComment?.splice(index, 1);
  }
}
