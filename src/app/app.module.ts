import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentBoxComponent } from './modules/comments/components/comment-box/comment-box.component';
import { CommentsComponent, DataContainerComponent } from './modules/comments/components/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    CommentBoxComponent,
    DataContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
