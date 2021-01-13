export class Comment {
    public id;
    public content;
    public dateCreated;

    constructor(json) {
        if (!json) {
            this.id = -1;
            this.content = '';
            this.dateCreated = null;
        } else {
            this.id = json.id;
            this.content = json.content;
            this.dateCreated = json.created_at;
        }
    }
}
