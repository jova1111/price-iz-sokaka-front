import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public content: string;
  public error: string;
  public isLoading: boolean;

  constructor(private toastManager: ToastsManager, private contactService: ContactService, private router: Router) { }

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
      .then((success: string) => {
        this.isLoading = false;
        this.toastManager.success(success);   
        this.router.navigate(['/']);
      })
      .catch((error: string) => {
        this.isLoading = false;
        this.toastManager.error(error);
      });
  }

}
