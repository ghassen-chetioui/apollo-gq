import { PubSub } from 'graphql-subscriptions';
import fetch, { Response } from "node-fetch";
import { inspect } from "util";

const API_BASE_URI = "http://localhost:3000";
const BOOK_ADDED_TRIGGER = "BOOK_ADDED";

const pubsub = new PubSub();

const resolvers = {
    Query: {
        books: (_: any, args: any) => fetch(`${API_BASE_URI}/books`).then(res => res.json()),
        book: (_: any, args: any) => fetch(`${API_BASE_URI}/books/${args.id}`).then(res => res.json())
    },
    Mutation: {
        addBook: async (_: any, args: any) => {
            const body = { title: args.title, author: args.author, publicationYear: args.publicationYear };
            try {
                const httpResponse = await fetch(`${API_BASE_URI}/books`, { method: "POST", body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
                const commandResponse = handleHttpResponse(httpResponse);
                if (commandResponse.success) {
                    const eventPayload = await httpResponse.json();
                    console.log(`Will publish event ${JSON.stringify(eventPayload)}`)
                    pubsub.publish(BOOK_ADDED_TRIGGER, { bookAdded: eventPayload });
                }
                return commandResponse;
            } catch (error) {
                return { success: false, error: inspect(error) };
            }
        },
        deleteBook: async (_: any, args: any) => {
            try {
                const httpResponse = await fetch(`${API_BASE_URI}/books/${args.id}`, { method: "DELETE" });
                return handleHttpResponse(httpResponse)
            } catch (error) {
                { return { success: false, error: inspect(error) } }
            }
        }
    },
    Subscription: {
        bookAdded: { subscribe: () => pubsub.asyncIterator(BOOK_ADDED_TRIGGER) }
    }
}

function handleHttpResponse(response: Response) {
    return {
        success: response.ok,
        error: !response.ok
            ? `${response.status} - ${response.statusText}`
            : undefined
    }
}

export default resolvers