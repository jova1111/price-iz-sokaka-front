import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public content: string;
  public error: string;
  public isLoading: boolean;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {
  }

  public onSubmit() {
    this.error = "";
    if(!this.content) {
      this.error = "Садржај не сме бити празан.";
      return;
    }
    this.isLoading = true;
    this.contactService.contact(this.content)
      .then(success => {
        this.isLoading = false;
        alert(success);    
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.isLoading = false;
        alert(error);
      });
  }

}
