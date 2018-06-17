import Books from "../domain/Books";

export default class GetBooksQueryHandler {
    constructor(private readonly books: Books) { }

    handle() {
        return this.books.all();
    }
}