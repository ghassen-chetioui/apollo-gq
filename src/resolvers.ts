import fetch from "node-fetch";

const API_BASE_URI = "http://localhost:3000";

const resolvers = {
    Query: {
        books: (parent: any, args: any) => fetch(`${API_BASE_URI}/books`).then(res => res.json()),
        book: (parent: any, args: any) => fetch(`${API_BASE_URI}/books/${args.id}`).then(res => res.json())
    }
}

export default resolvers