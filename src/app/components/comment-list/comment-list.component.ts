import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../model/Comment';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input()
  public commentType: string;
  public allComments: Comment[] = [];
  @Input()
  public commentableId;
  public isLoaded: boolean;
  public content;
  public isAddingComment: boolean;

  constructor(private toastManager: ToastsManager, private commentService: CommentService) { 
    
  }

  ngOnInit() {
    this.getComments();
  }

  public getComments() {
    this.commentService.getComments(this.commentableId, this.commentType)
      .then(responseComments => {
        for(let index in responseComments) {
          this.allComments.push(new Comment(responseComments[index]));
        }
        this.isLoaded = true;
      })
      .catch(error => {
        alert(error);
      });
  }

  public onSubmit() {
    this.isAddingComment = true;
    this.commentService.add(this.commentableId, this.commentType, this.content)
      .then(success => {
        this.allComments.push(new Comment(success));
        this.content = "";
        this.toastManager.success("Koментар успешно постављен.");
        this.isAddingComment = false;
      })
      .catch(error => {
        this.toastManager.error("Дошло је до грешке приликом постављања коментара.");
        this.isAddingComment = false;
      });
  }
}
