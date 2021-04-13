import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentBoxComponent } from './modules/comments/components/comment-box/comment-box.component';
import { CommentsComponent } from './modules/comments/components/comments/comments.component';

const routes: Routes = [
  { path: '/', redirectTo: 'comments' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [CommentsComponent, CommentBoxComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
