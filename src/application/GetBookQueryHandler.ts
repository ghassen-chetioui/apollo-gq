import Books from "../domain/Books";
import Book from "../domain/Book";

export interface GetBookQuery { id: string };

export class GetBookQueryHandler {

    constructor(private readonly books: Books) { }

    handle(query: GetBookQuery): Promise<Book | undefined> {
        return this.books.byId(query.id)
    }

}