import { PubSub } from 'graphql-subscriptions';
import RestBooks from '../infrastructure/RestBooks';
import Books from '../domain/Books';
import GetBooksQueryHandler from '../application/GetBooksQueryHandler';
import { GetBookQueryHandler } from '../application/GetBookQueryHandler';
import { AddBookCommandHandler } from '../application/AddBookCommandHandler';
import { DeleteBookCommandHandler } from '../application/DeleteBookCommandHandler';
import { BOOK_ADDED_EVENT } from '../domain/Events';

const BOOK_ADDED_TRIGGER = "BOOK_ADDED";

const pubsub = new PubSub();
const books: Books = new RestBooks();
const getBooksQueryHandler = new GetBooksQueryHandler(books);
const getBookQueryHandler = new GetBookQueryHandler(books);
const addBookCommandHandler = new AddBookCommandHandler(books, pubsub);
const deleteBookCommandHandler = new DeleteBookCommandHandler(books);

const resolvers = {
    Query: {
        books: (root: any, args: any) => getBooksQueryHandler.handle(),
        book: (root: any, args: any) => getBookQueryHandler.handle(args)
    },
    Mutation: {
        addBook: async (_: any, args: any) => {
            try {
                addBookCommandHandler.exec(args);
                return { success: true }
            } catch (error) {
                return { success: false, error };
            }
        },
        deleteBook: async (_: any, args: any) => {
            try {
                deleteBookCommandHandler.handle(args);
                return { success: true }
            } catch (error) {
                { return { success: false, error } }
            }
        }
    },
    Subscription: {
        bookAdded: { subscribe: () => pubsub.asyncIterator(BOOK_ADDED_EVENT) }
    }
}

export default resolvers