export class News {
    private id: number;
    private header: string;
    private content: string;
    private dateCreated: Date;

    constructor (json) {
        if (!json) {
            this.id = 0;
            this.header = "";
            this.content = "";
            this.dateCreated = null;
        } else {
            this.id = json.id;
            this.header = json.header;
            this.content = json.content;
            this.dateCreated = json.created_at;
        }
    }
}