export class Image {
  public id;
  public url;
  public description;
  public dateCreated;

  constructor(json) {
      if (!json) {
          this.id = -1;
          this.url = '';
          this.description = '';
          this.dateCreated = null;
      } else {
          this.id = json.id;
          this.url = json.url;
          this.description = json.description;
          this.dateCreated = json.created_at;
      }
  }
}
