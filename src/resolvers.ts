import fetch from "node-fetch";

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
                .then(_ => { return { success: true } })
                .catch(_ => { return { success: false } })
        },
        deleteBook: (_: any, args: any) => {
            return fetch(`${API_BASE_URI}/books/${args.id}`, { method: "DELETE" })
                .then(_ => { return { success: true } })
        }
    }
}

export default resolvers