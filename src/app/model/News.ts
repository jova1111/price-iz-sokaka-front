export class News {
    public id: number;
    public header: string;
    public content: string;
    public dateCreated: Date;
    public imageUrl: string;

    constructor (json) {
        if (!json) {
            this.id = 0;
            this.header = '';
            this.content = '';
            this.dateCreated = null;
            this.imageUrl = '';
        } else {
            this.id = json.id;
            this.header = json.header;
            this.content = json.content;
            this.dateCreated = json.created_at;
            this.imageUrl = json.image_url;
        }
    }
}
