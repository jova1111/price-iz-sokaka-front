import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { Comment } from '../../model/Comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
  providers: [ CommentListComponent ]
})
export class CommentFormComponent implements OnInit {

  @Input()
  public commentableId;
  public content;
  @Input()
  public commentType;
  @Output() 
  onAddedComment: EventEmitter<any> = new EventEmitter();

  constructor(private commentService: CommentService, private commentListComponent: CommentListComponent) { }

  ngOnInit() {
  }

  public onSubmit() {
    this.commentService.add(this.commentableId, this.commentType, this.content)
      .then(success => {
        this.onAddedComment.emit();
      })
      .catch(error => {
        console.log(error)
      });
  }

}
