import fetch, { Response } from "node-fetch";
import { inspect } from "util";

const API_BASE_URI = "http://localhost:3000";

const resolvers = {
    Query: {
        books: (_: any, args: any) => fetch(`${API_BASE_URI}/books`).then(res => res.json()),
        book: (_: any, args: any) => fetch(`${API_BASE_URI}/books/${args.id}`).then(res => res.json())
    },
    Mutation: {
        addBook: (_: any, args: any) => {
            const body = { title: args.title, author: args.author, publicationYear: args.publicationYear };
            return fetch(`${API_BASE_URI}/books`, { method: "POST", body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
                .then(response => handleHttpResponse(response))
                .catch(error => { return { success: false, error: inspect(error) } })
        },
        deleteBook: (_: any, args: any) => {
            return fetch(`${API_BASE_URI}/books/${args.id}`, { method: "DELETE" })
                .then(response => handleHttpResponse(response))
                .catch(error => { return { success: false, error: inspect(error) } })
        }
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