import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../model/Comment';

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

  constructor(private commentService: CommentService) { 
    
  }

  ngOnInit() {
    this.getComments();
  }

  public getComments() {
    this.commentService.getComments(this.commentableId, this.commentType)
      .then(responseComments => {
        console.log(this.isLoaded)
        for(let index in responseComments) {
          this.allComments.push(new Comment(responseComments[index]));
        }
        this.isLoaded = true;
      })
      .catch(error => {
        alert(error);
      });
  }

}
