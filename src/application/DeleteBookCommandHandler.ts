import Books from "../domain/Books";

export interface DeleteBookCommand { id: string };

export class DeleteBookCommandHandler {

    constructor(private readonly books: Books) { }

    handle(command: DeleteBookCommand): Promise<void> {
        return this.books.delete(command.id);
    }

}