import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public content: string;
  public error: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  public onSubmit() {
    this.error = "";
    if(!this.content) {
      this.error = "Садржај не сме бити празан.";
      return;
    }
    this.contactService.contact(this.content)
      .then(success => {
        alert(success);
      })
      .catch(error => {
        alert(error)
      });
  }

}
