import Books from "../domain/Books";
import Book from "../domain/Book";
import { PubSub } from "graphql-subscriptions";
import { BOOK_ADDED_EVENT } from "../domain/Events";

export interface AddBookCommand { title: string, author: string, publicationYear: number };

export class AddBookCommandHandler {

    constructor(private readonly books: Books, private readonly eventPublisher: PubSub) { }

    async exec(command: AddBookCommand): Promise<void> {
        const { title, author, publicationYear } = command;
        const book = new Book(title, author, publicationYear);
        this.books.add(book);
        this.eventPublisher.publish(BOOK_ADDED_EVENT, { bookAdded: book });
    }

}