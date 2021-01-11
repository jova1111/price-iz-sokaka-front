import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  public isPlaying: boolean;
  public audio = new Audio();
  public radioStations = [
    { name: 'Радио АС Шабац' , src: 'http://185.102.239.216:8000/;*.mp3' },
    { name: 'Радио Цер' , src: 'http://stream1.contrateam.com:8040/;*.mp3' },
    { name: 'Радио Хит' , src: 'http://streaming.hitfm.rs:8000/hit' },
    { name: 'Радио Фрушка Гора' , src: 'http://stream.kingsnet.rs:8000/radio-fruskagora' },
  ];

  private index = 1;
  public currentStationName;
  public isChangingStation: boolean;
  public volume;
  public isHidden;

  constructor() {
   }

  ngOnInit() {
    this.isHidden = false;
    this.changeStation();
    this.audio.volume = 0.5;
    this.volume = 0.5;
    this.initListeners();
  }

  private initListeners() {
    this.audio.onplay = () => {
      this.isPlaying = true;
    };

    this.audio.onpause = () => {
      this.isPlaying = false;
    };

    this.audio.oncanplay = () => {
      this.isChangingStation = false;
    };

    this.audio.onvolumechange = () => {
      this.volume = this.audio.volume;
    };
  }

  public pause() {
    this.audio.pause();
  }

  public play() {
    this.audio.load();
    this.audio.play();
  }

  public setVolume(value) {
    this.audio.volume = value;
  }

  public previousStation() {
    this.index--;
    if (this.index < 0) {
      this.index = this.radioStations.length - 1;
    }
    this.changeStation();
  }

  public nextStation() {
    this.index++;
    if (this.index === this.radioStations.length) {
      this.index = 0;
    }
    this.changeStation();
  }

  public changeStation() {
    this.isChangingStation = true;
    this.currentStationName = this.radioStations[this.index].name;
    this.audio.src = this.radioStations[this.index].src;
    try {
      this.audio.load();
      this.audio.play();
    } catch (error) {
      this.currentStationName = this.radioStations[this.index].name + ' недоступан...';
      this.isChangingStation = false;
    }
  }

  public show() {
    this.isHidden = false;
  }

  public hide() {
    this.isHidden = true;
  }

  private saveState() {
    localStorage.setItem('radio_state', JSON.stringify({
      isHidden: this.isHidden,
      isPlaying: this.isPlaying
    }));
  }

}
