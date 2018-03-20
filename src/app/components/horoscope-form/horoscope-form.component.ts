import { Component, OnInit } from '@angular/core';
import { Horoscope } from '../../model/Horoscope';
import { NewsService } from '../../services/news.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HoroscopeService } from '../../services/horoscope.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-horoscope-form',
  templateUrl: './horoscope-form.component.html',
  styleUrls: ['./horoscope-form.component.css']
})
export class HoroscopeFormComponent implements OnInit {

  public horoscope= new Horoscope("");
  public error: string;
  public editMode: boolean;
  private id: number;
  public isLoaded: boolean;

  constructor(private toastManager: ToastsManager, private horoscopeService: HoroscopeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params["id"]) {
        this.id = +params["id"];
        this.editMode = true;
        this.horoscopeService.getById(this.id)
          .then(news => {
            this.horoscope = new Horoscope(news);
            this.isLoaded = true;
          })
          .catch(error => {
            console.log("error");
            this.isLoaded = true;
          });
      } else {
        this.isLoaded = true;
      }
    });
  }

  public onSubmit() {
      if(!this.editMode) {
      this.horoscopeService.save(this.horoscope)
        .then(succes => {
          this.toastManager.success("Хороскоп успешно додат.");
          this.router.navigate(['/horoscope']);
        })
        .catch(error => {
          this.toastManager.error("Дошло је до грешке приликом додавања.");
        });
      } else {
        this.horoscopeService.update(this.id, this.horoscope)
          .then(success => {
            this.toastManager.success("Хороскоп успешно измењен.");
            this.router.navigate(['/horoscope']);
          })
          .catch(error => {
            this.toastManager.error("Дошло је до грешке приликом измене");
          })
      }
  }

}
