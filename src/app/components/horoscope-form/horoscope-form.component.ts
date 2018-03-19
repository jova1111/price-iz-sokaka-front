import { Component, OnInit } from '@angular/core';
import { Horoscope } from '../../model/Horoscope';
import { NewsService } from '../../services/news.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HoroscopeService } from '../../services/horoscope.service';

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

  constructor(private horoscopeService: HoroscopeService, private router: Router, private route: ActivatedRoute) { }

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
          this.router.navigate(['/horoscope']);
          window.location.reload();
        })
        .catch(error => console.log(error));
      } else {
        this.horoscopeService.update(this.id, this.horoscope)
          .then(success => {
            alert("Успешно апдејтово.");
            this.router.navigate(['/horoscope']);
            window.location.reload();
          })
          .catch(error => {
            alert("Дошло је до грешке приликом апдејтовања.");
          })
      }
  }

}
