import uuid = require("uuid");
export default class Book {
    readonly id: string;
    readonly title: string;
    readonly author: string;
    readonly publicationYear: number;
    constructor(title: string, author: string, publicationYear: number) {
        this.id = uuid.v4();
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
    }
} 