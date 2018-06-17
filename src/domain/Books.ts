import Book from "./Book";

export default interface Books {
    all: () => Promise<Array<Book>>;
    byId: (id: string) => Promise<Book | undefined>;
    add: (book: Book) => Promise<void>;
    delete: (id: string) => Promise<void>;
}